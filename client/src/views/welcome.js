import React, { useState } from "react";
import { connect } from "react-redux";
import { TextField, FlatButton } from "material-ui";
import { Card, CardTitle, CardText, CardActions } from "material-ui/Card";
import { login } from "../redux/actions";

function Welcome({login}) {
  const [username, setUsername] = useState('');
  function handleLogin(e) {
    e.preventDefault()
    if (username && username.length > 0) {
      login(username);
    }
  }
  return (
    <div style={{ display: "flex", marginTop: "32px" }}>
      <div style={{ flex: 1 }}></div>
      <form style={{ width: "400px" }}>
        <Card>
          <CardTitle title="Welcome" />
          <CardText>
            To start chat, please choose your name in the room.
            <TextField
              type="text"
              value={username}
              hintText="E.g. Alice, Bob, ..."
              floatingLabelText="Display Name"
              onChange={(e) => setUsername(e.target.value)}
            />
          </CardText>
          <CardActions>
            <FlatButton type="submit" label="Start" onClick={handleLogin} />
          </CardActions>
        </Card>
      </form>
      <div style={{ flex: 1 }}></div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  login: (username) => dispatch(login(username)),
});

export default connect(null, mapDispatchToProps)(Welcome);
