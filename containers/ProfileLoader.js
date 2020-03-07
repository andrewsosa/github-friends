// @flow
import * as React from "react";
import * as Fathom from "fathom-client";
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
    Fathom.trackGoal("ORRJAV2A", 0);
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
