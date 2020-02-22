require("dotenv").config();

module.exports = {
  experimental: { scss: true },
  env: {
    GH_CLIENT_ID: process.env.GH_CLIENT_ID,
    GH_CLIENT_SECRET: process.env.GH_CLIENT_SECRET,
    LOCALHOST: process.env.LOCALHOST
  }
};
