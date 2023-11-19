import fetch from "node-fetch";
import * as fs from "fs";

export const download = async (
  url: string,
  output?: string,
  type: "string" | "buffer" = "string",
): Promise<any> => {
  try {
    if (output) {
      if (fs.existsSync(output)) return;
    }

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) return;
      throw new Error(`${url} - ${response.status} (${response.statusText})`);
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
  } catch (error) {
    console.error(error);
  }
};

export const save = (content: any, output: string) => {
  const outputDirectory = output.split("/").slice(0, -1).join("/");
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  fs.writeFileSync(output, content);
};
