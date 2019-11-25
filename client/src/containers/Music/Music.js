import React, { , useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { fetchMetadata } from "../../store/actions/musicActions";
import { smoothScroll } from "../../utils/smoothScroll";

import classes from "./Music.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import Section from "./Section/Section";
import AddToPlaylist from "../../components/App/AddToPlaylist/AddToPlaylist";

const Music = ({ history }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector(({ music }) => music);

  const { albumsInfo, artistsInfo, songsInfo } = useSelector(
    ({ music }) => music.metadata
  );

  const [state, setState] = useState({
    showPlaylists: false,
    pathname: "",
    itemId: ""
  });

  const { showPlaylists, pathname, itemId } = state;

  useEffect(() => {
    document.title = `JZ Music Player - Music`;
    if (albumsInfo.length === 0) dispatch(fetchMetadata());
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
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className={classes.Music}>
          <Section
            sectionTitle="Top Albums"
            info={albumsInfo}
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
            sectionTitle="Top Artists"
            info={artistsInfo}
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
            sectionTitle="Top Songs"
            info={songsInfo}
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
    </>
  );
};

Music.propTypes = {
  history: PropTypes.object.isRequired
};

export default Music;
