import React, { useState } from 'react';
import axios from 'axios';

const ChatBox = () => {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [originalCaption, setOriginalCaption] = useState('');
  const [fineTunedCaption, setFineTunedCaption] = useState('');

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFileURL(URL.createObjectURL(uploadedFile));
    setOriginalCaption('');
    setFineTunedCaption('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
	formData.append('prompt', prompt);
    formData.append('file', file);

    try {
      // Fetch caption from original LLAVA model
      const originalResponse = await axios.post(
        'https://8000-01j1pnw9ye8670xwr432g5034a.cloudspaces.litng.ai/predict/llava',
        formData,
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const { caption: originalCaption } = originalResponse.data;

      // Fetch caption from fine-tuned model
      const fineTunedResponse = await axios.post(
        'https://8000-01j1pnw9ye8670xwr432g5034a.cloudspaces.litng.ai/predict',
        formData,
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const { caption: fineTunedCaption } = fineTunedResponse.data;

      setOriginalCaption(originalCaption);
      setFineTunedCaption(fineTunedCaption);
    } catch (error) {
      setOriginalCaption('Server is down.  Please try again later!');
      setFineTunedCaption('Server is down.  Please try again later!');
      console.error('There was an error uploading the file!', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/png" />
        <button 
          type="submit" 
          style={{ 
            marginLeft: '10px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            textAlign: 'center', 
            textDecoration: 'none', 
            display: 'inline-block', 
            fontSize: '16px', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
        >
          Show Caption
        </button>
      </form>
      {fileURL && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h3 style={{ fontWeight: 'bold', color: '#333' }}>Uploaded Image:</h3>
          <img 
            src={fileURL} 
            alt="Uploaded Preview" 
            style={{ 
              maxWidth: '200px', 
              maxHeight: '200px', 
              display: 'block', 
              margin: '0 auto', 
              border: '1px solid #ccc', 
              borderRadius: '5px' 
            }} 
          />
        </div>
      )}
      {originalCaption && (
        <div style={{ 
          marginTop: '20px', 
          textAlign: 'center', 
          padding: '10px', 
          border: '2px solid #4CAF50', 
          borderRadius: '10px',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
          backgroundColor: '#f9f9f9'
        }}>
          <h3 style={{ fontWeight: 'bold', color: '#333' }}>Original LLava Model:</h3>
          <h4 style={{ fontWeight: 'bold', color: '#888' }}>Generated Caption</h4>
          <p style={{ fontSize: '1.2em', color: '#555' }}>{originalCaption}</p>
        </div>
      )}
      {fineTunedCaption && (
        <div style={{ 
          marginTop: '20px', 
          textAlign: 'center', 
          padding: '10px', 
          border: '2px solid #4CAF50', 
          borderRadius: '10px',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
          backgroundColor: '#f9f9f9'
        }}>
          <h3 style={{ fontWeight: 'bold', color: '#333' }}>Our Fine Tuned Model:</h3>
          <h4 style={{ fontWeight: 'bold', color: '#088' }}>Generated Caption</h4>
          <p style={{ fontSize: '1.2em', color: '#555' }}>{fineTunedCaption}</p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
