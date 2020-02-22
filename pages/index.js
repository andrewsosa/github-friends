// @flow
import * as React from "react";
import Page from "../components/Page";

import { useOAuth } from "../hooks/oauth";

export default function Index() {
  const { authorizeURI } = useOAuth();

  return (
    <Page className="sans-serif pa4">
      <h1>Stargazer</h1>
      <a href={authorizeURI}>Click me</a>
    </Page>
  );
}

Index.getInitialProps = () => {
  console.log("hello props");
};
