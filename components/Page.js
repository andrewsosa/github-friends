// @flow
import React, { type Node } from "react";
import Head from "next/head";

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
    <section {...rest}>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </section>
  );
}
