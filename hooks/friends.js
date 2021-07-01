// @flow
import * as React from "react";
import axios from "axios";
import { Octokit } from "@octokit/rest";
import { useOctokit } from "./github";

function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}

function marshall<T>(arr: T[], attr: string): Map<string, T> {
  return arr.reduce((acc: Map<string, T>, val: T) => {
    acc.set(val[attr], val);
    return acc;
  }, new Map());
}

function frequency<T>(arr: T[]): Map<T, number> {
  return arr.reduce((acc: Map, val: T) => {
    if (!acc.has(val)) acc.set(val, 1);
    else {
      acc.set(val, acc.get(val) + 1);
    }
    return acc;
  }, new Map());
}

export type User = {
  avatar: string,
  url: string,
  username: string,
  source: string,
};

export const getFollowers = async (kit: Octokit, username: string): User[] => {
  const { data: followers } = await kit.users.listFollowersForUser({
    username,
  });

  return followers.map(follower => ({
    // avatar: follower.avatar_url,
    // url: follower.html_url,
    username: follower.login,
    source: username,
  }));
};

export const getFollowing = async (kit: Octokit, username: string): User[] => {
  const { data: following } = await kit.users.listFollowingForUser({
    username,
  });

  return following.map(user => ({
    // avatar: user.avatar_url,
    // url: user.html_url,
    username: user.login,
    source: username,
  }));
};

export const buildFriendGraph = async (kit: Octokit) => {
  const [{ data: following }, { data: followers }] = await Promise.all([
    kit.users.listFollowingForAuthenticatedUser(),
    kit.users.listFollowersForAuthenticatedUser(),
  ]);

  const extendedFollowing: User[] = flatten(
    await Promise.all(following.map(user => getFollowing(kit, user.login)))
  );

  const extendedFollowers: User[] = flatten(
    await Promise.all(followers.map(user => getFollowers(kit, user.login)))
  );

  const alsoFollowers: User[] = flatten(
    await Promise.all(following.map(user => getFollowers(kit, user.login)))
  );

  const alsoFollowing: User[] = flatten(
    await Promise.all(followers.map(user => getFollowing(kit, user.login)))
  );

  let allUsers = [
    ...extendedFollowers,
    ...extendedFollowing,
    ...alsoFollowers,
    ...alsoFollowing,
  ];

  // Remove already followed from suggestions (also self)
  const followingSet = new Set(following.map(user => user.login));
  const {
    data: { login: authedUsername },
  } = await kit.users.getAuthenticated();
  followingSet.add(authedUsername);
  allUsers = allUsers.filter(({ username }) => !followingSet.has(username));

  // const followedMap = marshall(flatFollowedList, "username");
  const countedNames = frequency(
    Array.from(allUsers.map(user => user.username))
  );

  // Descending sort of the popularity of your friends
  const sortedCountedNames = new Map(
    Array.from(countedNames).sort((a, b) => b[1] - a[1])
  );

  // Map to apply to the sorted names to get user objects in sorted order
  const userLookup = marshall(allUsers, "username");

  return Array.from(sortedCountedNames).map(([username, popularity]) => ({
    ...userLookup.get(username),
    popularity,
  }));
};

export const useFriends = () => {
  const { octokit } = useOctokit();
  const friends = {};

  friends.buildFriendGraph = React.useCallback(() => {
    if (process.env.GF_SAMPLE_DATA) {
      return axios.get(process.env.GF_SAMPLE_DATA).then(resp => resp.data);
    }
    return buildFriendGraph(octokit);
  }, [octokit]);

  return friends;
};
