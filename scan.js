const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const HOME_DIR = os.homedir();

const FILES_TO_IGNORE = ['.DS_Store', '.', '..'];
const ASD_FILE_EXTENSION = '.asd';

const SPLICE_ROOT_FOLDER = path.resolve(HOME_DIR, 'Splice');
const SPLICE_SOUND_PACKS_FOLDER = path.resolve(SPLICE_ROOT_FOLDER, 'sounds', 'packs');

const PRODUCTION_SAMPLES_ROOT_FOLDER = path.resolve(HOME_DIR, 'production', 'samples', 'Splice');
const PRODUCTION_SAMPLES_UNSORTED_FOLDER = path.resolve(PRODUCTION_SAMPLES_ROOT_FOLDER, '__UNSORTED');

async function getFilesInDirectory(entry, rootPath) {
  let result = {};
  const directoryPath = path.resolve(rootPath, entry);
  const content = await fs.readdir(directoryPath);
  for (let item of content) {
    if (FILES_TO_IGNORE.includes(item)) {
      continue;
    }
    const stats = await fs.lstat(
      path.resolve(rootPath, entry, item)
    );

    if (stats.isDirectory()) {
      const newRootPath = path.resolve(rootPath, entry);
      const filesToAdd = await getFilesInDirectory(
        item,
        newRootPath
      );

      result = {
        ...result,
        ...filesToAdd,
      };
    } else if (stats.isFile()) {
      if (item.endsWith(ASD_FILE_EXTENSION)) {
        continue;
      }
      result[item] = path.resolve(rootPath, entry, item);
    }
  }
  return result;
}

function getDiff(currentLibrary, spliceLibrary) {
  const diff = {};
  for (const [sampleName, filePath] of Object.entries(spliceLibrary)) {
    if (currentLibrary[sampleName]) {
      continue;
    }

    diff[sampleName] = filePath;
  }
  return diff;
}

async function copySample(sampleName, filePath) {
  const destination = path.resolve(PRODUCTION_SAMPLES_UNSORTED_FOLDER, sampleName);

  await fs.copyFile(filePath, destination);
}

async function init() {

  // const existingFiles = await getSortedFiles(PRODUCTION_SAMPLES_ROOT_FOLDER);

  // const newFiles = await getSortedFiles(SPLICE_SOUND_PACKS_FOLDER);
  const existingFiles = await getFilesInDirectory('', PRODUCTION_SAMPLES_ROOT_FOLDER);
  const newFiles = await getFilesInDirectory('', SPLICE_SOUND_PACKS_FOLDER);

  console.log(`Found ${Object.keys(existingFiles).length} existing samples`);
  console.log(`Found ${Object.keys(newFiles).length} new samples`);
  
  console.log('Generating Diff...');
  const processList = getDiff(existingFiles, newFiles);

  console.log(`Need to process ${Object.keys(processList).length} new samples`);
  for (const [sampleName, filePath] of Object.entries(processList)) {
    console.log(`${sampleName} - ${filePath}`);
    await copySample(sampleName, filePath);
  }
  console.log('Finished!');
}

init();
