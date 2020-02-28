// @flow
import * as React from "react";
import uuid from "uuid/v4";
import Page from "../components/Page";
import LandingPage from "../components/LandingPage";
import Friends from "../components/Friends";

import { useOAuth, createAuthorizeURI } from "../hooks/oauth";

export default function Index({ loginURI }) {
  const { isAuthed } = useOAuth();

  return isAuthed ? <Friends /> : <LandingPage loginURI={loginURI} />;
}

Index.getInitialProps = () => {
  const ghstate = uuid();
  const loginURI = createAuthorizeURI(ghstate);
  return { loginURI };
};
