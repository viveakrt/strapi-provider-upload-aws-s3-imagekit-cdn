# strapi-provider-upload-aws-s3-imagekit-cdn
Strapi provider upload for AWS s3 integrated with image Kit


```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    provider: 'aws-s3-imagekit-cdn',
    providerOptions: {
      accessKeyId: env('AWS_ACCESS_KEY_ID'),
      secretAccessKey: env('AWS_ACCESS_SECRET'),
      region: env('AWS_REGION'),
      params: {
        Bucket: env('AWS_BUCKET'),
      },
      cdn: env('CDN_URL'), //optional
      path: env('BUCKET_PATH') //optional
    },
  },
  // ...
});
```