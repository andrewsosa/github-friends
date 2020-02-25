// @flow
import * as React from "react";
import { type Profile } from "../../hooks/friends";
import Button from "../Button";
import Avatar from "./Avatar";

export type IPersonLayout = {
  ...Profile,
  source: Profile,
  btnCallback: () => any,
  isFollowing: boolean,
};

const PersonLayout = ({
  username,
  avatar,
  url,
  fullname,
  bio,
  source,
  btnCallback,
  isFollowing,
}: IPersonLayout) => (
  <div className="d-flex flex-column p-4">
    <Avatar
      username={username}
      avatarUrl={avatar}
      link={url}
      subavatarUrl={source.avatar}
    />
    <div className="py-3">
      <h3 className="f2">{fullname}</h3>
      <h4 className="f3-light text-gray">{username}</h4>
    </div>
    <p className="mb-3">{bio}</p>
    <Button
      block
      onClick={btnCallback}
      disabled={isFollowing}
      style={{ marginTop: "auto" }}
    >
      {isFollowing ? `Following ${username}` : `Follow ${username}`}
    </Button>
  </div>
);

export default PersonLayout;
