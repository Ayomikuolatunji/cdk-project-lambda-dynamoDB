import { DynamoDB } from "aws-sdk";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { MissingFieldError, validateHelloEntry } from "../shared/InputValidator";

const generateRandomId=()=>{
    return Math.random().toString(36).slice(2)
}

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
    const item =
      typeof event.body == "object" ? event.body : JSON.parse(event.body);
    item.helloId = generateRandomId()
    validateHelloEntry(item);
    await dbClient
      .put({
        TableName: "helloTable",
        Item: item,
      })
      .promise();
    result.body = `Created item with id: ${item.helloId}`;
  } catch (error: any) {
    if (error instanceof MissingFieldError) result.statusCode = 403;
    result.statusCode = 500;
    result.body = error.message;
  }
  return result;
}

export { handler };
