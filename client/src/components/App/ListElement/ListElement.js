import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateFavorites } from "../../../actions/favoriteActions";
import { removeFromPlaylist } from "../../../actions/playlistsActions";

import classes from "./ListElement.css";
import background from "../../../assets/background.jpg";
import { secondsToHms } from "../../../utils/utility";

import Confirmation from "../../UI/Confirmation/Confirmation";

const ListElement = ({
  updateFavorites,
  removeFromPlaylist,
  pathname,
  info: {
    _id,
    title,
    artist,
    album,
    albumArt,
    albumArtist,
    count,
    genre,
    duration
  },
  playlist,
  index
}) => {
  const [state, setState] = useState({ showConfirmation: false, action: "" });

  const { showConfirmation, action } = state;

  const closeConfirmation = () => {
    setState({ showConfirmation: false, action: "" });
  };

  const onFavoriteClick = () => {
    setState({ showConfirmation: true, action: "updateFavorites" });
  };

  const onRemoveClick = () => {
    setState({ showConfirmation: true, action: "removeFromPlaylist" });
  };

  const onUpdateFavorites = () => {
    closeListElement();
    setTimeout(() => updateFavorites(pathname, _id), 500);
  };

  const onRemoveFromPlaylist = () => {
    closeListElement();
    setTimeout(() => removeFromPlaylist(playlist._id, _id), 500);
  };

  const closeListElement = () => {
    const { OpenListElement, CloseListElement } = classes;
    const selector = `.${OpenListElement}:nth-of-type(${index + 1})`;
    const el = document.querySelector(selector);
    if (el) el.classList.replace(OpenListElement, CloseListElement);
  };

  //Default value for Play icon
  let link = `/player/${pathname}/${artist || album}`;
  //Default values for Favorite Icon
  let buttonClass = classes.Favorites;
  let buttonAction = onFavoriteClick;
  let buttonIcon = "fas fa-star";

  if (pathname === "songs") {
    link = `/player/${pathname}/${artist} - ${title}`;
    if (playlist) {
      //Values for Remove Icon
      buttonClass = classes.Remove;
      buttonAction = onRemoveClick;
      buttonIcon = "far fa-trash-alt";
    }
  }

  let confirmationTitle = "";
  let question = "Are you sure you want to remove ";

  if (action === "updateFavorites") {
    confirmationTitle = "Remove from favorites";
    question += `'${title || artist || album}' from your favorites?`;
  }
  if (action === "removeFromPlaylist") {
    confirmationTitle = "Remove from playlist";
    question += `the song '${title}' from this playlist?`;
  }

  return (
    <Fragment>
      <div className={`${classes.ListElement} ${classes.OpenListElement}`}>
        <img
          src={
            albumArt !== ""
              ? require(`../../../assets/albumArts/${albumArt.albumArt}`)
              : background
          }
          alt="Album Art"
        />

        <p>{title || artist || album}</p>
        <p>{pathname === "songs" ? artist : albumArtist}</p>
        <p>{count ? `Songs: ${count}` : `Genre: ${genre.join(" /")}`}</p>
        <p>Duration: {secondsToHms(duration)}</p>

        <Link className={classes.Play} to={link}>
          <i className="fas fa-play" />
        </Link>

        <button className={buttonClass} onClick={buttonAction}>
          <i className={buttonIcon} />
        </button>
      </div>

      {showConfirmation ? (
        <Confirmation
          title={confirmationTitle}
          question={question}
          caption1="Remove"
          caption2="Cancel"
          action={
            action === "updateFavorites"
              ? onUpdateFavorites
              : onRemoveFromPlaylist
          }
          closeConfirmation={closeConfirmation}
        />
      ) : null}
    </Fragment>
  );
};

ListElement.propTypes = {
  updateFavorites: PropTypes.func.isRequired,
  removeFromPlaylist: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  info: PropTypes.object.isRequired,
  playlist: PropTypes.object,
  index: PropTypes.number.isRequired
};

export default connect(
  null,
  { updateFavorites, removeFromPlaylist }
)(ListElement);
