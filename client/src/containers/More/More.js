import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { fetchMore, fetchLoadMore } from "../../store/actions/moreActions";

import classes from "./More.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import NotFound from "../../components/UI/NotFound/NotFound";
import Search from "../../components/App/Search/Search";
import GridElement from "../../components/App/GridElement/GridElement";
import AddToPlaylist from "../../components/App/AddToPlaylist/AddToPlaylist";

const More = ({ history, location: { pathname } }) => {
  const dispatch = useDispatch();

  const { loading, more } = useSelector(({ more }) => more);

  const [state, setState] = useState({
    from: 0,
    limit: 10,
    query: "",
    showPlaylists: false,
    showSearch: false,
    itemId: ""
  });

  const { from, limit, query, showPlaylists, showSearch, itemId } = state;

  const [, , path, queryURL] = pathname.split("/");

  useEffect(() => {
    document.title = `JZ Music Player - More`;
  }, []);

  useEffect(() => {
    dispatch(fetchMore(path, 0, limit, queryURL));
    setState({ ...state, from: 0, query: queryURL });
  }, [pathname]);

  const onShowPlaylists = (route, itemId) => {
    setState({ ...state, showPlaylists: true, itemId });
  };

  const onClosePlaylists = () => {
    setState({ ...state, showPlaylists: false, itemId: "" });
  };

  const showSearchModal = () => {
    setState({ ...state, showSearch: true });
  };

  const closeSearchModal = () => {
    setState({ ...state, showSearch: false });
  };

  const onClick = () => {
    dispatch(fetchLoadMore(path, from + limit, limit, query));
    setState({ ...state, from: from + limit });
  };

  const onChange = e => {
    setState({ ...state, query: e.target.value });
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) history.push(`/more/${path}/${query}`);
  };

  const albumsLength = more.albums.info.length;
  const artistsLength = more.artists.info.length;
  const songsLength = more.songs.info.length;

  return (
    <Fragment>
      {showSearch ? (
        <Search
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={query}
          path={path}
          close={closeSearchModal}
        />
      ) : (
        <i
          className={`fas fa-search ${classes.SearchIcon}`}
          onClick={showSearchModal}
        />
      )}

      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {albumsLength > 0 || artistsLength > 0 || songsLength > 0 ? (
            <div className={classes.More}>
              <div>
                {more[path].info.map(info => (
                  <GridElement
                    key={info._id}
                    info={info}
                    pathname={path}
                    history={history}
                    showPlaylists={onShowPlaylists}
                  />
                ))}
              </div>
              {from + limit < more[path].count ? (
                <button className={classes.LoadMore} onClick={e => onClick(e)}>
                  Load more...
                </button>
              ) : null}

              {showPlaylists ? (
                <AddToPlaylist
                  pathname={path}
                  itemId={itemId}
                  closePlaylists={onClosePlaylists}
                />
              ) : null}
            </div>
          ) : (
            <NotFound msg="Nothing here, try another search" />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

More.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default More;
