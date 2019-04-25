import React from "react";
import classes from "./Playlist.css";
import { secondsToHms } from "../../../utils/secondsToHms";

const Playlist = props => {
  const toggleIconClassName=()=>{
    const icons=document.querySelectorAll(`.${classes.Expand} > i`);
    const plusIcon=`fa-plus-circle`
    const minusIcon=`fa-minus-circle`
    if(icons[props.index].classList.contains(plusIcon)){
      icons[props.index].classList.replace(plusIcon,minusIcon)
    } else if(icons[props.index].classList.contains(minusIcon)){
      icons[props.index].classList.replace(minusIcon,plusIcon)
    }
    props.toggleClassName(props.index)
  }

  return (
  <div className={classes.Playlist}>
    <div>
      <span>{props.playlist.name}</span>
      <p>{props.playlist.description}</p>
    </div>
    <p>Songs: {props.playlist.count}</p>
    <p>Duration: {secondsToHms(props.playlist.duration) || 0}</p>
    {props.playlist.songs.length > 0 ? (
      <button
        className={classes.Play}
        onClick={() => props.onPlayClick(props.playlist.name)}
      >
        <i className="fas fa-play" />
      </button>
    ) : (
      <button className={classes.Play} onClick={() => props.showNotification()}>
        <i className="fas fa-play" />
      </button>
    )}

    <button
      className={classes.Edit}
      onClick={() => props.showModal(props.index)}
    >
      <i className="fas fa-edit" />
    </button>
    <button
      className={classes.Remove}
      onClick={() => props.onRemoveClick(props.index)}
    >
      <i className="far fa-trash-alt" />
    </button>
    <button
      className={classes.Expand}
      onClick={() => toggleIconClassName()}
    >
      <i className="fas fa-plus-circle" />
    </button>
  </div>
)};

export default Playlist;
