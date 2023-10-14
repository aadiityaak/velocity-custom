const { promises: fs } = require("fs");
const del = require("del");
const zipdir = require("zip-dir");
const path = require("path");

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  let entries = await fs.readdir(src, { withFileTypes: true });
  let ignore = [
    "node_modules",
    "dist",
    "src",
    ".git",
    ".github",
    ".gitattributes",
    ".gitignore",
    ".vscode",
    "composer.json",
    "composer.lock",
    "package.json",
    "package-lock.json",
  ];

  for (let entry of entries) {
    if (ignore.indexOf(entry.name) != -1) {
      continue;
    }
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    entry.isDirectory()
      ? await copyDir(srcPath, destPath)
      : await fs.copyFile(srcPath, destPath);
  }
}
del("./dist").then(() => {
  console.log("dist is deleted!");
  copyDir("./", "./dist/velocity-custom/velocity-custom").then(() => {
    zipdir("./dist/velocity-custom", {
      saveTo: "./dist/velocity-custom.zip",
    });
    console.log("Zip file created");
  });
});
