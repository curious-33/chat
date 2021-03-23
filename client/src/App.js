import React from 'react';
import { connect } from 'react-redux';
import { AppBar, FlatButton } from 'material-ui';
import { Welcome, Room } from './views';
import { logout } from './redux/actions';
import './App.css'

function App({logout, username}){
    let body, right;
    if (username) {
      body = <Room />;
      right = <FlatButton label="Logout" onClick={() => logout()} />;
    } else {
      body = <Welcome />;
    }

    return (
      <div>
        <AppBar
          title="Chat"
          iconElementRight={right}
        />
        {body}
      </div>
    );
}

const mapStateToProps = (state) => ({
  username: state.app.username
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
