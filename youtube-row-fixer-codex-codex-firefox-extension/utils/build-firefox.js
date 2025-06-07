const { directory } = require("./modules/config");
const processInlineScript = require("./modules/inlineScript");
const moveFile = require("./modules/moveFiles");
const renameFile = require("./modules/renameFiles");
const fs = require("fs").promises;
const path = require("path");

const fixHtmlPaths = async (directory) => {
  const htmlPath = path.join(directory, "index.html");
  try {
    let content = await fs.readFile(htmlPath, "utf8");
    // Replace absolute paths with relative paths
    content = content.replace(/href="\/next\//g, 'href="./next/');
    content = content.replace(/src="\/next\//g, 'src="./next/');
    await fs.writeFile(htmlPath, content, "utf8");
    console.log("Fixed HTML paths for Firefox");
  } catch (error) {
    console.error("Error fixing HTML paths:", error);
  }
};

const main = async () => {
  try {
    // Build the Firefox extension
    await moveFile(
      "extension/manifest.json",
      `${directory}/manifest.json`
    );
    await renameFile(directory);
    await processInlineScript(directory);
    await fixHtmlPaths(directory);
    console.log("Firefox extension build completed!");
  } catch (err) {
    console.log(err);
  }
};

main(); 