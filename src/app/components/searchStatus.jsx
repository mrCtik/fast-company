import React from "react";
import declOfNum from "./utils/utils";

const Header = ({ number }) => {
  const classes = `badge m-1 ${number === 0 ? "bg-danger" : "bg-primary"}`;

  const text =
    number === 0
      ? "Никто с тобой не тусанет"
      : `${number} ${declOfNum(number, [
          "человек тусанет",
          "человека тусанут",
          "человек тусанет",
        ])} с тобой сегодня`;
  return (
    <h2>
      <span className={classes}>{text}</span>
    </h2>
  );
};

export default Header;
