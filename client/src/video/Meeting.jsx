import React, { useEffect, useState, useContext, useRef } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../context';
import SimplePeer from 'simple-peer';

function Meeting() {
  const { meetingId } = useParams();
  const [users, setUsers] = useState([]);
  const socket = useContext(SocketContext);
  const userVideo = useRef();

  useEffect(() => {
    const myPeer = new SimplePeer({ initiator: true });

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      myPeer.addStream(stream);

      socket.emit('joinMeeting', { meetingId });

      socket.on('userList', (userList) => {
        userList.forEach((user) => {
          if (user.id !== socket.id) {
            const peer = new SimplePeer();
            peer.addStream(user.stream); // Add the remote stream to the peer
            peer.on('stream', (remoteStream) => {
              // Update the user's stream
              setUsers((prevUsers) =>
                prevUsers.map((prevUser) =>
                  prevUser.id === user.id ? { ...prevUser, stream: remoteStream } : prevUser
                )
              );
            });
            peer.signal(user.signal);
          }
        });
        setUsers(userList); // Update the user list initially
      });

      myPeer.on('signal', (data) => {
        socket.emit('signal', { signal: data, meetingId });
      });

      // Add your own stream to the users array
      setUsers((prevUsers) => [...prevUsers, { id: socket.id, stream }]); 
    });

    return () => {
      socket.emit('leaveMeeting', { meetingId });
    };
  }, [meetingId, socket]);

  useEffect(() => {
    if (userVideo.current && users.length > 0 && users.find((user) => user.id === socket.id)) {
      userVideo.current.srcObject = users.find((user) => user.id === socket.id).stream;
    }
  }, [users, socket]);

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Meeting Room
      </Typography>
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <video
              ref={user.id === socket.id ? userVideo : null}
              autoPlay
              muted={user.id === socket.id} // Mute your own video
              style={{ width: '100%', height: 'auto', border: '1px solid #ccc' }}
            />
            <Typography variant="body1" gutterBottom>
              {user.id === socket.id ? 'You' : user.username}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Meeting;
