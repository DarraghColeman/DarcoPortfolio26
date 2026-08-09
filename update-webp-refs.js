import fs from "fs";
import path from "path";

const SRC_DIR = "src";
const EXTENSIONS_TO_UPDATE = [".png", ".jpg", ".jpeg"];
const FILE_TYPES = [".js", ".jsx"];

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((entry) => {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, callback);
    } else if (FILE_TYPES.includes(path.extname(fullPath))) {
      callback(fullPath);
    }
  });
}

let filesChanged = 0;
let replacementsTotal = 0;

walkDir(SRC_DIR, (filePath) => {
  let content = fs.readFileSync(filePath, "utf8");
  let originalContent = content;
  let fileReplacements = 0;

  EXTENSIONS_TO_UPDATE.forEach((ext) => {
    // Matches the extension only when followed by a quote or backtick
    // (i.e. it's the end of a string literal/path, not part of other text)
    const regex = new RegExp(`\\${ext}(['"\`])`, "g");
    content = content.replace(regex, (match, quoteChar) => {
      fileReplacements++;
      return `.webp${quoteChar}`;
    });
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, "utf8");
    filesChanged++;
    replacementsTotal += fileReplacements;
    console.log(`Updated ${filePath} (${fileReplacements} reference${fileReplacements > 1 ? "s" : ""})`);
  }
});

console.log(`\nDone. ${filesChanged} file(s) changed, ${replacementsTotal} reference(s) updated.`);