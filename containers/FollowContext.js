// @flow
import * as React from "react";
import { useGithub } from "../hooks/github";

type IFollowContext = Set<string>;

export const FollowContext = React.createContext<IFollowContext>(new Set());

export const FollowProvider = ({ children }) => {
  const { followUser, getAlreadyFollowing } = useGithub();
  const [state, setState] = React.useState(new Set());

  // First load, initialize the context with who we're already following
  React.useEffect(() => {
    getAlreadyFollowing().then(following => {
      console.log("following", following);
      setState(new Set(following));
    });
  }, []);

  // Later, when we add people to follow, add them to this list.
  const follow = React.useCallback((login: string) =>
    followUser(login).then(() => setState(new Set([...state, login])))
  );

  return (
    <FollowContext.Provider value={[state, follow]}>
      {children}
    </FollowContext.Provider>
  );
};
