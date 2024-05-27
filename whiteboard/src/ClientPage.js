import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Card from 'react-bootstrap/Card';

const ClientPage = ({ userNumber, socket, setUsers, setuserNumber }) => {
  const imgRef = useRef(null);
  useEffect(() => {
    socket.on("message", (data) => {
      toast.info(data.message);
    });
  }, []);
  useEffect(() => {
    socket.on("users", (data) => {
      setUsers(data);
      setuserNumber(data.length);
    });
  }, []);
  useEffect(() => {
    socket.on("canvasImage", (data) => {
      imgRef.current.src = data;
    });
  }, []);
  return (
    <div className="container-fluid">
      <div className="row pb-2">
        <Card  className="d-flex justify-content-center" style={{backgroundColor: '#ADD8E6', height: 50}}>
      <div className="d-flex justify-content-center align-items-center">
      <Card.Title className="text-dark mt-2">MY WHITEBOARD - {userNumber} Online user(s) </Card.Title>
      </div>
    </Card>
      </div>
      <div className="row mt-5">
        <div
          className="col-md-8 overflow-hidden border border-dark px-0 mx-auto
          mt-3"
          style={{ height: "500px" }}
        >
          <img className="w-100 h-100" ref={imgRef} src="" alt="image" />
        </div>
      </div>
    </div>
  );
};

export default ClientPage;