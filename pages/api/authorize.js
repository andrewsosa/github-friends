// @flow

import * as http from "http";
import axios from "axios";
import { tokenURI } from "../../hooks/oauth";

export default async (req, res) => {
  const { code, state } = req.body;

  console.log("code", code);
  console.log("state", state);

  try {
    const resp = await axios.post(
      tokenURI,
      {
        client_id: process.env.GH_CLIENT_ID,
        client_secret: process.env.GH_CLIENT_SECRET,
        redirect_uri: process.env.LOCALHOST || null,
        code,
        state
      },
      {
        headers: { Accept: "application/json" }
      }
    );
    res.status(200).json(resp.data);
  } catch (err) {
    res.status(400).json(err);
  }

  // res.statusCode = resp.status;
  // res.setHeader("Content-Type", resp.headers.contenttype);
  // res.end(JSON.stringify(resp.data));
};
