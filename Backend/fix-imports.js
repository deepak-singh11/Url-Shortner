// // fix-imports.js
// import fs from "fs";
// import path from "path";

// function fixImportStatements(filePath) {
//   let content = fs.readFileSync(filePath, "utf-8");

//   // Regex: find all relative imports
//   content = content.replace(
//     /from\s+['"](\.\/|\.\.\/.*?)([^'"]+?)['"]/g,
//     (match, base, file) => {
//       // add .js if missing
//       if (!file.endsWith(".js")) {
//         return `from '${base}${file}.js'`;
//       }
//       return match;
//     }
//   );

//   fs.writeFileSync(filePath, content, "utf-8");
// }

// function walk(dir) {
//   const files = fs.readdirSync(dir);
//   for (let file of files) {
//     const fullPath = path.join(dir, file);
//     if (fs.statSync(fullPath).isDirectory()) {
//       walk(fullPath);
//     } else if (fullPath.endsWith(".ts")) {
//       fixImportStatements(fullPath);
//     }
//   }
// }

// walk("src");
