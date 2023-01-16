import { Auth, Amplify } from "aws-amplify";
import { config } from "./config";

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.REGION,
    userPoolId: config.USER_POOL_ID,
    userPoolWebClientId: config.APP_CLIENT_ID,
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
});

export class AuthService {
  public async login(username: string, password: string) {
    const user = await Auth.signIn(username, password);
    return user;
  }
}
