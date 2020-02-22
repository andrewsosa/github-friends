// @flow

import * as http from "http";
import axios from "axios";
import { tokenURI } from "../../hooks/oauth";

export default async (req, res) => {
  const { code, state } = req.body;

  try {
    const { data } = await axios.post(
      tokenURI,
      {
        client_id: process.env.GH_CLIENT_ID,
        client_secret: process.env.GH_CLIENT_SECRET,
        redirect_uri: process.env.LOCALHOST || null,
        code,
        state,
      },
      {
        headers: { Accept: "application/json" },
      }
    );
    // GH always returns 200, make sure we err if resp had
    // error field set.
    res.status(data.error ? 400 : 200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
