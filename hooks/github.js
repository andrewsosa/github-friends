// @flow
import * as React from "react";
import { Octokit } from "@octokit/rest";
import { useOAuth } from "./oauth";
import { buildFriendGraph } from "./friends";

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
  const octokit = React.useContext(OctokitContext);
  const github = {};

  github.buildFriendGraph = React.useCallback(() => buildFriendGraph(octokit), [
    octokit,
  ]);

  github.getAuthedUser = React.useCallback(
    () => octokit.users.getAuthenticated(),
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
