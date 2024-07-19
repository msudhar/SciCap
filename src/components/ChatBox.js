import React, { useState } from 'react';
import axios from 'axios';

const ChatBox = () => {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [originalModelData, setOriginalModelData] = useState({});
  const [fineTunedModelData, setFineTunedModelData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFileURL(URL.createObjectURL(uploadedFile));
    setOriginalModelData({});
    setFineTunedModelData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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

      setOriginalModelData(originalResponse.data);
      setFineTunedModelData(fineTunedResponse.data);
    } catch (error) {
      console.error('There was an error uploading the file!', error);
    } finally {
      setLoading(false);
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
              maxWidth: '500px', 
              maxHeight: '500px', 
              display: 'block', 
              margin: '0 auto', 
              border: '1px solid #ccc', 
              borderRadius: '5px' 
            }} 
          />
        </div>
      )}
      {loading && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Loading...</p>
          <div style={{ 
            width: '100%', 
            backgroundColor: '#f3f3f3', 
            borderRadius: '5px', 
            overflow: 'hidden' 
          }}>
            <div style={{ 
              width: '100%', 
              height: '10px', 
              backgroundColor: '#4CAF50', 
              animation: 'progress 2s linear infinite' 
            }}></div>
          </div>
        </div>
      )}
      {originalModelData.caption && !loading && (
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
          <p style={{ fontSize: '1.2em', color: '#555' }}><b>Caption:</b> {originalModelData.caption}</p>
          <p style={{ fontSize: '1.2em', color: '#555' }}><b>Original Caption:</b> {originalModelData.original_caption}</p>
          <p style={{ fontSize: '1.2em', color: '#555' }}><b>BELU Score:</b> {originalModelData.belu_score}</p>
        </div>
      )}
      {fineTunedModelData.caption && !loading && (
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
          <p style={{ fontSize: '1.2em', color: '#555' }}><b>Caption:</b> {fineTunedModelData.caption}</p>
          <p style={{ fontSize: '1.2em', color: '#555' }}><b>Original Caption:</b> {fineTunedModelData.original_caption}</p>
          <p style={{ fontSize: '1.2em', color: '#555' }}><b>BELU Score: </b>{fineTunedModelData.belu_score}</p>
        </div>
      )}
      <style>
        {`
          @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}
      </style>
    </div>
  );
};

export default ChatBox;
