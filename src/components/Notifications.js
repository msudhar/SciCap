import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function Notifications() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">Scientific Captioning</Typography>
        <Typography variant="body1" style={{ color: 'red', marginTop: '10px' }}>
        Enhancing SCICAP dataset 
        </Typography>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
        Scientific figures often contain crucial information, and providing accurate captions is essential for better
comprehension
        </Typography>
        <Typography variant="body1" style={{ color: 'orange', marginTop: '10px' }}>
          Background Information
        </Typography>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
        SCICAP is a significant dataset designed for image captioning, specifically focusing on real-world scientific
figures and their captions. This dataset was meticulously curated using over two million images extracted from
more than 290,000 scientific papers sourced from arXiv. SCICAP aims to facilitate research on utilizing
computational models to analyze and generate captions for scientific figures, particularly focusing on the
dominant figure type of graph plots. 
        </Typography>
        <Typography variant="body1" style={{ color: 'green', marginTop: '10px' }}>
          Approaches
        </Typography>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          LLAVA (Large Language and Vision Assistan)<br></br>
        Multimodal Understanding<br></br>
        Advanced Image and Video Analysis<br></br>
        Natural Language Processing<br></br>
        Fine-Tuning Capabilities<br></br>
        </Typography>
        <Typography variant="body1" style={{ color: 'blue', marginTop: '10px' }}>
          Model Features
          
        </Typography>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
        LLaVA is an end-to-end trained large multimodal model that is designed to understand and generate content based on both visual inputs (images) and textual instructions. It combines the capabilities of a visual encoder and a language model to process and respond to multimodal inputs
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Notifications;
