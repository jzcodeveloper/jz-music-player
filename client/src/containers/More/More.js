import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchMore, fetchLoadMore } from "../../actions/moreActions";

import classes from "./More.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import NotFound from "../../components/UI/NotFound/NotFound";
import GridElement from "../../components/App/GridElement/GridElement";
import AddToPlaylist from "../../components/App/AddToPlaylist/AddToPlaylist";

const More = ({
  fetchMore,
  fetchLoadMore,
  loading,
  more,
  history,
  location: { pathname }
}) => {
  const [state, setState] = useState({
    from: 0,
    limit: 10,
    query: "",
    showPlaylists: false,
    itemId: ""
  });

  const { from, limit, query, showPlaylists, itemId } = state;

  const [, , path, queryURL] = pathname.split("/");

  useEffect(() => {
    document.title = `JZ Music Player - More`;
  }, []);

  useEffect(() => {
    fetchMore(path, 0, limit, queryURL);
    setState({ ...state, from: 0, query: queryURL });
  }, [pathname]);

  const onShowPlaylists = (route, itemId) => {
    setState({ ...state, showPlaylists: true, itemId });
  };

  const onClosePlaylists = () => {
    setState({ ...state, showPlaylists: false, itemId: "" });
  };

  const onClick = () => {
    fetchLoadMore(path, from + limit, limit, query);
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
      <input
        className={classes.Search}
        type="search"
        placeholder={`Search ${path}...`}
        onChange={e => onChange(e)}
        onKeyDown={e => onKeyDown(e)}
        value={query || ""}
        autoFocus
      />

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
  fetchMore: PropTypes.func.isRequired,
  fetchLoadMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  more: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    loading: state.more.loading,
    more: state.more.more
  };
};

export default connect(
  mapStateToProps,
  { fetchMore, fetchLoadMore }
)(More);
