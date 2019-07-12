import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchMetadata } from "../../actions/musicActions";
import { smoothScroll } from "../../utils/smoothScroll";

import classes from "./Music.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import Section from "./Section/Section";
import AddToPlaylist from "../../components/App/AddToPlaylist/AddToPlaylist";

const Music = ({ fetchMetadata, loading, history, albums, artists, songs }) => {
  const [state, setState] = useState({
    showPlaylists: false,
    pathname: "",
    itemId: ""
  });

  const { showPlaylists, pathname, itemId } = state;

  useEffect(() => {
    document.title = `JZ Music Player - Music`;
    if (albums.length === 0 || artists.length === 0 || songs.length === 0) {
      fetchMetadata();
    }
  }, []);

  const onShowPlaylists = (pathname, itemId) => {
    setState({ showPlaylists: true, pathname, itemId });
  };

  const onClosePlaylists = () => {
    setState({ showPlaylists: false, pathname: "", itemId: "" });
  };

  const toggleButtons = index => {
    const divs = document.querySelectorAll("span + div");
    const buttons = document.querySelectorAll("span + div > button");
    const left = buttons[index * 2];
    const right = buttons[index * 2 + 1];
    const scrollWidth = divs[index].scrollLeft + divs[index].clientWidth;

    if (divs[index].scrollLeft === 0) {
      left.style.display = "none";
    } else {
      left.style.display = "block";
    }

    if (scrollWidth >= divs[index].scrollWidth) {
      right.style.display = "none";
    } else {
      right.style.display = "block";
    }
  };

  const scrollLeft = async index => {
    const divs = document.querySelectorAll("span + div");
    let targetScroll = divs[index].scrollLeft - 250;
    if (targetScroll < 0) targetScroll = 0;

    try {
      await smoothScroll(divs[index], targetScroll, 251);
      toggleButtons(index);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollRight = async index => {
    const divs = document.querySelectorAll("span + div");
    const maxScroll = divs[index].scrollWidth - divs[index].clientWidth;
    let targetScroll = divs[index].scrollLeft + 250;
    if (targetScroll > maxScroll) targetScroll = maxScroll;

    try {
      await smoothScroll(divs[index], targetScroll, 251);
      toggleButtons(index);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className={classes.Music}>
          <Section
            sectionTitle="TOP ALBUMS"
            info={albums}
            pathname="albums"
            history={history}
            showPlaylists={onShowPlaylists}
            link="/more/albums/"
            linkCaption="More albums..."
            buttonIndex={0}
            scrollLeft={scrollLeft}
            scrollRight={scrollRight}
          />

          <Section
            sectionTitle="TOP ARTISTS"
            info={artists}
            pathname="artists"
            history={history}
            showPlaylists={onShowPlaylists}
            link="/more/artists/"
            linkCaption="More artists..."
            buttonIndex={1}
            scrollLeft={scrollLeft}
            scrollRight={scrollRight}
          />

          <Section
            sectionTitle="TOP SONGS"
            info={songs}
            pathname="songs"
            history={history}
            showPlaylists={onShowPlaylists}
            link="/more/songs/"
            linkCaption="More songs..."
            buttonIndex={2}
            scrollLeft={scrollLeft}
            scrollRight={scrollRight}
          />

          {showPlaylists ? (
            <AddToPlaylist
              pathname={pathname}
              itemId={itemId}
              closePlaylists={onClosePlaylists}
            />
          ) : null}
        </div>
      )}
    </Fragment>
  );
};

Music.propTypes = {
  fetchMetadata: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  albums: PropTypes.array.isRequired,
  artists: PropTypes.array.isRequired,
  songs: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    loading: state.music.loading,
    albums: state.music.metadata.albumsInfo,
    artists: state.music.metadata.artistsInfo,
    songs: state.music.metadata.songsInfo
  };
};

export default connect(
  mapStateToProps,
  { fetchMetadata }
)(Music);
