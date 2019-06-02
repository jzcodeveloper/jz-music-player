import React from "react";
import classes from "./Footer.css";

const Footer = () => {
  return (
    <footer className={classes.Footer}>
      Copyright &copy; {new Date().getFullYear()} JZ Music Player
    </footer>
  );
};

export default Footer;
