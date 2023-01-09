// import {
//   APIGatewayProxyEvent,
//   APIGatewayProxyResult,
//   Context,
// } from "aws-lambda";

import { handler } from "../../services/helloTable/readTable";



// const event = {
//   body: {
//     location: "Paris",
//   },
// };

handler({} as any, {} as any).
then(data=>console.log(data))
.catch(err=>console.log(err))
