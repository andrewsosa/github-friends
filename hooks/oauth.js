// @flow
import * as React from "react";
import QS from "querystring";
import { useCookies } from "react-cookie";

const GH_TOKEN = "ghaccesstoken";
const GH_SCOPE = "ghscope";
const GH_TYPE = "ghtokentype";
const GH_COOKIE_OPTS = { path: "/", maxAge: 60 * 60 * 24 };

export const authorizeURI = "https://github.com/login/oauth/authorize";
export const tokenURI = "https://github.com/login/oauth/access_token";

export const createAuthorizeURI = (state: string) =>
  `${authorizeURI}?${QS.stringify({
    client_id: process.env.GH_CLIENT_ID,
    scope: "user:email",
    redirect_uri: process.env.LOCALHOST || "",
    state,
  })}`;

type ITokenContext = ?{
  access_token: string,
  scope: string,
  token_type: string,
};

export const TokenContext = React.createContext<ITokenContext>(null);
export const TokenProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies([GH_TOKEN, GH_SCOPE, GH_TYPE]);

  const token: ITokenContext = {
    access_token: cookies[GH_TOKEN],
    scope: cookies[GH_SCOPE],
    token_type: cookies[GH_TYPE],
  };

  const setToken = React.useCallback(
    // eslint-disable-next-line camelcase
    ({ access_token, scope, token_type }: ITokenContext) => {
      setCookie(GH_TOKEN, access_token, GH_COOKIE_OPTS);
      setCookie(GH_SCOPE, scope, GH_COOKIE_OPTS);
      setCookie(GH_TYPE, token_type, GH_COOKIE_OPTS);
    },
    [setCookie]
  );

  return (
    <TokenContext.Provider value={[token, setToken]}>
      {children}
    </TokenContext.Provider>
  );
};

export const useOAuth = () => {
  const [token, setAccessToken] = React.useContext(TokenContext);
  const isAuthed = React.useMemo(() => !!token.access_token, [token]);
  console.debug("token", token);
  return { token, setAccessToken, isAuthed };
};
