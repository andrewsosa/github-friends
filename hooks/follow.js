// @flow
import * as React from "react";
import { FollowContext } from "../containers/FollowContext";

const useFollow = () => {
  return React.useContext(FollowContext);
};

export default useFollow;
