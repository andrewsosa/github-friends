// @flow
import * as React from "react";
import InfiniteScroller from "react-infinite-scroller";

import { useSessionStorage } from "../hooks/storage";
import { useFriends, type User as Friend } from "../hooks/friends";
import RateLimit from "./RateLimit";
import ProfileLoader from "./ProfileLoader";
import ProfileGrid from "../components/ProfileGrid";

const FRIENDS_PER_PAGE = 25;

type Friends = Friend[];

export default function FriendFinder() {
  const { buildFriendGraph } = useFriends();
  const [friends, setFriends] = useSessionStorage<Friends>(
    "stargazer::friends"
  );
  const [display, setDisplay] = React.useState([]);

  // Load friends once on first load
  React.useEffect(() => {
    buildFriendGraph().then(list => setFriends(list));
  }, []);

  // When prompted by InfiniteScroller, copy more friends from
  // the `friends` array into the items.
  const loadMore = React.useCallback(
    (pageNo: number) => {
      setDisplay(friends.slice(0, FRIENDS_PER_PAGE * pageNo));
    },
    [friends, setDisplay]
  );

  const hasMore = !!friends && friends.length !== display.length;

  return (
    <>
      <RateLimit />
      <InfiniteScroller pageStart={0} loadMore={loadMore} hasMore={hasMore}>
        <ProfileGrid>
          {display &&
            display.map(({ username, source }) => (
              <ProfileLoader
                key={username}
                username={username}
                source={source}
              />
            ))}
        </ProfileGrid>
      </InfiniteScroller>
    </>
  );
}
