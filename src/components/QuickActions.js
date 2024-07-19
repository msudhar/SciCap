import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

function QuickActions() {
  return (
    <Card variant="outlined" style={{ marginBottom: '10px' }}>
      <CardContent>
        <Typography variant="h6">Quick Actions</Typography>
        <Button variant="contained" fullWidth style={{ marginTop: '10px' }}>Upload Figures</Button>
        <Button variant="contained" fullWidth style={{ marginTop: '10px' }}>Previous List</Button>
        <Button variant="contained" fullWidth style={{ marginTop: '10px' }}>Retry</Button>
      </CardContent>
    </Card>
  );
}

export default QuickActions;
