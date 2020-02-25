import App from "next/app";
import React from "react";
import { CookiesProvider, Cookies } from "react-cookie";
import { TokenProvider } from "../hooks/oauth";
import { OctokitProvider } from "../hooks/github";

// import "tachyons/css/tachyons.min.css";
import "@primer/css/index.scss";

const isBrowser = () => typeof window !== "undefined";

const getCookies = ctx => {
  if (ctx && ctx.req && ctx.req.headers.cookie) {
    return new Cookies(ctx.req.headers.cookie);
  }

  return new Cookies();
};

// This default export is required in a new `pages/_app.js` file.
export default function Stargazer({ Component, pageProps, cookies }) {
  return (
    <CookiesProvider cookies={isBrowser() ? undefined : cookies}>
      <TokenProvider>
        <OctokitProvider>
          <Component {...pageProps} />
        </OctokitProvider>
      </TokenProvider>
    </CookiesProvider>
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
