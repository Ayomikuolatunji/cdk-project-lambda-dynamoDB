import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { join } from "path";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { GenericTable } from "./GenericTable";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

export class SpaceStack extends Stack {
  private api = new RestApi(this, "helloApi");
  private helloTable = new GenericTable(this, {
    tableName: "helloTable",
    primaryKey: "helloId",
    createLambdaPath:"CreateTable"
  });
  
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const helloNodejs = new NodejsFunction(this, "helloLambda", {
      entry: join(__dirname, "..", "services", "hello", "hello.ts"),
      handler: "handler",
    });

  // this.helloTable
    const s3ListPolicy = new PolicyStatement();
    s3ListPolicy.addActions("s3:ListAllMyBuckets");
    s3ListPolicy.addResources("*");
    helloNodejs.addToRolePolicy(s3ListPolicy);

    new Bucket(this, "upload-img", {
      publicReadAccess: true,
      bucketName: "upload-new-image",
    });
    // hello api lambda integration
    const helloLambdaIntegration = new LambdaIntegration(helloNodejs);
    const helloLambdaResource = this.api.root.addResource("hello");
    helloLambdaResource.addMethod("GET", helloLambdaIntegration);


    // spaces api integration  
    const spaceResource=this.api.root.addResource("spaces")
    spaceResource.addMethod("POST", this.helloTable.createLambdaIntegration)
  }
}
