const fs = require('fs');
const path = require('path');
const {makeFiles, deleteFiles} = require('./test2/fileInsideFolderCallback');
const {createAsync, getDetailAboutFiles} = require("./test3/test2Async");

// const folders = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];
//
// fs.mkdir(path.join(__dirname, "test"), (err) => {
//     if (err) {
//         console.log(err);
//     }
// });
//
// folders.forEach(item => {
//     fs.mkdir(path.join("./test", item), (err) => {
//         if (err) {
//             console.log(err);
//         }
//     });
// });
//
// for (let i = 1; i <= 5; i++) {
//     fs.writeFile(
//         path.join("./test", `file${i}.txt`),
//         `Hello from file number - ${i} )))`,
//         (err) => {
//             if (err) {
//                 console.log(err);
//             }
//         });
// }
//
// fs.readdir(path.join("./test"), (err, files) => {
//
//     if (err) {
//         console.log(err);
//     }
//     files.forEach(item => {
//
//         fs.stat(path.join("./test", item), (err, stat) => {
//
//             if (err) {
//                 console.log(err);
//             }
//
//             const result = stat.isFile() ? "Yes, it is." : "Not, it isn't.";
//             console.log(`Is ${item} file? - ${result}`);
//
//         });
//
//     });
//
// });


// makeFiles();
deleteFiles();

// createAsync().then()
getDetailAboutFiles().then()
