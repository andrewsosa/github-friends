// @flow
import * as React from "react";
import Page from "./Page";
import { LinkButton } from "./Button";
import Header from "./Header";

import { split, preview } from "./LandingPage.module.css";

export type Props = {
  loginURI: string,
};

const LoginHero = ({ loginURI }: Props) => (
  <Page
    title="GitHub Friends"
    className="px-0 p-md-6"
    style={{ height: "100vh" }}
  >
    <div className={split}>
      <div className="d-flex flex-column flex-items-center text-center height-full py-md-10">
        <div
          className="d-flex flex-column flex-justify-center px-6 py-8 bg-white"
          style={{ maxWidth: "22rem" }}
        >
          <Header />
          <LinkButton block primary={true} href={loginURI} className="my-5">
            Sign in with GitHub
          </LinkButton>
          <p style={{ textAlign: "justify" }}>
            <b>
              <a href="https://github.com/andrewsosa/github-friends">
                GitHub Friends
              </a>
            </b>{" "}
            helps you find people you know on GitHub by graphing{" "}
            <b>your followers</b> and the <b>people you follow</b>. GitHub
            Friends works best if you already have a few connections on GitHub.
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
            src="./github_famous_preview.png"
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
            <a href="https://github.com/andrewsosa/github-friends/issues/new?assignees=andrewsosa&labels=&template=takedown-request.md&title=Remove+me+from+your+preview">
              {"I'm in the preview and I don't want to be."}
            </a>
          </div>
        </div>
      </div>
    </div>
  </Page>
);

export default LoginHero;
