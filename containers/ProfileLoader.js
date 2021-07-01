// @flow
import * as React from "react";
import useFollow from "../hooks/follow";
import Profile from "../components/Profile";
import { useProfile } from "../hooks/profile";

type IProfileLoader = {
  username: string,
  source: string,
  alreadyFollowing: boolean,
};

const ProfileLoader = ({ username, source }: IProfileLoader) => {
  const [following, follow] = useFollow();

  const userData = useProfile(username);
  const sourceData = useProfile(source);

  // This is what powers the follow button
  const followCallback = React.useCallback(() => {
    follow(username);
  }, [follow, username]);

  return (
    <>
      {userData && sourceData && (
        <Profile
          {...userData}
          source={sourceData}
          btnCallback={followCallback}
          isFollowing={following.has(username)}
        />
      )}
    </>
  );
};

export default ProfileLoader;
