import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../services/helloTable/deleteTable';

const event: APIGatewayProxyEvent = {
    queryStringParameters: {
        spaceId: 'f803eb24-a79e-4995-922a-e53fdbe1af37'
    }
} as any;


const result = handler(event, {} as any).then((apiResult)=>{
    const items = apiResult.body
    console.log(items)
});