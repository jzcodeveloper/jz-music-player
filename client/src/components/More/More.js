import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./More.css";

import { fetchMore, fetchLoadMore } from "../../actions/moreActions";

import Spinner from "../Spinner/Spinner";
import GridElement from "../GridElement/GridElement";
import getQueryParams from "../../utils/getQueryParams";

class More extends Component {
  state = {
    from: 0,
    limit: 10
  };

  componentDidMount() {
    const pathname = this.props.location.pathname.split("/")[2];
    const query = getQueryParams(this.props.location.search).query;
    this.props.fetchMore(pathname, this.state.from, this.state.limit, query);
  }

  onClick = () => {
    this.setState(prevState => {
      const pathname = this.props.location.pathname.split("/")[2];
      const query = getQueryParams(this.props.location.search).query;
      this.props.fetchLoadMore(
        pathname,
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

    if (!this.props.loading && this.props.more.info.length > 0) {
      const pathname = this.props.location.pathname.split("/")[2];

      more = (
        <div className={classes.More}>
          <div>
            {this.props.more.info.map(info => (
              <GridElement
                key={info._id}
                info={info}
                pathname={pathname}
                history={this.props.history}
              />
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
