import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { S3 } from "aws-sdk";

const s3Client = new S3();

export const handler = async (event: any, context: any) => {
  const bucket = await s3Client.listBuckets().promise();
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: JSON.stringify(bucket.Buckets),
    }),
  };
};
