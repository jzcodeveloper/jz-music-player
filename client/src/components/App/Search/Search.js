import React, { Fragment } from "react";

import classes from "./Search.css";

const Search = ({ onChange, onKeyDown, value, path, close }) => {
  return (
    <Fragment>
      <section className={classes.Search}>
        <i
          className={`fas fa-arrow-circle-left ${classes.Icon}`}
          onClick={close}
        />
        <input
          type="search"
          placeholder={`Search ${path}...`}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value || ""}
          autoFocus
        />
      </section>
    </Fragment>
  );
};

export default Search;
