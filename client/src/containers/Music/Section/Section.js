import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import GridElement from "../../../components/App/GridElement/GridElement";

const Section = ({
  sectionTitle,
  info,
  pathname,
  history,
  showPlaylists,
  link,
  linkCaption,
  buttonIndex,
  scrollLeft,
  scrollRight
}) => {
  return (
    <Fragment>
      <span>{sectionTitle}</span>
      <div>
        {info.map(info => (
          <GridElement
            key={info._id}
            info={info}
            pathname={pathname}
            history={history}
            showPlaylists={showPlaylists}
          />
        ))}
        <div>
          <Link to={link}>{linkCaption}</Link>
        </div>

        <button onClick={() => scrollLeft(buttonIndex)}>
          <p>{"<"}</p>
        </button>
        <button onClick={() => scrollRight(buttonIndex)}>
          <p>{">"}</p>
        </button>
      </div>
    </Fragment>
  );
};

Section.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  info: PropTypes.array.isRequired,
  pathname: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  showPlaylists: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
  linkCaption: PropTypes.string.isRequired,
  buttonIndex: PropTypes.number.isRequired,
  scrollLeft: PropTypes.func.isRequired,
  scrollRight: PropTypes.func.isRequired
};

export default Section;
