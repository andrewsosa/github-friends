// @flow
import * as React from "react";
import { useGithub } from "./github";
import { useSessionStorage } from "./storage";

export type Profile = {
  avatar: string,
  fullname: string,
  username: string,
  bio: string,
  url: string,
};

export const parseProfile = (data: any): Profile => ({
  avatar: data.avatar_url,
  url: data.html_url,
  username: data.login,
  fullname: data.name,
  bio: data.bio,
});

export const useProfile = (login: string) => {
  const { getUserProfile } = useGithub();
  const [profile, setProfile] = useSessionStorage(
    `stargazer::profile::${login}`
  );

  React.useEffect(() => {
    // If the profile is in the storage, skip getting the data
    if (!profile) {
      getUserProfile(login)
        .then(({ data }) => parseProfile(data))
        .then(data => setProfile(data));
    }
  }, [login, getUserProfile, setProfile]);

  return profile;
};
