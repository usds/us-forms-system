/* eslint prefer-template: "off" */
const fs = require('fs');
const babel = require('babel-core');
const sass = require('node-sass');

const jsEntrySourcePath = 'src/js/';
const jsEntryDestinationPath = 'lib/js/';
const cssEntrySourcePath = 'src/scss/';
const cssEntryDestinationPath = 'lib/css/';

function createCompiledFiles(entrySourcePath, entryDestinationPath, startIndexOfString, compilationFunction) {
  fs.readdir(entrySourcePath, (error, files) => {
    files.forEach((file) => {
      const originalPath = entrySourcePath + file;
      const croppedPath = entrySourcePath.substring(startIndexOfString) + file;
      const destinationPath = entryDestinationPath + croppedPath;

      // If the file is actually a folder
      if (file.indexOf('.') === -1) {
        if (!fs.existsSync(destinationPath)) {
          fs.mkdir(destinationPath);
        }

        // Reset path to be the contents of the folder
        const newPath = originalPath + '/';

        // Recursively call function to go through files within subdirectory
        createCompiledFiles(newPath, entryDestinationPath, startIndexOfString, compilationFunction);
      // making sure no .DS_Store files get added to the mix
      } else if (file.indexOf('.') !== 0) {
        compilationFunction(originalPath, destinationPath);
      }
    });
  });
}

function babelTranspilation(originalPath, destinationPath) {
  // Run file through babel and create new file in lib under parallel path
  babel.transformFile(originalPath, (err, result) => {
    const newFileName = `${destinationPath.substring(0, destinationPath.indexOf('.'))}.js`;

    fs.writeFile(newFileName, result.code);
  });
}

function sassCompilation(originalPath, destinationPath) {
  sass.render({
    file: originalPath,
  }, (err, result) => {
    if (!err) {
      const newFileName = `${destinationPath.substring(0, destinationPath.indexOf('.'))}.css`;

      fs.writeFile(newFileName, result.css);
    }
  });
}

// Run build for JavaScript
createCompiledFiles(jsEntrySourcePath, jsEntryDestinationPath, 7, babelTranspilation);

// Run build for SCSS
createCompiledFiles(cssEntrySourcePath, cssEntryDestinationPath, 9, sassCompilation);
