import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./Info.css";
import secondsToHours from "../../utils/secondsToHours";

class Info extends Component {
  render() {
    return (
      <div className={classes.Info}>
        <div>
          <div>
            <figure>
              <img
                src="data:image/jpeg;base64,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"
                alt="Album Art"
              />
            </figure>
            <p>Artist: Alexandre Pires</p>
            <p>Title: Cuando Acaba El Placer</p>
            <p>Album: Las Mejores Baladas Románticas en Español</p>
            <p>Genre: Balada</p>
            <p>Duration: {secondsToHours(261)}</p>
            <div className={classes.Links}>
              <Link to="" className={classes.Play}>
                Play
              </Link>
              <Link to="" className={classes.Add}>
                Add to favorites
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;