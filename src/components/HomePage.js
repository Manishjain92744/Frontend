import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHeart, FaPlay, FaPause, FaMusic } from 'react-icons/fa';

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(102, 126, 234, 0.8) 0%, 
    rgba(118, 75, 162, 0.8) 50%,
    rgba(255, 182, 193, 0.6) 100%);
  z-index: 1;
`;

const FloatingHearts = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  pointer-events: none;
`;

const Heart = styled(motion.div)`
  position: absolute;
  color: rgba(255, 255, 255, 0.3);
  font-size: ${props => props.size}px;
  animation: float 6s ease-in-out infinite;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 3;
  text-align: center;
  max-width: 800px;
  padding: 40px;
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
  
  @media (max-width: 480px) {
    padding: 20px 15px;
  }
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  color: white;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 12px;
  }
  
  @media (max-width: 360px) {
    font-size: 1.6rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  font-weight: 300;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 25px;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 15px;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
`;

const Button = styled(motion.button)`
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: white;
  white-space: nowrap;
  
  &.primary {
    background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(255, 107, 107, 0.4);
    }
  }
  
  &.secondary {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
  }
  
  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 1rem;
    gap: 8px;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    padding: 16px 24px;
    font-size: 1.1rem;
    gap: 10px;
  }
`;

const MusicControl = styled(motion.button)`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
`;

const HeartIcon = styled(motion.div)`
  font-size: 3rem;
  color: #ff6b6b;
  margin-bottom: 20px;
  animation: pulse 2s ease-in-out infinite;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 12px;
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio('/romantic-music.mp3')); // You'll need to add this file

  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.3;
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        console.log('Audio autoplay blocked');
      });
    }
    setIsPlaying(!isPlaying);
  };

  const generateHearts = () => {
    const hearts = [];
    for (let i = 0; i < 20; i++) {
      hearts.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 2
      });
    }
    return hearts;
  };

  return (
    <HomeContainer>
      <BackgroundOverlay />
      
      <FloatingHearts>
        {generateHearts().map(heart => (
          <Heart
            key={heart.id}
            size={heart.size}
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: heart.delay,
            }}
          >
            ❤️
          </Heart>
        ))}
      </FloatingHearts>

      <MusicControl
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </MusicControl>

      <Content>
        <HeartIcon
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ❤️
        </HeartIcon>
        
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Memory Lane
        </Title>
        
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          A Journey of Us • Our Love Story in Pictures
        </Subtitle>
        
        <ButtonContainer
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Button
            className="primary"
            onClick={() => navigate('/gallery')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHeart /> Enter Our Memories
          </Button>
          
          <Button
            className="secondary"
            onClick={() => navigate('/upload')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHeart /> Add Photos
          </Button>
          
          <Button
            className="secondary"
            onClick={() => navigate('/upload/music')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaMusic /> Add Music
          </Button>
        </ButtonContainer>
      </Content>
    </HomeContainer>
  );
};

export default HomePage; 