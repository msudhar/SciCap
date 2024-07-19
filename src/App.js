import React from 'react';
import './App.css';
import { Container, Grid } from '@mui/material';
import Header from './components/Header';
import QuickActions from './components/QuickActions';
import Notifications from './components/Notifications';
import ChatBox from './components/ChatBox';

function App() {
  return (
    <Container maxWidth="lg">
      <Header />
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={3}>
          <QuickActions />
          <Notifications />
        </Grid>
        <Grid item xs={9}>
          <ChatBox />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
