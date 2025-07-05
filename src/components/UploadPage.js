import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHeart, FaCloudUploadAlt, FaHome, FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const UploadContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
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
  width: 100%;
  max-width: 800px;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    padding: 16px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    gap: 12px;
    margin-bottom: 15px;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
    gap: 6px;
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

const UploadArea = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  padding: 60px 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }
  
  &.drag-over {
    border-color: #ff6b6b;
    background: rgba(255, 107, 107, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
  
  @media (max-width: 480px) {
    padding: 30px 15px;
  }
`;

const UploadIcon = styled.div`
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
    margin-bottom: 12px;
  }
`;

const UploadText = styled.div`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 6px;
  }
`;

const UploadSubtext = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const ProgressContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    margin-top: 15px;
  }
  
  @media (max-width: 480px) {
    margin-top: 12px;
  }
`;

const ProgressItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  
  @media (max-width: 768px) {
    padding: 16px;
    gap: 12px;
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    gap: 10px;
    margin-bottom: 10px;
  }
`;

const ProgressIcon = styled.div`
  font-size: 1.5rem;
  color: ${props => {
    if (props.status === 'success') return '#4CAF50';
    if (props.status === 'error') return '#f44336';
    return 'rgba(255, 255, 255, 0.7)';
  }};
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const ProgressInfo = styled.div`
  flex: 1;
`;

const ProgressFileName = styled.div`
  color: white;
  font-weight: 500;
  margin-bottom: 5px;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 3px;
  }
`;

const ProgressStatus = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 8px;
  
  @media (max-width: 480px) {
    margin-top: 6px;
  }
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  border-radius: 2px;
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(76, 175, 80, 0.9);
  color: white;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  margin-top: 20px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    padding: 16px;
    margin-top: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    margin-top: 12px;
    font-size: 0.9rem;
  }
`;

const ErrorMessage = styled(motion.div)`
  background: rgba(244, 67, 54, 0.9);
  color: white;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  margin-top: 20px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    padding: 16px;
    margin-top: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    margin-top: 12px;
    font-size: 0.9rem;
  }
`;

const UploadPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploads, setUploads] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  }, []);

  const handleFiles = async (files) => {
    const imageFiles = files.filter(file => 
      file.type.startsWith('image/') && 
      ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)
    );

    if (imageFiles.length === 0) {
      alert('Please select only image files (JPEG, PNG, GIF, WebP)');
      return;
    }

    setIsUploading(true);
    const newUploads = imageFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      status: 'uploading',
      progress: 0,
      error: null
    }));

    setUploads(prev => [...prev, ...newUploads]);

    for (const upload of newUploads) {
      try {
        const formData = new FormData();
        formData.append('file', upload.file);

        await axios.post('http://localhost:8080/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploads(prev => prev.map(u => 
              u.id === upload.id ? { ...u, progress } : u
            ));
          }
        });

        setUploads(prev => prev.map(u => 
          u.id === upload.id ? { ...u, status: 'success', progress: 100 } : u
        ));
      } catch (error) {
        setUploads(prev => prev.map(u => 
          u.id === upload.id ? { ...u, status: 'error', error: error.message } : u
        ));
      }
    }

    setIsUploading(false);
    
    // Show success message and auto-navigate after successful uploads
    const successfulUploads = uploads.filter(u => u.status === 'success');
    if (successfulUploads.length > 0) {
      setShowSuccessMessage(true);
      sessionStorage.setItem('fromUpload', 'true'); // Mark that we're coming from upload
      setTimeout(() => {
        navigate('/gallery');
      }, 2000); // Navigate to gallery after 2 seconds
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <FaCheck />;
      case 'error':
        return <FaTimes />;
      default:
        return <FaCloudUploadAlt />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'success':
        return 'Uploaded successfully!';
      case 'error':
        return 'Upload failed';
      default:
        return 'Uploading...';
    }
  };

  return (
    <UploadContainer>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>
          <FaHeart /> Add Photos to Our Gallery
        </Title>
        <div style={{ display: 'flex', gap: '10px' }}>
          <NavButton
            onClick={() => navigate('/upload/music')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaMusic /> Add Music
          </NavButton>
          <NavButton
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHome /> Home
          </NavButton>
        </div>
      </Header>

      <UploadArea
        className={isDragOver ? 'drag-over' : ''}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <UploadIcon>
          <FaCloudUploadAlt />
        </UploadIcon>
        <UploadText>Drop your photos here or click to browse</UploadText>
        <UploadSubtext>Supports JPEG, PNG, GIF, WebP (Max 10MB each)</UploadSubtext>
        <FileInput
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
        />
      </UploadArea>

      {uploads.length > 0 && (
        <ProgressContainer>
          {uploads.map((upload) => (
            <ProgressItem
              key={upload.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProgressIcon status={upload.status}>
                {getStatusIcon(upload.status)}
              </ProgressIcon>
              <ProgressInfo>
                <ProgressFileName>{upload.file.name}</ProgressFileName>
                <ProgressStatus>{getStatusText(upload.status)}</ProgressStatus>
                {upload.status === 'uploading' && (
                  <ProgressBar>
                    <ProgressFill
                      initial={{ width: 0 }}
                      animate={{ width: `${upload.progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </ProgressBar>
                )}
                {upload.error && (
                  <ProgressStatus style={{ color: '#f44336' }}>
                    {upload.error}
                  </ProgressStatus>
                )}
              </ProgressInfo>
            </ProgressItem>
          ))}
        </ProgressContainer>
      )}

      {showSuccessMessage && (
        <SuccessMessage
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Photos uploaded successfully! Redirecting to gallery...
        </SuccessMessage>
      )}

      {uploads.some(u => u.status === 'error') && (
        <ErrorMessage
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Some uploads failed. Please try again.
        </ErrorMessage>
      )}
    </UploadContainer>
  );
};

export default UploadPage; 