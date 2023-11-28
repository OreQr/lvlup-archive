import fetch from "node-fetch";
import * as fs from "fs";
import pRetry from "p-retry";

export const download = async (
  url: string,
  output?: string,
  type: "string" | "buffer" = "string",
): Promise<any> => {
  const request = async () => {
    if (output) {
      if (fs.existsSync(output)) return;
    }

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) return;
      const reponseText = await response.text();
      console.error(
        `${url} - ${response.status} (${
          reponseText ? reponseText : response.statusText
        })`,
      );
      throw new Error(
        `${url} - ${response.status} (${
          reponseText ? reponseText : response.statusText
        })`,
      );
    }

    let content;
    switch (type) {
      case "string":
        content = await response.text();
        break;
      case "buffer":
        content = Buffer.from(await response.arrayBuffer());
        break;
    }

    if (output) save(content, output);

    return content;
  };

  return await pRetry(request, {
    onFailedAttempt: (error) => {
      console.error(`${url} | ${error.message}`);
    },
    retries: 10,
    minTimeout: 1000,
  });
};

export const save = (content: any, output: string) => {
  const outputDirectory = output.split("/").slice(0, -1).join("/");
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  fs.writeFileSync(output, content);
};

export const isURL = (text: string) => {
  try {
    new URL(text);
    return true;
  } catch (error) {
    return false;
  }
};
