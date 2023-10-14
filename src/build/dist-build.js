const { promises: fs, readFileSync, writeFileSync } = require("fs");
const del = require("del");
const zipdir = require("zip-dir");
const path = require("path");

async function copyDir(src, dest, buildMode) {
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

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath, buildMode);
    } else {
      let fileContent = await fs.readFile(srcPath, "utf-8");

      // Ganti semua kemunculan {REPLACE_ME_URL} dengan URL dan penulis yang sesuai dengan mode build
      fileContent = fileContent.replace(
        /{REPLACE_ME_URL}/g,
        buildMode === "velocity"
          ? "https://velocitydeveloper.com"
          : "https://websweetstudio.com"
      );
      fileContent = fileContent.replace(
        /{REPLACE_ME_AUTHOR}/g,
        buildMode === "velocity" ? "Velocity Developer" : "Aditya K"
      );

      // Tulis file yang telah dimodifikasi ke direktori tujuan
      await fs.writeFile(destPath, fileContent);
    }
  }
}

const buildMode = process.argv[2] || ""; // Mendapatkan mode build dari argument pertama atau default ''

del("./dist").then(() => {
  console.log("dist is deleted!");
  copyDir("./", "./dist/custom-plugin/custom-plugin", buildMode).then(() => {
    let zipName =
      buildMode === "velocity"
        ? "custom-plugin-velocity"
        : "custom-plugin-websweet";
    zipdir("./dist/custom-plugin", {
      saveTo: "./dist/" + zipName + ".zip",
    });
    console.log("Zip file created");
  });
});
