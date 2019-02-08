import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./More.css";

import { fetchMore, fetchLoadMore } from "../../actions/moreActions";

import Spinner from "../Spinner/Spinner";
import GridElement from "../GridElement/GridElement";
import {getQueryParams} from "../../utils/getQueryParams";

class More extends Component {
  state = {
    from: 0,
    limit: 10
  };

  componentDidMount() {
      const { pathname, search } = this.props.location;
      const path = pathname.split("/")[2];
      if(this.props.more[path].info.length===0){
        const query = getQueryParams(search).query;
        this.props.fetchMore(path, this.state.from, this.state.limit, query);
      }
  }

  onClick = () => {
    this.setState(prevState => {
      const { pathname, search } = this.props.location;
      const path = pathname.split("/")[2];
      const query = getQueryParams(search).query;
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

  render() {
    let more = <Spinner />;

    const { history, loading, location } = this.props;
    const { albums, artists, songs } = this.props.more;
    if (
      !loading &&
      (albums.info.length > 0 ||
        artists.info.length > 0 ||
        songs.info.length > 0)
    ) {
      const pathname = location.pathname.split("/")[2];

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
    }

    return more;
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
