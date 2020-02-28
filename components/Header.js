// @flow
import * as React from "react";

interface IHeader {
  showLink: ?boolean;
}

const Header = ({ showLink }: IHeader) => (
  <>
    <h1 className="f00-light mb-2">stargazer</h1>
    <pre>
      Find your friends on github
      {showLink && (
        <>
          {"  |  "}
          <a href="https://github.com/andrewsosa/stargazer">
            star this app on github
          </a>
        </>
      )}
    </pre>
  </>
);

export default Header;
