## "Cloudinary Upload" Action For GitHub Actions

Upload files to [Cloudinary](https://cloudinary.com/).

Created as a way to use Cloudinary with a headless CMS.

**Table of Contents**

<!-- toc -->

- [Usage](#usage)
  * [Multiple files upload](#multiple-files-upload)
- [Example](#example)
- [Credentials](#credentials)
- [License](#license)

<!-- tocstop -->

## Usage

Add the following step to your workflow:

```yaml
    - name: Cloudinary Upload Image
      uses: nichoth/cloudinary-upload-action@v3.9
      with:
          cloud-name: ${{ secrets.CLOUDINARY_CLOUD_NAME }}
          api-key: ${{ secrets.CLOUDINARY_API_KEY }}
          api-secret: ${{ secrets.CLOUDINARY_API_SECRET }}
          public_id_prefix: "user-files"
          folder: "cool-folder-name"
          images: "./assets/*.jpg"
          reset: true
```

> [!WARNING]  
> If you pass in `reset` wihout passing in a `folder`, this will delete
> all assets from the Cloudinary account.

### secrets
Define a few Github secrets that must be passed into the action:

```sh
CLOUDINARY_CLOUD_NAME="cool-cloud"
CLOUDINARY_API_KEY="123456"
CLOUDINARY_API_SECRET="123abc"
```

You can specify some options for creating assets in Cloudinary:

* `folder` -- Add all files to a subfolder
* `public_id_prefix` -- prefix for the filename
* `reset` -- Delete all assets before uploading. Make the Cloudinary API look
  exactly like the local files. The scope of the delete depends on the `folder`
  option passed in. Without a `folder` option, it will **delete all assets**
  from the Cloudinary account.
 

### Multiple files upload

You can upload multiple files with the `images` parameter by putting a file
path pattern.

```yaml
    - name: Cloudinary Upload Images
      uses: emmanuelgautier/cloudinary-upload-action@v2
      with:
          cloud-name: ${{ secrets.CLOUDINARY_CLOUD_NAME }}
          api-key: ${{ secrets.CLOUDINARY_API_KEY }}
          api-secret: ${{ secrets.CLOUDINARY_API_SECRET }}
          images: "./medias/**/*.jpg"
```

Or directly an array of file paths.

```yaml
    - name: Cloudinary Upload Images
      uses: emmanuelgautier/cloudinary-upload-action@v2
      with:
          cloud-name: ${{ secrets.CLOUDINARY_CLOUD_NAME }}
          api-key: ${{ secrets.CLOUDINARY_API_KEY }}
          api-secret: ${{ secrets.CLOUDINARY_API_SECRET }}
          images: "[\"./medias/images/test1.jpg\", \"./medias/images/test2.jpg\"]"
```

See [action.yml](action.yml) for the full documentation for this action's
inputs and outputs.

## Example
Full example of consuming this action:

```yml
name: Cloudinary Upload

on:
    push:
      branches:
        - 'main'
      paths:
        - 'src/assets/images/*'

jobs:
  deploy:
    name: Cloudinary Deploy
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v4
    
    - name: Push to Cloudinary
      uses: nichoth/cloudinary-upload-action@v3.13
      with:
          cloud-name: ${{ secrets.CLOUDINARY_CLOUD_NAME }}
          api-key: ${{ secrets.CLOUDINARY_API_KEY }}
          api-secret: ${{ secrets.CLOUDINARY_API_SECRET }}
          public_id_prefix: "${{ github.event.repository.name }}."
          reset: true
          images: "./src/assets/images/*.{jpg,png,jpeg,webp,avif,gif,svg}"
```

## Credentials

We recommend following [Cloudinary Configuration Docs](https://cloudinary.com/documentation/node_integration#configuration)
for adding your credentials.
