import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { join } from "path";
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { GenericTable } from "./GenericTable";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class SpaceStack extends Stack {
  private api = new RestApi(this, "helloApi");
  private helloTable = new GenericTable("helloTable", "helloId", this);
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);


    const helloNodejs = new LambdaFunction(this, "helloLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(join(__dirname, "..", "build", "helloLambda")),
      handler: "helloLambda.handler",
    });

    // const helloNodejs = new NodejsFunction(this, "helloLambda", {
    //   entry: join(__dirname, "..", "services", "hello", "hello.ts"),
    //   handler: "handler",
    // });

    // const helloNodejs = new NodejsFunction(this, "helloLambda", {
    //   entry: join(__dirname, "..", "services", "hello", "hello.ts"),
    //   handler: "handler",
    // });

    new Bucket(this, "upload-img", {
      publicReadAccess: true,
      bucketName: "upload-new-image",
    });
    // hello api lambda integration
    const helloLambdaIntegration = new LambdaIntegration(helloNodejs);
    const helloLambdaResource = this.api.root.addResource("hello");
    helloLambdaResource.addMethod("GET", helloLambdaIntegration);
  }
}
