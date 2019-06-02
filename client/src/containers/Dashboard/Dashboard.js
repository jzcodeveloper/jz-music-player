import React from "react";
import { connect } from "react-redux";
import classes from "./Dashboard.css";

import Action from "./Action/Action";

const Dashboard = props => {
  document.title=`JZ Music Player - Dashboard`
  const { user } = props;

  return (
    <div className={classes.Dashboard}>
      <h1>Welcome, {user.name}</h1>
      <Action
        iconStyle={classes.Music}
        iconClass="fas fa-music"
        description="Browse through the entire collection of music by going to
              the Music page, add songs to your Favorites or add them to
              your custom Playlist!"
        linkPath="/music"
        linkCaption="Browse Music..."
      />

      <Action
        iconStyle={classes.Favorites}
        iconClass="fas fa-star"
        description="Add songs to your favorites by going to My Favorites page,
              here you'll see all the songs, albums, and artists that you
              previously added, so that you can listen to them!"
        linkPath="/favorites"
        linkCaption="My Favorites..."
      />

      <Action
        iconStyle={classes.Playlists}
        iconClass="fas fa-list-ul"
        description="Manage your custom playlists by going to My Playlists page,
              you'll be able to create, edit and remove a playlist; Add as
              many songs as you want and enjoy listening to them!"
        linkPath="/playlists"
        linkCaption="My Playlists..."
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Dashboard);
