// @flow
import * as React from "react";
import axios from "axios";
import QS from "querystring";
import uuid from "uuid/v4";
import { useCookies } from "react-cookie";

const GHSTATE = "ghstate";
const GHSTATEOPTS = { path: "/", maxAge: 60 * 10 };
const GHACCESSTOKEN = "ghaccesstoken";
const GHACCESSTOKENOPTS = { path: "/" };

export const authorizeURI = "https://github.com/login/oauth/authorize";
export const tokenURI = "https://github.com/login/oauth/access_token";

export const createAuthorizeURI = (state: string) =>
  `${authorizeURI}?${QS.stringify({
    client_id: process.env.GH_CLIENT_ID,
    scope: "user:email",
    redirect_uri: process.env.LOCALHOST || "",
    state: state
  })}`;

export const useOAuth = () => {
  const [{ ghstate }, setCookie] = useCookies([GHSTATE, GHACCESSTOKEN]);
  console.debug("OAuth State: ", ghstate);

  React.useEffect(() => {
    if (!ghstate) {
      console.debug("ghstate unset");
      setCookie(GHSTATE, uuid(), GHSTATEOPTS);
    }
  }, [ghstate, setCookie]);

  const setAccessToken = React.useCallback(
    (token: string) => setCookie(GHACCESSTOKEN, token, GHACCESSTOKENOPTS),
    [setCookie]
  );

  return { authorizeURI: authorizeURI(ghstate), setAccessToken };
};
