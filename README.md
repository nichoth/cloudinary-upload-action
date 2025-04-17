## "Cloudinary Upload" Action For GitHub Actions

Upload your medias with Cloudinary Upload Github Action to [Cloudinary](https://cloudinary.com/) SaaS solution for images and videos upload, storage, optimization and CDN.

**Table of Contents**

<!-- toc -->

- [Usage](#usage)
- [Credentials](#credentials)
- [Maintainers](#maintainers)
- [License](#license)

<!-- tocstop -->

## Usage

Add the following step to your workflow:

```yaml
    - name: Cloudinary Upload Image
      uses: emmanuelgautier/cloudinary-upload-action@v2.0
      with:
          cloud-name: ${{ secrets.CLOUDINARY_CLOUD_NAME }}
          api-key: ${{ secrets.CLOUDINARY_API_KEY }}
          api-secret: ${{ secrets.CLOUDINARY_API_SECRET }}
          public_id_prefix: "user-files"
          folder: "cool-folder-name"
          image: "./your-image.jpg"
```

You can add all files to a subfolder if you prefer, via `public_id_prefix`.


### Multiple files upload

You can upload multiple files with the `images` parameter putting a file path pattern.

```yaml
    - name: Cloudinary Upload Images
      uses: emmanuelgautier/cloudinary-upload-action@v2
      with:
          cloud-name: ${{ secrets.CLOUDINARY_CLOUD_NAME }}
          api-key: ${{ secrets.CLOUDINARY_API_KEY }}
          api-secret: ${{ secrets.CLOUDINARY_API_SECRET }}
          images: "./medias/**/*.jpg"
```

Or directly an array of files path.

```yaml
    - name: Cloudinary Upload Images
      uses: emmanuelgautier/cloudinary-upload-action@v2
      with:
          cloud-name: ${{ secrets.CLOUDINARY_CLOUD_NAME }}
          api-key: ${{ secrets.CLOUDINARY_API_KEY }}
          api-secret: ${{ secrets.CLOUDINARY_API_SECRET }}
          images: "[\"./medias/images/test1.jpg\", \"./medias/images/test2.jpg\"]"
```

See [action.yml](action.yml) for the full documentation for this action's inputs and outputs.

## Credentials

We recommend following [Configuration Cloudinary Documentation](https://cloudinary.com/documentation/node_integration#configuration) for adding your credentials.

## License

MIT © [Emmanuel Gautier](https://www.emmanuelgautier.com)
