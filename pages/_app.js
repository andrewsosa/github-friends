import React from "react";
import { CookiesProvider, Cookies } from "react-cookie";
import { TokenProvider } from "../hooks/oauth";
import { OctokitProvider } from "../hooks/github";
import { usePanelbear } from "../hooks/panelbear";

import "@primer/css/index.scss";
import "../styles/overrides.css";
import "../styles/vars.css";

const isBrowser = () => typeof window !== "undefined";
const getCookies = ctx => {
  if (ctx && ctx.req && ctx.req.headers.cookie) {
    return new Cookies(ctx.req.headers.cookie);
  }

  return new Cookies();
};

const Tracking = props => {
  usePanelbear("1oESo1GZfmT", {
    // Uncomment to allow sending events on localhost, and log to console too.
    // debug: true
  });

  return <React.Fragment {...props} />;
};

// This default export is required in a new `pages/_app.js` file.
export default function GF({ Component, pageProps, cookies }) {
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

GF.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  const cookies = getCookies(ctx);

  return { pageProps, cookies };
};
