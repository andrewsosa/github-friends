// @flow
import * as React from "react";
import Page from "./Page";
import Header from "./Header";
import FriendFinder from "../containers/FriendFinder";

const Friends = () => (
  <Page className="sans-serif p-responsive" title="GitHub Friends">
    <div className="px-4">
      <Header showLink />
      <hr />
    </div>
    <FriendFinder />
  </Page>
);

export default Friends;
