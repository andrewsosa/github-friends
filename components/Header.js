// @flow
import * as React from "react";

interface IHeader {
  showLink: ?boolean;
}

const Header = ({ showLink }: IHeader) => (
  <>
    <h1 className="f0-light mb-2">github friends</h1>
    <pre>
      Find your friends on github
      {showLink && (
        <>
          {"  |  "}
          <a href="https://github.com/andrewsosa/github-friends">
            star this app on github
          </a>
        </>
      )}
    </pre>
  </>
);

export default Header;
