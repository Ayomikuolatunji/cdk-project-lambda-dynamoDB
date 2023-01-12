import { DynamoDB } from "aws-sdk";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";

const dbClient = new DynamoDB.DocumentClient();

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const result: APIGatewayProxyResult = {
    statusCode: 200,
    body: "Hello from DYnamoDb",
  };

  const spaceId = event.queryStringParameters?.["helloId"];

  if (spaceId) {
    const deleteResult = await dbClient
      .delete({
        TableName: "helloTable",
        Key: {
          ["helloId"]: spaceId,
        },
      })
      .promise();
    result.body = JSON.stringify(deleteResult);
  }

  return result;
}

export { handler };
