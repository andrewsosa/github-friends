// @flow
import * as React from "react";
import { Octokit } from "@octokit/rest";
import { useOAuth } from "./oauth";

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

export const OctokitContext = React.createContext<Octokit>(new Octokit());

export const OctokitProvider = ({ children }) => {
  const {
    token: { access_token: accessToken },
  } = useOAuth();

  const octokit = React.useMemo(() => new Octokit({ auth: accessToken }), [
    accessToken,
  ]);

  return (
    <OctokitContext.Provider value={octokit}>
      {children}
    </OctokitContext.Provider>
  );
};

export const useOctokit = () => {
  const octokit = React.useContext(OctokitContext);
  return { octokit };
};

export const useGithub = () => {
  const { octokit } = useOctokit();
  const github = { parseProfile };

  github.getAuthedUser = React.useCallback(
    () => octokit.users.getAuthenticated(),
    [octokit]
  );

  github.getUserProfile = React.useCallback(
    (username: string) => octokit.users.getByUsername({ username }),
    [octokit]
  );

  github.followUser = React.useCallback(
    (username: string) => octokit.users.follow({ username }),
    [octokit]
  );

  github.getRateLimit = React.useCallback(() => octokit.rateLimit.get(), [
    octokit,
  ]);

  return github;
};
