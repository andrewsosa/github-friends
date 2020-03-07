// @flow
import * as React from "react";
import Page from "./Page";
import { LinkButton } from "./Button";
import Header from "./Header";

import TakedownLink from "./TakedownLink";
import { split, preview } from "./LandingPage.module.css";
// import preview from "../public/stargazer_censored.png";

export type Props = {
  loginURI: string,
};

const LoginHero = ({ loginURI }: Props) => (
  <Page title="Stargazer" className="px-0 p-md-6" style={{ height: "100vh" }}>
    <div className={split}>
      <div className="d-flex flex-column flex-items-center text-center height-full py-md-10">
        <div
          className="d-flex flex-column flex-justify-center px-6 py-8 bg-white"
          style={{ maxWidth: "22rem" }}
        >
          <Header />
          <LinkButton block primary={true} href={loginURI} className="my-5">
            Sign in with Github
          </LinkButton>
          <p style={{ textAlign: "justify" }}>
            <b>
              <a href="https://github.com/andrewsosa/stargazer">Stargazer</a>
            </b>{" "}
            helps you find people you know on Github by graphing{" "}
            <b>your followers</b> and the <b>people you follow</b>. Stargazer
            works best if you already have a few connections on Github.
          </p>
          <pre className="mt-8">
            Made with {"<3"} by{" "}
            <a href="https://andrewsosa.dev">andrewsosa.dev</a>
          </pre>
        </div>
      </div>
      {/* split */}
      <div className={`${preview} px-6`}>
        <div className="d-flex flex-column flex-justify-center height-full text-center">
          <img
            src="./preview_frame_censored.png"
            loading="lazy"
            height="auto"
            width="100%"
            style={{
              height: "auto",
              width: "100%",
              objectFit: "contain",
            }}
          />
          <div className="p-3">
            <a href="https://github.com/andrewsosa/stargazer/issues/new?assignees=andrewsosa&labels=&template=takedown-request.md&title=Remove+me+from+your+preview">
              {"I'm in the preview and I don't want to be."}
            </a>
          </div>
        </div>
      </div>
    </div>
  </Page>
);

export default LoginHero;
