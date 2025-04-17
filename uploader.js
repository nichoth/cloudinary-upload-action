// @ts-check
const core = require('@actions/core');
const cloudinary = require('cloudinary').v2;
const path = require('path');

/**
 * @TODO
 *   - can upload as content addressed blob
 *   - can upload to a different path, eg user-content/filename.jpg
 *   - can do a 'replication', meaning it deletes files that have been removed
 */

// cloudinary.uploader.destroy(public_id, options).then(callback);

/**
 * 
 * @param {string} cloudName 
 * @param {string} apiKey 
 * @param {string} apiSecret 
 * @param {string[]} files 
 * @param {{ prefix?:string }} opts Can add the files to a sub-folder
 * @returns {Promise<import('cloudinary').UploadApiResponse[]>}
 */
module.exports = function uploader (cloudName, apiKey, apiSecret, files, opts) {
  opts = opts || {}
  const { prefix } = opts
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
  })

  const cloudinaryUploader = file => {
    core.info(`uploading ${file}`);

    return cloudinary.uploader.upload(file, {
      public_id_prefix: prefix || '',
      public_id: path.basename(file, path.extname(file)),
    })
  }

  return Promise.all(files.map(cloudinaryUploader))
}
