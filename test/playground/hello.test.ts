import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "../../services/helloTable/updateTable";

const event: APIGatewayProxyEvent = {
  queryStringParameters: {
    helloId: "f803eb24-a79e-4995-922a-e53fdbe1af37",
  },
  body: {
    location: "new location",
  },
} as any;

handler(event, {} as any)
  .then((apiResult) => {
    const items = JSON.parse(apiResult.body);
    console.log(items);
  })
  .catch((err) => console.log(err));
