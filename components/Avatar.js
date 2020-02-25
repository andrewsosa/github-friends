// @flow
import * as React from "react";

export type IAvatar = {
  avatarUrl: string,
  username: string,
  subavatarUrl: string,
  subavatarName: string,
};

const Avatar = ({
  avatarUrl,
  username,
  subavatarUrl,
  subavatarName,
}: IAvatar) => (
  <div className="avatar-parent-child d-inline-flex mr-2">
    <img
      className="border avatar"
      alt={username}
      title={username}
      src={avatarUrl}
      loading="lazy"
      height="auto"
      width="100%"
      style={{
        height: "auto",
        width: "100%",
        objectFit: "contain",
      }}
    />
    {subavatarUrl && (
      <img
        className="border avatar avatar-child"
        alt={subavatarName}
        title={subavatarName}
        src={subavatarUrl}
        loading="lazy"
        height="auto"
        width="48px"
        style={{ objectFit: "contain" }}
      />
    )}
  </div>
);

export default Avatar;
