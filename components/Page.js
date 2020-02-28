// @flow
import React, { type Node } from "react";
import Head from "next/head";

type Props = {
  children: Node,
  title?: string,
};

export default function Page({
  children,
  title = "Stargazer",
  ...rest
}: Props) {
  return (
    <>
      <section {...rest}>
        <Head>
          <title>{title}</title>
          <meta property="og:title" content="Stargazer" />
          <meta
            property="og:description"
            content="find your friends on github"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://stargazer.now.sh" />
          <meta
            property="og:image"
            content="https://stargazer.now.sh/preview.png"
          />
        </Head>
        {children}
      </section>
    </>
  );
}
