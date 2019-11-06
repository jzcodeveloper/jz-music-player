import React from "react";

import classes from "./Footer.css";

const Footer = () => (
  <footer className={classes.Footer}>
    <div className={classes.SocialIcons}>
      <a className={classes.SocialLink} href="https://www.facebook.com">
        <i className="fab fa-facebook"></i>
      </a>
      <a className={classes.SocialLink} href="https://twitter.com">
        <i className="fab fa-twitter"></i>
      </a>
      <a className={classes.SocialLink} href="https://www.instagram.com">
        <i className="fab fa-instagram"></i>
      </a>
      <a className={classes.SocialLink} href="https://www.linkedin.com">
        <i className="fab fa-linkedin"></i>
      </a>
    </div>
    <div className={classes.Copyright}>
      Copyright &copy; {new Date().getFullYear()} JZ Music Player
    </div>
  </footer>
);

export default Footer;
