// "use strict";

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const s3 = new AWS.S3();

// Change this value to adjust the signed URL's expiration
const URL_EXPIRATION_SECONDS = 300;

const getUploadURL = async function (event: any) {
  const randomID: string | number = Math.random() * 10000000;
  const Key = `${randomID}.jpg`;
  // Get signed URL from S3
  const s3Params = {
    Bucket: "upload-new-image",
    Key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: "image/jpeg",
    ACL: "public-read",
  };
  console.log("Params: ", s3Params);
  const uploadURL = await s3.getSignedUrlPromise("putObject", s3Params);

  return JSON.stringify({
    uploadURL: uploadURL,
    Key,
  });
};
async function handler(event: any) {
  return await getUploadURL(event);
}
export { handler };
