// @flow
import * as React from "react";
import { useGithub } from "../hooks/github";
import Profile from "../components/person";
import { type Profile as ProfileType } from "../hooks/friends";
import { useProfile } from "../hooks/profile";

type State = ?{
  userData: ProfileType,
  sourceData: ProfileType,
};
type IProfileLoader = {
  username: string,
  source: string,
};

const ProfileLoader = ({ username, source }: IProfileLoader) => {
  // const [data, setData] = React.useState<State>(null);
  // const { getUserProfile, parseProfile } = useGithub();

  // Promise.all([getUserProfile(username), getUserProfile(source)]).then(
  //   ([{ data: userData }, { data: sourceData }]) => {
  //     setData({
  //       userData: parseProfile(userData),
  //       sourceData: parseProfile(sourceData),
  //     });
  //   }
  // );
  // React.useEffect(() => {}, [username, getUserProfile, setData]);

  const userData = useProfile(username);
  const sourceData = useProfile(source);

  return (
    <>
      {userData && sourceData && <Profile {...userData} source={sourceData} />}
    </>
  );
};

export default ProfileLoader;
