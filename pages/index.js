// @flow
import * as React from "react";
import uuid from "uuid/v4";
import Page from "../components/Page";
import LoginHero from "../components/LoginHero";
import FriendFinder from "../containers/FriendFinder";

import { useOAuth, createAuthorizeURI } from "../hooks/oauth";

export default function Index({ loginURI }) {
  const { isAuthed } = useOAuth();

  return (
    <Page className="sans-serif pa4">
      <h1>Stargazer</h1>
      {isAuthed ? <FriendFinder /> : <LoginHero loginURI={loginURI} />}
    </Page>
  );
}

Index.getInitialProps = () => {
  const ghstate = uuid();
  const loginURI = createAuthorizeURI(ghstate);
  return { loginURI };
};
