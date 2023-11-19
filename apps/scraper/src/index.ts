import "dotenv/config";
import { download, save } from "./lib/utils";
import { SingleBar } from "cli-progress";
import { Topic } from "./types/generated";
import { Post, Comment } from "./types";
import * as cheerio from "cheerio";

const url = new URL(process.env.URL!);
const posts = Number(process.env.POSTS!);
const fetch_count = Number(process.env.FETCH!);

const progress = new SingleBar({});

const forumDirectory = "../www/public";

// Fetch posts 💀
const fetchPosts = async () => {
  for (let i = posts; i > posts - fetch_count; i--) {
    await fetchPost(i);
  }
};

const fetchPost = async (topicId: number) => {
  const topic = await download(
    new URL(`/t/${topicId}.json?include_raw=true`, url).href,
  );
  if (!topic) return progress.setTotal(progress.getTotal() - 1);

  save(topic, `${forumDirectory}/raw/${topicId}.json`);

  await processPost(topicId, topic);

  progress.increment();
};

const processPost = async (topicId: number, rawTopic: string) => {
  const topic = JSON.parse(rawTopic) as Topic;

  const posts = topic.post_stream.posts.filter((post) => post.raw !== "");

  // Change and download images 😭
  posts.map((post) => {
    const $ = cheerio.load(post.cooked);

    $("img[data-base62-sha1]").each((index, element) => {
      const sha1Value = $(element).attr("data-base62-sha1");
      const imageUrl = $(element).attr("src");

      if (sha1Value && imageUrl) {
        const replacementRegex = new RegExp(`upload://${sha1Value}`, "g");

        const pathname = new URL(imageUrl).pathname
          .split(".")
          .slice(0, -1)
          .join("");

        download(
          imageUrl,
          `../www/public${new URL(imageUrl).pathname}`,
          "buffer",
        );

        post.raw = post.raw.replace(replacementRegex, pathname);
      }
    });
  });

  const comments: Comment[] = posts.slice(0, -1).map((post) => {
    download(
      new URL(post.avatar_template.replace("{size}", "250"), url).href,
      `../www/public${decodeURIComponent(
        new URL(post.avatar_template, url).pathname,
      )}`,
      "buffer",
    );
    return {
      id: post.id,
      raw: post.raw,
      user: {
        id: post.user_id,
        name: post.name,
        avatar: post.avatar_template,
        username: post.username,
        title: post.user_title,
      },
      created_at: post.created_at,
      updated_at: post.updated_at,
    };
  });

  const rawPost = posts[0];
  download(
    new URL(rawPost.avatar_template.replace("{size}", "250"), url).href,
    `../www/public${decodeURIComponent(
      new URL(rawPost.avatar_template, url).pathname,
    )}`,
    "buffer",
  );
  if (topic.image_url) {
    download(
      topic.image_url,
      `../www/public${new URL(topic.image_url).pathname}`,
      "buffer",
    );
  }
  const post: Post = {
    id: rawPost.id,
    topic_id: topicId,
    raw: rawPost.raw,
    title: topic.title,
    fancy_title: topic.fancy_title,
    tags: topic.tags,
    tags_descriptions: topic.tags_descriptions,
    slug: topic.slug,
    closed: topic.closed,
    archived: topic.archived,
    user: {
      id: rawPost.user_id,
      name: rawPost.name,
      avatar: rawPost.avatar_template,
      username: rawPost.username,
      title: rawPost.user_title,
    },
    category_id: topic.category_id,
    image: topic.image_url
      ? new URL(topic.image_url).pathname
      : topic.image_url,
    comments: comments,
    updated_at: rawPost.updated_at,
    created_at: rawPost.created_at,
  };

  save(JSON.stringify(post), `../www/content/${topicId}.json`);
};

(async () => {
  progress.start(fetch_count, 0);

  await download(
    new URL("/site.json", url).href,
    `${forumDirectory}/site.json`,
  );
  await fetchPosts();
  progress.stop();
})();
