import * as React from "react";
import { useGithub } from "../hooks/github";

export default function RateLimit() {
  const { getRateLimit } = useGithub();
  const [ratelimit, setRateLimit] = React.useState(null);

  React.useEffect(() => {
    getRateLimit().then(({ data }) => setRateLimit(data));
  }, []);

  return (
    <>
      {ratelimit && (
        <>
          <p>Rate Limit: </p>
          <pre>{JSON.stringify(ratelimit.resources.core, null, 2)}</pre>
          <p>
            Reset: {new Date(ratelimit.resources.core.reset * 1000).toString()}
          </p>
        </>
      )}
    </>
  );
}
