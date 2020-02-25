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
    <Page className="sans-serif p-6">
      <pre className="p-4 m-4 bg-gray-dark text-white text-shadow-dark text-center">
        <p className="h1">stargazer</p>
        <p className="h5">find your friends on github</p>
      </pre>
      {isAuthed ? <FriendFinder /> : <LoginHero loginURI={loginURI} />}
    </Page>
  );
}

Index.getInitialProps = () => {
  const ghstate = uuid();
  const loginURI = createAuthorizeURI(ghstate);
  return { loginURI };
};
