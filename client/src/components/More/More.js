import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./More.css";

import { fetchMore, fetchLoadMore } from "../../actions/moreActions";

import Spinner from "../Spinner/Spinner";
import GridElement from "../GridElement/GridElement";

class More extends Component {
  state = {
    from: 0,
    limit: 10,
    query: ""
  };

  componentDidMount() {
    const { pathname } = this.props.location;
    const path = pathname.split("/")[2];
    if (this.props.more[path].info.length === 0) {
      const query = pathname.split("/")[3];
      this.props.fetchMore(path, this.state.from, this.state.limit, query);
      this.setState({ query });
    }
  }

  componentWillReceiveProps(newProps) {
    const newQuery = newProps.location.pathname.split("/")[3];
    const currentQuery = this.props.location.pathname.split("/")[3];
    const path = this.props.location.pathname.split("/")[2];
    if (newQuery !== currentQuery) {
      this.props.fetchMore(path, this.state.from, this.state.limit, newQuery);
      this.setState({ query: newQuery });
    }
  }

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
      this.props.fetchMore(
        path,
        this.state.from,
        this.state.limit,
        this.state.query
      );
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
                />
              ))}
            </div>
            {this.state.from + this.state.limit <
            this.props.more[pathname].count ? (
              <button className={classes.LoadMore} onClick={this.onClick}>
                Load more...
              </button>
            ) : null}
          </div>
        );
      } else {
        more = (
          <h1 className={classes.NotFound}>
            Nothing here, please try another search
          </h1>
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
    loading: state.loading.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMore: (payload, from, limit, query) =>
      dispatch(fetchMore(payload, from, limit, query)),
    fetchLoadMore: (payload, from, limit, query) =>
      dispatch(fetchLoadMore(payload, from, limit, query))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(More);
