// @flow
import React, { type Node } from "react";
import Head from "next/head";

type Props = {
  children: Node,
  title?: string,
};

export default function Page({
  children,
  title = "GitHub Friends",
  ...rest
}: Props) {
  return (
    <>
      <section {...rest}>
        <Head>
          <title>{title}</title>
          <meta property="og:title" content="GitHub Friends" />
          <meta
            property="og:description"
            content="find your friends on github"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://github-friends.vercel.app.now.sh"
          />
          <meta
            property="og:image"
            content="https://github-friends.vercel.app/github_famous_preview.png"
          />
        </Head>
        {children}
      </section>
    </>
  );
}
