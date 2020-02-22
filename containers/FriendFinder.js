import * as React from "react";
import { useGithub } from "../hooks/github";
import RateLimit from "./RateLimit";

export default function FriendFinder() {
  const { getAuthedUser, buildFriendGraph } = useGithub();
  const [friends, setFriends] = React.useState([]);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    getAuthedUser().then(({ data }) => setUser(data));
  }, []);

  React.useEffect(() => {
    buildFriendGraph().then(list => setFriends(list));
  }, []);

  return (
    <>
      <p>User: </p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <RateLimit />
      <p>Friends: </p>
      <pre>{JSON.stringify(friends, null, 2)}</pre>
    </>
  );
}
