// @flow
import * as React from "react";

export type ILoginHero = {
  loginURI: string,
};

export default function LoginHero({ loginURI }: ILoginHero) {
  return <a href={loginURI}>Start here</a>;
}
