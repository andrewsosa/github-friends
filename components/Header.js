// @flow
import * as React from "react";

interface IHeader {
  showLink: ?boolean;
}

const Header = ({ showLink }: IHeader) => (
  <>
    <h1 className="f0 mb-2 mt-4">Github Friends</h1>
    <p className="text-mono">
      Find your friends on github
      {showLink && (
        <>
          {"  //  "}
          <a href="https://github.com/andrewsosa/github-friends">
            star this app on github
          </a>
        </>
      )}
    </p>
  </>
);

export default Header;
