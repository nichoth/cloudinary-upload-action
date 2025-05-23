// @ts-check
const core = require('@actions/core');
const isGlob = require('is-glob');
const glob = require('glob');
const uploader = require('./uploader');

async function run() {
  try {
    const cloudName = core.getInput('cloud-name') || process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = core.getInput('api-key') || process.env.CLOUDINARY_API_KEY;
    const apiSecret = core.getInput('api-secret') || process.env.CLOUDINARY_API_SECRET;
    const imagesPath = core.getInput('images');
    const prefix = core.getInput('public_id_prefix');
    const folder = core.getInput('folder');
    const reset = core.getInput('reset');

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error('Cloudinary cloud name, api key and api secret are required');
    }

    console.log('**given**', imagesPath)

    let paths = [];
    if (isJson(imagesPath)) {
      paths = JSON.parse(imagesPath);
    } else if (isGlob(imagesPath)) {
      paths = glob.sync(imagesPath);
    } else if (typeof imagesPath === 'string') {
      paths = [imagesPath]
    } else {
      throw new Error('Images parameter is required');
    }

    await uploader(cloudName, apiKey, apiSecret, paths, {
      prefix,
      folder,
      reset: !!reset
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
