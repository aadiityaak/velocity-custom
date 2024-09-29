const { promises: fs, readFileSync, writeFileSync } = require("fs");
const del = require("del");
const zipdir = require("zip-dir");
const path = require("path");

let version;

// Read version from package.json
const packageJsonPath = path.join(__dirname, "../../package.json");
const packageJsonContent = readFileSync(packageJsonPath, "utf-8");
const packageJson = JSON.parse(packageJsonContent);
version = packageJson.version;

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

  let siteUrl, authorName, zipName;

  if (buildMode === "velocity") {
    siteUrl = "https://velocitydeveloper.com";
    authorName = "Velocity Developer";
    zipName = "custom-plugin-velocity";
  } else if (buildMode === "kai") {
    siteUrl = "https://kai.web.id";
    authorName = "Eko Mustakim";
    zipName = "custom-plugin-kai";
  } else {
    siteUrl = "https://websweetstudio.com";
    authorName = "Aditya K";
    zipName = `custom-plugin-websweet`;
  }

  for (let entry of entries) {
    if (ignore.includes(entry.name)) {
      continue;
    }
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath, buildMode);
    } else {
      let fileContent = await fs.readFile(srcPath, "utf-8");
      fileContent = fileContent.replace(/{REPLACE_ME_URL}/g, siteUrl);
      fileContent = fileContent.replace(/{REPLACE_ME_AUTHOR}/g, authorName);
      await fs.writeFile(destPath, fileContent);
    }
  }

  return zipName;
}

const buildModes = ["velocity", "kai", "websweet"];

del("./dist").then(() => {
  console.log("dist is deleted!");
  const zipPromises = buildModes.map((buildMode) =>
    copyDir(
      "./",
      `./dist/custom-plugin/custom-plugin-${buildMode}`,
      buildMode
    ).then((zipName) => {
      return zipdir(`./dist/custom-plugin/custom-plugin-${buildMode}`, {
        saveTo: `./dist/${zipName}-${version}.zip`,
      });
    })
  );

  Promise.all(zipPromises).then(() => {
    console.log("All zip files created");
  });
});
