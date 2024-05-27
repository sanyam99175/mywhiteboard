import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import Card from 'react-bootstrap/Card';
import Axios from "axios";

const LoginPage = ({ uuid, setUser, setRoomJoined }) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!name) return toast.dark("Please enter your name!");
    var user_id = uuid();
    setUser({
      roomId,
      userId: user_id,
      userName: name,
      host: true,
      presenter: true,
    });
    setRoomJoined(true);
    const data = new FormData();
    data.append("user_id", user_id);
    data.append("name", name);
    data.append("room_id", roomId);
    data.append("host", true);
    data.append("presenter", true);
    fetch("http://localhost:5000/insert_whiteboard", {
      method: "POST",
      body: data
  });
  };
  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!joinName) return toast.dark("Please enter your name!");
    var user_id = uuid();
    setUser({
      roomId: joinRoomId,
      userId: user_id,
      userName: joinName,
      host: false,
      presenter: false,
    });
    setRoomJoined(true);
    const data = new FormData();
    data.append("user_id", user_id);
    data.append("name", joinName);
    data.append("room_id", joinRoomId);
    data.append("host", false);
    data.append("presenter", false);
    fetch("http://localhost:5000/insert_whiteboard", {
      method: "POST",
      body: data
  });
  };

  return (
    <div>
    <div className="container">
      <div className="row">
        <div className="col-md-12 p-4">
        <Card  style={{backgroundColor: '#ADD8E6', height: 50}}>
      <div className="d-flex justify-content-center align-items-center">
      <Card.Title className="text-dark mt-2">WELCOME TO MY WHITEBOARD</Card.Title>
      </div>
    </Card>
        </div>
      </div>
      <div className="row mx-5 mt-5 d-flex justify-content-between">
      <Card className="col-md-5">
      <Card.Body>
        <Card.Title>CREATE ROOM</Card.Title>
        <Card.Text>
        <form onSubmit={handleCreateSubmit}>
            <div className="form-group my-2 mt-5">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group my-2 border align-items-center">
              <input
                type="text"
                className="form-control border-0 outline-0"
                value={roomId}
                readOnly={true}
                style={{
                  boxShadow: "none",
                  zIndex: "0 !important",
                  fontsize: "0.89rem !important",
                }}
              />
                          <div className="input-group-append">
                <button
                  className="btn btn-outline-dark  border-0 btn-sm"
                  type="button"
                  onClick={() => setRoomId(uuid())}
                >
                  Generate
                </button>
                &nbsp;&nbsp;
                <CopyToClipboard
                  text={roomId}
                  onCopy={() => toast.success("Room Id Copied To Clipboard!")}
                >
                  <button
                    className="btn btn-outline-dark border-0 btn-sm"
                    type="button"
                  >
                    Copy
                  </button>
                </CopyToClipboard>
              </div>
            </div>
            <div className="form-group mt-5">
              <button type="submit" className="form-control btn btn-dark">
                Create Room
              </button>
            </div>
          </form>
        </Card.Text>
      </Card.Body>
    </Card>
    <Card className="col-md-5">
      <Card.Body>
        <Card.Title>JOIN ROOM</Card.Title>
        <Card.Text>
          <form onSubmit={handleJoinSubmit}>
            <div className="form-group my-2 mt-5">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                value={joinName}
                onChange={(e) => setJoinName(e.target.value)}
              />
            </div>
            <div className="form-group my-2">
              <input
                type="text"
                className="form-control outline-0"
                value={joinRoomId}
                onChange={(e) => setJoinRoomId(e.target.value)}
                placeholder="Room Id"
                style={{
                  boxShadow: "none",
                }}
              />
            </div>
            <div className="form-group mt-5">
              <button type="submit" className="form-control btn btn-dark">
                Join Room
              </button>
            </div>
          </form>
        </Card.Text>
      </Card.Body>
    </Card>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;