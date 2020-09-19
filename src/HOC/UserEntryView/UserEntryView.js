import React from 'react';
import UserStore from '../../stores/UserStore/UserStore';
import Background from '../../components/Background/Background';

const withUserEntry = (WrappedComponent, props={}) => {
  return class UserEntryView extends React.Component {
    constructor() {
      super();
  
      this.state = {
        user: UserStore.getUserState().user
      }
    }
  
    _onChange = () => {
      this.setState({
        user: UserStore.getUserState().user,
      });
    }
  
    componentDidMount() {
      UserStore.addChangeListener(this._onChange);
    }
  
    componentWillUnmount() {
      UserStore.removeChangeListener(this._onChange);
    }
  
    render() {
      return (
        <div className='signup-login-view-wrapper'>
          <div className='signup-login-view'>
            <Background />
            <WrappedComponent user={ this.state.user } props={ props } />
          </div>
        </div>
      );
    }
  }
}

export default withUserEntry;