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

  const requestBody =
    typeof event.body == "object" ? event.body : JSON.parse(event.body);
  const helloId = event.queryStringParameters?.["helloId"];

  if (requestBody && helloId) {
    const requestBodyKey = Object.keys(requestBody)[0];
    const requestBodyValue = requestBody[requestBodyKey];

    const updateResult = await dbClient
      .update({
        TableName: "helloTable",
        Key: {
          ["helloId"]: helloId,
        },
        UpdateExpression: "set #zzzNew = :new",
        ExpressionAttributeValues: {
          ":new": requestBodyValue,
        },
        ExpressionAttributeNames: {
          "#zzzNew": requestBodyKey,
        },
        ReturnValues: "UPDATED_NEW",
      })
      .promise();

    result.body = JSON.stringify(updateResult);
  }

  return result;
}

export { handler };
