import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./More.css";

import background from "../../assets/background.jpg";

import { fetchMore, fetchLoadMore } from "../../actions/moreActions";
import { updateFavorites } from "../../actions/favoriteActions";

import Spinner from "../Spinner/Spinner";
import getQueryParams from "../../utils/getQueryParams";
import secondsToHms from "../../utils/secondsToHours";

class More extends Component {
  state = {
    from: 0,
    limit: 10
  };

  componentDidMount() {
    const pathname = this.props.location.pathname.split("/");
    const query = getQueryParams(this.props.location.search).query;
    this.props.fetchMore(pathname[2], this.state.from, this.state.limit, query);
  }

  onClick = () => {
    this.setState(prevState => {
      const pathname = this.props.location.pathname.split("/");
      const query = getQueryParams(this.props.location.search).query;
      this.props.fetchLoadMore(
        pathname[2],
        this.state.from + this.state.limit,
        this.state.limit,
        query
      );
      return {
        from: prevState.from + prevState.limit
      };
    });
  };

  onFavoriteClick = (route, id) => {
    this.props.updateFavorites(route, id);
  };

  onAlbumArtClick = (pathname, id) => {
    this.props.history.push(`/player/${pathname}/${id}`);
  };

  render() {
    let more = <Spinner />;

    if (!this.props.loading && this.props.more.info.length > 0) {
      const pathname = this.props.location.pathname.split("/");

      more = (
        <div className={classes.More}>
          <div>
            {this.props.more.info.map(info => (
              <figure key={info._id}>
                <img
                  src={
                    info.albumArt
                      ? "data:image/jpeg;base64," + info.albumArt.albumArt
                      : background
                  }
                  alt="Album Art"
                  onClick={() =>
                    this.onAlbumArtClick(
                      pathname[2],
                      info.title || info.artist || info.album
                    )
                  }
                />
                <p>{info.title || info.artist || info.album}</p>
                <p>
                  {pathname[2] === "songs" ? info.artist : info.albumArtist}
                </p>
                <p>
                  {info.count
                    ? `Songs: ${info.count}`
                    : `Genre: ${info.genre.join(" /")}`}
                </p>
                <p>Duration: {secondsToHms(info.duration)}</p>
                <button
                  className={classes.Favorite}
                  onClick={() => this.onFavoriteClick(pathname[2], info._id)}
                >
                  <i
                    className={
                      info.favorites.indexOf(this.props.user.id) >= 0
                        ? "fas fa-star"
                        : "far fa-star"
                    }
                  />
                </button>
              </figure>
            ))}
          </div>
          {this.state.from + this.state.limit < this.props.more.count ? (
            <button className={classes.LoadMore} onClick={this.onClick}>
              Load more...
            </button>
          ) : null}
        </div>
      );
    }

    return more;
  }
}

const mapStateToProps = state => {
  return {
    more: state.more.more,
    loading: state.loading.loading,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMore: (payload, from, limit, query) =>
      dispatch(fetchMore(payload, from, limit, query)),
    fetchLoadMore: (payload, from, limit, query) =>
      dispatch(fetchLoadMore(payload, from, limit, query)),
    updateFavorites: (route, id) => dispatch(updateFavorites(route, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(More);
