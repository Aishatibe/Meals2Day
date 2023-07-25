import React, { Fragment } from "react";
import classes from "./Header.module.css";
import mealsImage from "../../assets/logo.jpeg";
import HeaderCartButton from "./HeaderCartButton";
export default function Header() {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Meals2Day</h1>
        <HeaderCartButton />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="find the best meal today" />
      </div>
    </Fragment>
  );
}
