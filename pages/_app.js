import React from "react";
import Router from "next/router";
import * as Fathom from "fathom-client";
import { CookiesProvider, Cookies } from "react-cookie";
import { TokenProvider } from "../hooks/oauth";
import { OctokitProvider } from "../hooks/github";

import "@primer/css/index.scss";

Router.events.on("routeChangeComplete", () => {
  Fathom.trackPageview();
});

const isBrowser = () => typeof window !== "undefined";
const getCookies = ctx => {
  if (ctx && ctx.req && ctx.req.headers.cookie) {
    return new Cookies(ctx.req.headers.cookie);
  }

  return new Cookies();
};

const Tracking = props => {
  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      Fathom.load();
      Fathom.setSiteId("SLPFEROK");
      Fathom.trackPageview();
    }
  }, []);

  return <React.Fragment {...props} />;
};

// This default export is required in a new `pages/_app.js` file.
export default function Stargazer({ Component, pageProps, cookies }) {
  return (
    <Tracking>
      <CookiesProvider cookies={isBrowser() ? undefined : cookies}>
        <TokenProvider>
          <OctokitProvider>
            <Component {...pageProps} />
          </OctokitProvider>
        </TokenProvider>
      </CookiesProvider>
    </Tracking>
  );
}

Stargazer.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  const cookies = getCookies(ctx);

  return { pageProps, cookies };
};
