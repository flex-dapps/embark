import PropTypes from "prop-types";
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Services from '../components/Services';
import {
  listenToServices as listenToServicesAction, 
  services as servicesAction,
  stopServices as stopServicesAction
} from "../actions";
import DataWrapper from "../components/DataWrapper";
import {getServices} from "../reducers/selectors";
import Loading from '../components/Loading';
import Error from '../components/Error';

class ServicesContainer extends Component {
  componentDidMount() {
    this.props.fetchServices();
    this.props.listenToServices();
  }

  componentWillUnmount() {
    this.props.stopServices();
  }

  render() {
    const {error, loading, services} = this.props;
    if (error) {
      return <Error error={error} />;
    }

    if (loading) {
      return <Loading />;
    }
    return <DataWrapper shouldRender={services.length > 0 } {...this.props} render={({services}) => (
        <Services services={services} />
      )} />;

  }
}

ServicesContainer.propTypes = {
  fetchServices: PropTypes.func,
  listenToServices: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool
};

function mapStateToProps(state, _props) {
  return {
    services: getServices(state),
    error: state.errorMessage,
    loading: state.loading
  };
}

export default connect(
  mapStateToProps,
  {
    fetchServices: servicesAction.request,
    listenToServices: listenToServicesAction,
    stopServices: stopServicesAction
  }
)(ServicesContainer);
