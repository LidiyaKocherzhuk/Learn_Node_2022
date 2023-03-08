const fs = require('fs');
const path = require('path');

const makeFiles = () => {

    for (let i = 1; i <= 5; i++) {
        fs.mkdir(path.join(__dirname, `folder${i}`), (err) => {
            if (err) {
                throw new Error(err.message);
            }
        });
    }

    fs.readdir(path.join(__dirname), (err, files) => {
        if (err) {
            throw new Error(err.message);
        }

        files.forEach(file => {
            fs.stat(path.join(__dirname, file), (err, stat) => {

                if (err) {
                    throw new Error(err.message);
                }

                if (stat.isDirectory()) {
                    const fileNumber = file.at(-1);

                    fs.writeFile(
                        path.join(__dirname, file, `file${fileNumber}.txt`),
                        `Hello from file number - ${fileNumber}`,
                        (err) => {

                            if (err) {
                                throw new Error(err.message);
                            }
                        });
                }

            });

        });
    });

};

const deleteFiles = () => {
    fs.readdir(path.join(__dirname), (err, files) => {
        if (err) {
            throw new Error(err.message);
        }

        files.forEach(file => {

            fs.stat(path.join(__dirname, file), (err, stat) => {
                if (err) {
                    throw new Error(err.message);
                }

                if (stat.isDirectory()) {
                    fs.rm(path.join(__dirname, file), {recursive: true},(err) => {
                        if (err) {
                            throw new Error(err.message);
                        }
                    });
                }
            });

        });
    });
}

module.exports = {
    makeFiles,
    deleteFiles,
}
