import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
  100% { transform: translateY(0px) rotate(360deg); }
`;

const StyledSphere = styled(Box)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(45deg, #6C63FF, #5A52D5);
  position: absolute;
  top: 20%;
  right: 10%;
  animation: ${float} 6s ease-in-out infinite;
  opacity: 0.6;
  &::before {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    border-radius: 50%;
    background: linear-gradient(45deg, rgba(255,255,255,0.1), transparent);
  }
`;

const FloatingSphere = () => {
  return <StyledSphere />;
};

export default FloatingSphere; 