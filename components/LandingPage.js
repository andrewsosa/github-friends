// @flow
import * as React from "react";
import Page from "./Page";
import { LinkButton } from "./Button";
import Header from "./Header";

export type Props = {
  loginURI: string,
};

const LoginHero = ({ loginURI }: Props) => (
  <Page title="Stargazer" style={{ height: "100vh" }}>
    <div className="d-flex flex-column flex-items-center height-full text-center py-10">
      <div className="d-flex flex-column flex-justify-center px-6 py-8 bg-white ">
        <Header />
        <LinkButton block primary={true} href={loginURI} className="my-5">
          Sign in with Github
        </LinkButton>
        <pre className="mt-8">
          Made with {"<3"} by{" "}
          <a href="https://andrewsosa.dev">andrewsosa.dev</a>
        </pre>
      </div>
    </div>
  </Page>
);

export default LoginHero;
