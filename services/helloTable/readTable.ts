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
  try {
    const response = await dbClient
      .scan({
        TableName: "helloTable",
      })
      .promise();
    result.body = JSON.stringify(response);
  } catch (error: any) {
    result.body = error.message;
  }
  return result;
}

export { handler };
