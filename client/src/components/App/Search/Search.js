import React from "react";

import classes from "./Search.css";

const Search = ({ onChange, onKeyDown, value, path, close }) => {
  return (
    <>
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
    </>
  );
};

export default Search;
