import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaTimes, FaChevronLeft, FaChevronRight, FaHome, FaPlay, FaPause, FaSync, FaMusic, FaTrash, FaEllipsisV } from 'react-icons/fa';
import axios from 'axios';
import PhotoInteractions from './PhotoInteractions';

const GalleryContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  position: relative;

  @media (max-width: 768px) {
    padding: 15px 10px;
  }
  
  @media (max-width: 480px) {
    padding: 10px 8px;
  }
`;

const Header = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  flex-wrap: wrap;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    padding: 16px 12px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 8px;
    gap: 12px;
    margin-bottom: 15px;
  }
`;

const Title = styled.h1`
  color: white;
  font-family: 'Pacifico', cursive;
  font-size: 2.2rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 10px;
  letter-spacing: 1px;
  line-height: 1.1;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    justify-content: center;
    text-align: center;
    width: 100%;
  }
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
    gap: 6px;
  }
  
  @media (max-width: 360px) {
    font-size: 1.2rem;
  }
`;

const HeaderControls = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: 8px;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }
`;

const NavButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    padding: 12px 16px;
    font-size: 1rem;
  }
`;

const MusicSelector = styled.select`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 12px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 0.95rem;
  backdrop-filter: blur(10px);
  max-width: 160px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  appearance: none;

  option {
    background: #333;
    color: white;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 7px 10px;
    max-width: 140px;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: none;
    font-size: 1rem;
    padding: 10px 12px;
  }
`;

const MusicControl = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
  
  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
    font-size: 1.1rem;
  }
`;

const GalleryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
  }
  
  @media (max-width: 360px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const ImageCard = styled(motion.div)`
  position: relative;
  border-radius: 15px;
  overflow: visible;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 480px) {
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ImageCard}:hover & {
    transform: scale(1.05);
  }
  
  @media (max-width: 480px) {
    height: 200px;
    
    ${ImageCard}:hover & {
      transform: scale(1.02);
    }
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 20px;
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  
  ${ImageCard}:hover & {
    transform: translateY(0);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  color: white;
  font-size: 1.2rem;
`;

const Lightbox = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const LightboxImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 10px;
`;

const LightboxControls = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
`;

const LightboxButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const NavigationButtons = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  pointer-events: none;
`;

const NavButtonLightbox = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const PhotoActionsMenu = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 3;
  
  @media (max-width: 768px) {
    top: 8px;
    right: 8px;
  }
  
  @media (max-width: 480px) {
    top: 6px;
    right: 6px;
  }
`;

const MenuButton = styled.button`
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
`;

const MenuDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(15px);
  border-radius: 10px;
  padding: 8px 0;
  min-width: 120px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;
  
  @media (max-width: 480px) {
    min-width: 140px;
  }
`;

const MenuItem = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 10px 16px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  

  
  @media (max-width: 480px) {
    padding: 12px 18px;
    font-size: 1rem;
  }
`;

const FooterMessage = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: none;
  color: #fff;
  font-family: 'Pacifico', cursive;
  font-size: 1.1rem;
  text-align: center;
  padding: 10px 0 14px 0;
  z-index: 9999;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.2);
  pointer-events: none;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 8px 0 12px 0;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 6px 0 10px 0;
  }
`;

const Gallery = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio('/romantic-music.mp3'));
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [musicFiles, setMusicFiles] = useState([]);
  const [currentMusic, setCurrentMusic] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.2;
    
    fetchImages();
    fetchMusicFiles();
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  // Auto-refresh when coming from upload page
  useEffect(() => {
    const isFromUpload = sessionStorage.getItem('fromUpload');
    if (isFromUpload) {
      sessionStorage.removeItem('fromUpload');
      fetchImages();
      fetchMusicFiles();
    }
  }, []);

  const fetchImages = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.get('http://localhost:8080/api/images');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const fetchMusicFiles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/music');
      setMusicFiles(response.data);
      // Set the first music file as current if available
      if (response.data.length > 0 && !currentMusic) {
        setCurrentMusic(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching music files:', error);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      if (currentMusic) {
        audio.src = `http://localhost:8080/api/images/${currentMusic}`;
        audio.play().catch(() => {
          console.log('Audio autoplay blocked');
        });
      } else {
        audio.play().catch(() => {
          console.log('Audio autoplay blocked');
        });
      }
    }
    setIsPlaying(!isPlaying);
  };

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyPress = (e) => {
    if (selectedImage) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenu(null);
    };

    if (openMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openMenu]);

  const handleDeletePhoto = async (image) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;
    setDeleting(true);
    setOpenMenu(null); // Close menu after action
    try {
      await axios.delete(`http://localhost:8080/api/images/${encodeURIComponent(image)}`);
      setImages((prev) => prev.filter((img) => img !== image));
    } catch (error) {
      alert('Failed to delete photo.');
    } finally {
      setDeleting(false);
    }
  };

  const toggleMenu = (imageName, e) => {
    e.stopPropagation();
    setOpenMenu(openMenu === imageName ? null : imageName);
  };

  const closeMenu = () => {
    setOpenMenu(null);
  };

  if (loading) {
    return (
      <GalleryContainer>
        <LoadingContainer>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            ❤️
          </motion.div>
          <span style={{ marginLeft: '10px' }}>Loading our memories...</span>
        </LoadingContainer>
        <FooterMessage>
          Made with ❤️ by the one who loves you the most
        </FooterMessage>
      </GalleryContainer>
    );
  }

  return (
    <>
      <GalleryContainer>
        <Header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>
            <FaHeart /> Our Photo Gallery
          </Title>
          <HeaderControls>
            {musicFiles.length > 0 && (
              <MusicSelector
                value={currentMusic || ''}
                onChange={(e) => {
                  setCurrentMusic(e.target.value);
                  if (isPlaying) {
                    audio.pause();
                    setIsPlaying(false);
                  }
                }}
              >
                {musicFiles.map(music => (
                  <option key={music} value={music}>
                    {music.replace(/\.(mp3|wav|m4a)$/i, '')}
                  </option>
                ))}
              </MusicSelector>
            )}
            <MusicControl
              onClick={toggleMusic}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </MusicControl>
            <NavButton
              onClick={() => {
                fetchImages();
                fetchMusicFiles();
              }}
              disabled={isRefreshing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSync style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} /> 
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </NavButton>
            <NavButton
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHome /> Home
            </NavButton>
          </HeaderControls>
        </Header>

        <GalleryGrid
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {images.map((image, index) => (
            <ImageCard
              key={image}
              layoutId={`image-${index}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '15px' }}>
                <Image
                  src={`http://localhost:8080/api/images/${image}`}
                  alt={`Memory ${index + 1}`}
                  loading="lazy"
                  onClick={() => openLightbox(image, index)}
                  style={{ cursor: 'pointer' }}
                />
                <PhotoActionsMenu>
                  <MenuButton
                    onClick={(e) => toggleMenu(image, e)}
                    disabled={deleting}
                    title="Photo actions"
                  >
                    <FaEllipsisV />
                  </MenuButton>
                  <AnimatePresence>
                    {openMenu === image && (
                      <MenuDropdown
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MenuItem 
                          onClick={(e) => { e.stopPropagation(); handleDeletePhoto(image); }} 
                          disabled={deleting}
                        >
                          Delete
                        </MenuItem>
                      </MenuDropdown>
                    )}
                  </AnimatePresence>
                </PhotoActionsMenu>
                <ImageOverlay>
                  <div>Memory #{index + 1}</div>
                </ImageOverlay>
                <PhotoInteractions photoName={image} show={true} />
              </div>
            </ImageCard>
          ))}
        </GalleryGrid>

        <AnimatePresence>
          {selectedImage && (
            <Lightbox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <LightboxControls>
                <LightboxButton onClick={closeLightbox}>
                  <FaTimes />
                </LightboxButton>
              </LightboxControls>

              <NavigationButtons>
                <NavButtonLightbox onClick={prevImage}>
                  <FaChevronLeft />
                </NavButtonLightbox>
                <NavButtonLightbox onClick={nextImage}>
                  <FaChevronRight />
                </NavButtonLightbox>
              </NavigationButtons>

              <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}>
                <LightboxImage
                  src={`http://localhost:8080/api/images/${images[currentIndex]}`}
                  alt={`Memory ${currentIndex + 1}`}
                  onClick={(e) => e.stopPropagation()}
                />
                <PhotoActionsMenu style={{ position: 'absolute', top: '20px', right: '20px' }}>
                  <MenuButton
                    onClick={(e) => toggleMenu(images[currentIndex], e)}
                    disabled={deleting}
                    title="Photo actions"
                  >
                    <FaEllipsisV />
                  </MenuButton>
                  <AnimatePresence>
                    {openMenu === images[currentIndex] && (
                      <MenuDropdown
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MenuItem 
                          onClick={(e) => { e.stopPropagation(); handleDeletePhoto(images[currentIndex]); }} 
                          disabled={deleting}
                        >
                          Delete
                        </MenuItem>
                      </MenuDropdown>
                    )}
                  </AnimatePresence>
                </PhotoActionsMenu>
                <PhotoInteractions photoName={images[currentIndex]} show={true} />
              </div>
            </Lightbox>
          )}
        </AnimatePresence>
      </GalleryContainer>
      <FooterMessage>
        Made with ❤️ by the one who loves you the most
      </FooterMessage>
    </>
  );
};

export default Gallery; 