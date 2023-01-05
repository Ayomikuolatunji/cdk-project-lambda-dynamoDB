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

export class SpaceStack extends Stack {
  private api = new RestApi(this, "helloApi");
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);
    const helloLambda = new LambdaFunction(this, "helloLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(join(__dirname, "..", "services", "hello")),
      handler: "hello.main",
    });
    new Bucket(this, "upload-img", {
      publicReadAccess: true,
      bucketName: "upload-new-image",
    });
    // hello api lambda integration
    const helloLambdaIntegration = new LambdaIntegration(helloLambda);
    const helloLambdaResource = this.api.root.addResource("hello");
    helloLambdaResource.addMethod("GET", helloLambdaIntegration);
  }
}
