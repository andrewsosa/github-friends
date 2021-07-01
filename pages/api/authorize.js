// @flow

import axios from "axios";
import { withSentry } from "@sentry/nextjs";
import { tokenURI } from "../../hooks/oauth";

const handler = async (req, res) => {
  const { code, state } = req.body;
  const { error, error_description } = req.params;

  if (error) {
    throw new Error(error_description);
  }

  const { data } = await axios.post(
    tokenURI,
    {
      client_id: process.env.GH_CLIENT_ID,
      client_secret: process.env.GH_CLIENT_SECRET,
      redirect_uri: process.env.GH_REDIRECT_URI,
      code,
      state,
    },
    {
      headers: { Accept: "application/json" },
    }
  );
  // GH always returns 200, make sure we err if resp had
  // error field set.
  if (data.error) {
    throw new Error(data.error);
  }
  res.status(200).json(data);
};

export default withSentry(handler);
