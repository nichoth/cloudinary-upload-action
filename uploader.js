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
 * @param {{
 *   prefix?:string,
 *   folder?:string,
 *   reset?:boolean
 * }} opts Can add the files to a sub-folder
 * @returns {Promise<import('cloudinary').UploadApiResponse[]>}
 */
module.exports = async function uploader (cloudName, apiKey, apiSecret, files, opts) {
  opts = opts || {}
  const { prefix, reset } = opts
  let { folder } = opts
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
  })

  const cloudinaryUploader = async file => {
    core.info(`uploading ${file} with prefix ${prefix}`);

    const opts = {
      public_id: (prefix || '') + path.basename(file, path.extname(file))
    }

    if (folder) opts.folder = folder

    if (reset) {
      if (!folder && !prefix) {
        // then delete everything
        await cloudinary.api.delete_all_resources()
      } else {
        if (folder) {
          // delete this one folder
          if (folder[folder.length - 1] !== '/') {
            // must have the trailing slash
            folder = folder + '/'
          }
          await cloudinary.api.delete_resources_by_prefix(folder)
        }

        if (prefix) {
          await cloudinary.api.delete_resources_by_prefix(prefix)
        }
      }
    }

    return await cloudinary.uploader.upload(file, opts)
  }

  return await Promise.all(files.map(cloudinaryUploader))
}
