import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { v4 } from 'uuid'




const dbClient = new DynamoDB.DocumentClient();
async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: 'Hello from DYnamoDb'
    }
    const item = typeof event.body == 'object'? event.body: JSON.parse(event.body);
    item.helloId = v4();
    try {
        await dbClient.put({
            TableName: 'helloTable',
            Item: item
        }).promise()
    } catch (error:any) {
        result.body = error.message
    }
    result.body = `Created item with id: ${item.helloId}`
    return result
}

export { handler }