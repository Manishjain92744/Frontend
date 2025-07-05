import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import ImageUploader from './components/ImageUploader';
import ImagePreview from './components/ImagePreview';
import Header from './components/Header';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  backdrop-filter: blur(10px);
`;

const ContentWrapper = styled.div`
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 20px;
    gap: 20px;
  }
`;

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = useCallback((imageData) => {
    setUploadedImage(imageData);
    setError(null);
  }, []);

  const handleUploadStart = useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);

  const handleUploadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleUploadError = useCallback((errorMessage) => {
    setIsLoading(false);
    setError(errorMessage);
  }, []);

  return (
    <AppContainer>
      <MainContent>
        <Header />
        <ContentWrapper>
          <ImageUploader
            onImageUpload={handleImageUpload}
            onUploadStart={handleUploadStart}
            onUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
            isLoading={isLoading}
          />
          <ImagePreview
            image={uploadedImage}
            isLoading={isLoading}
            error={error}
          />
        </ContentWrapper>
      </MainContent>
    </AppContainer>
  );
}

export default App; 