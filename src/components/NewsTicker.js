import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { getRandomName } from '../services/dataService';

const scrollLeft = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const scrollRight = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const TickerContainer = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(75, 0, 130, 0.3);
  backdrop-filter: blur(8px);
  padding: 8px 0;
  border-top: 1px solid rgba(147, 112, 219, 0.3);
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 1000;
`;

const NewsText = styled(Typography)`
  white-space: nowrap;
  animation: ${scrollLeft} 30s linear infinite;
  color: #E6E6FA;
`;

const NumbersText = styled(Typography)`
  white-space: nowrap;
  animation: ${scrollRight} 20s linear infinite;
  color: #BA68C8;
  font-family: 'Courier New', monospace;
`;

const NewsTicker = () => {
  const generateIP = () => {
    return Array.from({ length: 4 }, () => 
      Math.floor(Math.random() * 256)
    ).join('.');
  };

  const generateNames = () => {
    return Array.from({ length: 20 }, () => 
      getRandomName()
    ).join(' • ');
  };

  const generateIPs = () => {
    return Array.from({ length: 15 }, () => 
      generateIP()
    ).join(' • ');
  };

  const [names] = useState(generateNames());
  const [ips] = useState(generateIPs());

  return (
    <TickerContainer>
      <Box sx={{ overflow: 'hidden' }}>
        <NewsText variant="body2">
          {names} • {names}
        </NewsText>
      </Box>
      <Box sx={{ overflow: 'hidden' }}>
        <NumbersText variant="body2">
          {ips} • {ips}
        </NumbersText>
      </Box>
    </TickerContainer>
  );
};

export default NewsTicker; 