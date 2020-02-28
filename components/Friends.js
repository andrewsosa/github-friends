// @flow
import * as React from "react";
import Page from "./Page";
import Header from "./Header";
import FriendFinder from "../containers/FriendFinder";

const Friends = () => (
  <Page className="sans-serif p-6">
    <div className="px-4">
      <Header />
      <hr />
    </div>
    <FriendFinder />
  </Page>
);

export default Friends;
