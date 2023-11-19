import "dotenv/config";
import { download, save } from "./lib/utils";
import { Presets, MultiBar } from "cli-progress";
import { Topic } from "./types/generated";
import { Post, Comment } from "./types";
import * as cheerio from "cheerio";
import Bottleneck from "bottleneck";

const url = new URL(process.env.URL!);
const posts = Number(process.env.POSTS!);
const fetch_count = Number(process.env.FETCH!);

const multibar = new MultiBar(
  {
    format: `{title} [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}`,
  },
  Presets.shades_classic,
);

const progress = multibar.create(fetch_count, 0, { title: "Posts" });
const staticProgress = multibar.create(0, 0, { title: "Static files" });

const forumDirectory = "../www/public";

const staticLimiter = new Bottleneck({
  maxConcurrent: 10,
});

const ratelimiter1 = Number(process.env.DISCOURSE_MAX_REQS_PER_IP_PER_MINUTE!);
const limiter1 = new Bottleneck({
  reservoir: ratelimiter1,
  reservoirRefreshAmount: ratelimiter1,
  reservoirRefreshInterval: 60 * 1000,
  minTime: (60 * 1000) / ratelimiter1,
  maxConcurrent: 1,
});

const ratelimiter2 = Number(
  process.env.DISCOURSE_MAX_REQS_PER_IP_PER_10_SECONDS!,
);
const limiter2 = new Bottleneck({
  reservoir: ratelimiter2,
  reservoirRefreshAmount: ratelimiter2,
  reservoirRefreshInterval: 10 * 1000,
  maxConcurrent: 1,
});

// Fetch posts 💀
const fetchPosts = async () => {
  for (let i = posts; i > posts - fetch_count; i--) {
    await limiter1.schedule(
      async () => await limiter2.schedule(async () => await fetchPost(i)),
    );
  }
};

const downloadStatic = async (url: string, output: string) => {
  staticLimiter.submit(
    async (callback) => {
      staticProgress.setTotal(staticProgress.getTotal() + 1);
      let content;
      try {
        content = await download(url, output, "buffer");
      } catch (error) {
        console.log(error);
        callback(error, null);
        return staticProgress.setTotal(staticProgress.getTotal() - 1);
      }
      staticProgress.increment();
      callback(null, content);
      return content;
    },
    () => {},
  );
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

        downloadStatic(imageUrl, `../www/public${new URL(imageUrl).pathname}`);

        post.raw = post.raw.replace(replacementRegex, pathname);
      }
    });
  });

  const comments: Comment[] = posts.slice(1).map((post) => {
    downloadStatic(
      new URL(post.avatar_template.replace("{size}", "250"), url).href,
      `../www/public${decodeURIComponent(
        new URL(post.avatar_template, url).pathname,
      )}`,
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
  downloadStatic(
    new URL(rawPost.avatar_template.replace("{size}", "250"), url).href,
    `../www/public${decodeURIComponent(
      new URL(rawPost.avatar_template, url).pathname,
    )}`,
  );
  if (topic.image_url) {
    downloadStatic(
      topic.image_url,
      `../www/public${new URL(topic.image_url).pathname}`,
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
  await download(
    new URL("/site.json", url).href,
    `${forumDirectory}/site.json`,
  );
  await fetchPosts();
  multibar.stop();
})();
