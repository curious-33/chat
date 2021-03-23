import React, { useState } from "react";
import { connect } from "react-redux";
import { List, ListItem } from "material-ui/List";
import { TextField, FlatButton } from "material-ui";
import { sendMessage } from "../redux/actions";

function Room({ users, messages, sendMessage }) {
  const [text, setText] = useState("");
  const handleSend = (e) => {
    e.preventDefault();
    if (text !== "") {
      sendMessage(text);
      setText("");
    }
  };
  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <div style={{ width: "350px", overflowY: "auto" }}>
        <List>
          {Object.keys(users).map((username, i) => (
            <ListItem primaryText={username} key={`${i}:${username}`} />
          ))}
        </List>
      </div>
      <div style={{ flex: 1}}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: 1, zIndex: 1 }}>
            <List>
              {messages.list
                .map((id) => messages.entities[id])
                .map((m, i) => (
                  <ListItem
                    primaryText={m.message}
                    secondaryText={m.username}
                    key={`${i}:${m.id}`}
                  />
                ))}
            </List>
          </div>
          <div
            style={{
              zIndex: 43,
              position: "fixed",
              bottom: 0,
              left: "350px",
              right: 0,
            }}
          >
            <form style={{ display: "flex"}}>
              <div style={{ flex: 1 }}>
                <TextField
                  value={text}
                  fullWidth={true}
                  hintText="Message"
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div style={{ width: "80px" }}>
                <FlatButton type="submit" label="Send" onClick={handleSend} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  users: state.users,
  messages: state.messages,
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (text) => dispatch(sendMessage(text)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Room);
