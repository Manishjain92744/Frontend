import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px 40px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 25px 20px;
  }
  
  @media (max-width: 480px) {
    padding: 20px 15px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
  
  @media (max-width: 360px) {
    font-size: 1.4rem;
  }
`;

const Subtitle = styled.p`
  margin: 10px 0 0 0;
  font-size: 1.1rem;
  opacity: 0.9;
  font-weight: 300;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 8px 0 0 0;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin: 6px 0 0 0;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>📸 Image Upload</Title>
      <Subtitle>Upload and preview your images with style</Subtitle>
    </HeaderContainer>
  );
};

export default Header; 