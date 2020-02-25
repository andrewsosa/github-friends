// @flow
import * as React from "react";
import { LinkButton } from "./Button";

export type ILoginHero = {
  loginURI: string,
};

const LoginHero = ({ loginURI }: ILoginHero) => (
  <div className="d-flex flex-justify-center">
    <div className="p-2 mx-auto">
      {/* <a href={loginURI}>Start here</a> */}
      <LinkButton primary={true} href={loginURI}>
        Sign in with Github
      </LinkButton>
    </div>
  </div>
);

export default LoginHero;
