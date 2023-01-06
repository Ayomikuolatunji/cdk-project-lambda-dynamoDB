// "use strict";
import { S3, config } from "aws-sdk";


const s3Client = new S3();



async function handler(event: any) {
  const { Buckets } = await s3Client.listBuckets().promise();
  console.log("got  something out")
  console.log(Buckets);
  return {
    statusCode: 200,
    body: JSON.stringify(Buckets),
  };
}
export { handler };
