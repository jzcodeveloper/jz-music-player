import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./More.css";
import NotFoundImage from "../../assets/NotFoundImage.jpg";

import { fetchMore, fetchLoadMore } from "../../actions/moreActions";
import { addToPlaylist } from "../../actions/playlistsActions";

import Spinner from "../../components/UI/Spinner/Spinner";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import GridElement from "../../components/App/GridElement/GridElement";
import AddToPlaylist from "../../components/App/AddToPlaylist/AddToPlaylist";

class More extends Component {
  state = {
    from: 0,
    limit: 10,
    query: "",
    //Modal
    showPlaylists: false,
    pathname: "",
    itemId: {}
  };

  componentDidMount() {
    document.title = `JZ Music Player - More`;
    const { pathname } = this.props.location;
    const path = pathname.split("/")[2];
    const query = pathname.split("/")[3];
    this.props.fetchMore(path, this.state.from, this.state.limit, query);
    this.setState({ query });
  }

  componentDidUpdate(prevProps) {
    const newQuery = this.props.location.pathname.split("/")[3];
    const currentQuery = prevProps.location.pathname.split("/")[3];
    const path = prevProps.location.pathname.split("/")[2];
    if (newQuery !== currentQuery) {
      this.props.fetchMore(path, this.state.from, this.state.limit, newQuery);
      this.setState({ query: newQuery });
    }
  }

  showPlaylists = (pathname, itemId) => {
    this.setState({ showPlaylists: true, pathname, itemId });
  };

  closePlaylists = () => {
    this.setState({ showPlaylists: false, pathname: "", itemId: {} });
  };

  addToPlaylist = (route, playlistId, itemId) => {
    this.props.addToPlaylist(route, playlistId, itemId);
  };

  onClick = () => {
    this.setState(prevState => {
      const { pathname } = this.props.location;
      const path = pathname.split("/")[2];
      const query = pathname.split("/")[3];
      this.props.fetchLoadMore(
        path,
        this.state.from + this.state.limit,
        this.state.limit,
        query
      );
      return {
        from: prevState.from + prevState.limit
      };
    });
  };

  onChange = e => {
    this.setState({ query: e.target.value });
  };

  onKeyDown = e => {
    if (e.keyCode === 13) {
      const { pathname } = this.props.location;
      const path = pathname.split("/")[2];
      const query = this.state.query || "";
      this.props.history.push(`/more/${path}/${query}`);
      this.setState({ from: 0 });
    }
  };

  render() {
    const { history, loading, location } = this.props;
    const { albums, artists, songs } = this.props.more;
    const pathname = location.pathname.split("/")[2];

    let more = <Spinner />;

    if (!loading) {
      if (
        albums.info.length > 0 ||
        artists.info.length > 0 ||
        songs.info.length > 0
      ) {
        more = (
          <div className={classes.More}>
            <div>
              {this.props.more[pathname].info.map(info => (
                <GridElement
                  key={info._id}
                  info={info}
                  pathname={pathname}
                  history={history}
                  showPlaylists={this.showPlaylists}
                />
              ))}
            </div>
            {this.state.from + this.state.limit <
            this.props.more[pathname].count ? (
              <button className={classes.LoadMore} onClick={this.onClick}>
                Load more...
              </button>
            ) : null}

            {this.state.showPlaylists ? (
              <AddToPlaylist
                pathname={this.state.pathname}
                itemId={this.state.itemId}
                addToPlaylist={this.addToPlaylist}
                closePlaylists={this.closePlaylists}
              />
            ) : null}
            {this.state.showPlaylists ? <Backdrop show /> : null}
          </div>
        );
      } else {
        const msg = "Nothing here, try another search";
        more = (
          <div className={classes.NotFound}>
            <img src={NotFoundImage} alt="Not Found" />
            <h1>{msg}</h1>
          </div>
        );
      }
    }

    return (
      <div>
        <input
          className={classes.Search}
          type="search"
          placeholder={`Search ${pathname}...`}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          value={this.state.query}
          autoFocus
        />
        {more}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    more: state.more.more,
    loading: state.more.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMore: (payload, from, limit, query) =>
      dispatch(fetchMore(payload, from, limit, query)),
    fetchLoadMore: (payload, from, limit, query) =>
      dispatch(fetchLoadMore(payload, from, limit, query)),
    addToPlaylist: (route, playlistId, itemId) =>
      dispatch(addToPlaylist(route, playlistId, itemId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(More);
