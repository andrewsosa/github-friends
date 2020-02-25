// @flow
import * as React from "react";
import styles from "./profilegrid.module.css";

type IProfileGrid = {
  children: React.Node,
};

const ProfileGrid = ({ children }: IProfileGrid) => (
  <div className={styles.grid}>{children}</div>
);

export default ProfileGrid;
