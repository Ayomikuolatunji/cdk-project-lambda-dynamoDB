import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { handler } from "../../services/helloTable/CreateTable";


const event = {
  body: {
    location: "Paris",
  },
};

handler(event as any, {} as any);
