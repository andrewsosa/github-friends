// @flow
import * as React from "react";
import moment from "moment";
import { useGithub } from "../hooks/github";

type RateLimitType = {
  limit: ?number,
  remaining: ?number,
  reset: ?number,
};

export default function RateLimit() {
  const { getRateLimit } = useGithub();
  const [ratelimit, setRateLimit] = React.useState<RateLimitType>({});

  React.useEffect(() => {
    getRateLimit()
      .then(({ data }) => setRateLimit(data.resources.core))
      .catch(console.error);
  }, []);

  return (
    <div
      className="p-3 bg-gray-dark text-white text-shadow-dark"
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        zIndex: "100",
      }}
    >
      <pre className="d-flex flex-row flex-justify-between">
        <span className="text-bold">API Usage: </span>
        <span>
          {ratelimit.limit - ratelimit.remaining}/{ratelimit.limit}
        </span>
      </pre>
      <pre className="d-flex flex-row flex-justify-between">
        <span className="text-bold">Reset: </span>
        <span>{moment.unix(ratelimit.reset).fromNow()}</span>
      </pre>
    </div>
  );
}
