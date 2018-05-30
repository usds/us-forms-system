/* eslint prefer-template: "off" */
const fs = require('fs');
const babel = require('babel-core');

const entrySourcePath = 'src/js';
const entryDestinationPath = 'lib/js';

function createTranspiledFiles(path) {
  fs.readdir(path, (error, files) => {
    files.forEach((file) => {
      const originalPath = path + '/' + file;
      const croppedPath = path.substring(19) + '/' + file;
      const destinationPath = entryDestinationPath + croppedPath;

      // If the file is actually a folder
      if (file.indexOf('.') === -1) {
        // Create folder in lib if it does not already exist
        if (!fs.existsSync(destinationPath)) {
          fs.mkdir(destinationPath);
        }

        // Reset path to be the contents of the folder
        const newPath = path + '/' + file;

        // Recursively call function to go through files within subdirectory
        createTranspiledFiles(newPath);
      } else {
        // Run file through babel and create new file in lib under parallel path
        babel.transformFile(originalPath, (err, result) => {
          const newFileName = `${destinationPath.substring(0, destinationPath.indexOf('.'))}.js`;

          fs.writeFile(newFileName, result.code);
        });
      }
    });
  });
}

createTranspiledFiles(entrySourcePath);
