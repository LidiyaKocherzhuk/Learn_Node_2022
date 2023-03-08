const fs = require('node:fs/promises');
const path = require('path');

const commonFolder = path.join(__dirname, 'common')

const createAsync = async () => {
    try {
        const folders = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];
        let i = 1;

        for (const folder of folders) {

            await fs.mkdir(
                path.join(commonFolder, folder),
                {recursive: true},
            );

            await fs.writeFile(
                path.join(commonFolder, folder, `file${i}`),
                `Hello from file${i}`,
            );

            i++;

        }

    } catch (e) {
        console.log(e);
    }
}

const getDetailAboutFiles = async () => {
    try {
        const commonFolderFiles = await fs.readdir(commonFolder);

        const checkIsFile = async (file) => {
            const filePath = path.join(commonFolder, file);
            const stat = await fs.stat(filePath);

            if (stat.isDirectory()) {
                console.log(`Is directory - ${filePath}!`);
                const theDirectoryFiles = await fs.readdir(filePath);

                if (theDirectoryFiles.length) {
                    for (const theDirectoryFile of theDirectoryFiles) {
                        await checkIsFile(path.join(file, theDirectoryFile));
                    }
                }

                return;
            }
            if (stat.isFile()) {
                console.log(`Is file - ${filePath}!`);
                return;
            }
            console.log('It is neither a directory nor a file!');

        };

        for (const file of commonFolderFiles) {
            await checkIsFile(file);
        }
    } catch (e) {
        console.log(e);
    }

};

module.exports = {
    createAsync,
    getDetailAboutFiles,
}
