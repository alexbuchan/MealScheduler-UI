import React from 'react';
import { Redirect } from 'react-router-dom';
import UserStore from '../../stores/UserStore/UserStore';

const withAuthentication = (WrappedComponent) => {
  return class Authentication extends React.Component {
    constructor() {
      super();
  
      this.state = {
        auth: UserStore.getUserState().auth,
      }
    }
  
    _onChange = () => {
      this.setState({
        auth: UserStore.getUserState().auth,
      });
    }
  
    componentDidMount() {
      UserStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
      UserStore.removeChangeListener(this._onChange);
    }
  
    render() {
      if (!this.state.auth) return <Redirect to='/login' />;
      return <WrappedComponent id={ this.props.match.params.id }/>;
    }
  }
}

export default withAuthentication;