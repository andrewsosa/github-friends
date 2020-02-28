// @flow
import React, { type Node } from "react";
import Head from "next/head";
import StarBanner from "./StarBanner";

type Props = {
  children: Node,
  title?: string,
};

export default function Page({
  children,
  title = "This is the default title",
  ...rest
}: Props) {
  return (
    <>
      <section {...rest}>
        <Head>
          <title>{title}</title>
        </Head>
        {children}
      </section>
      {/* <StarBanner /> */}
    </>
  );
}
