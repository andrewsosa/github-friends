// @flow
import * as React from "react";
import Router, { useRouter } from "next/router";
import axios from "axios";

import Page from "../components/Page";
import { useOAuth } from "../hooks/oauth";

export default function AuthorizePage() {
  const { token, setAccessToken } = useOAuth();
  const {
    query: { code, state },
  } = useRouter();

  React.useEffect(() => {
    if (code && state && !token.access_token) {
      axios
        .post("/api/authorize", { code, state })
        .then(({ data }) => setAccessToken(data));
    }
  }, [code, state]);

  React.useEffect(() => {
    if (token.access_token) Router.replace("/");
  });

  return (
    <Page className="sans-serif pa4">
      <h1>Authorize Page</h1>
      <p>Code: {code}</p>
      <p>State: {state}</p>
      <p>Token: </p>
      <pre>{JSON.stringify(token, null, 2)}</pre>
    </Page>
  );
}
