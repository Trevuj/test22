import React from 'react';
import { Container, Typography, Box, IconButton, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GroupsIcon from '@mui/icons-material/Groups';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const SocialIcon = styled.a`
  font-size: 8rem;
  margin: 0 100px;
  color: #051650;
  transition: all 0.3s ease;
  position: relative;
  animation: ${bounce} 2s ease-in-out infinite;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    width: 120%;
    height: 120%;
    border-radius: 50%;
    background: radial-gradient(circle at center, rgba(5, 22, 80, 0.2), transparent 70%);
    top: -10%;
    left: -10%;
    z-index: -1;
    transition: all 0.3s ease;
  }

  &:hover {
    color: #0B2885;
    transform: scale(1.6) rotate(30deg) !important;

    .MuiIconButton-root {
      transform: scale(1.6) rotate(30deg);
    }

    &::after {
      transform: scale(1.8);
      background: radial-gradient(circle at center, rgba(11, 40, 133, 0.3), transparent 70%);
    }
  }
`;

const Contact = () => {
  const socialLinks = [
    { 
      icon: <GroupsIcon sx={{ fontSize: '7rem' }} />, 
      url: 'https://www.facebook.com/groups/877637010112660',
      label: 'Facebook Group',
      isGroup: true
    },
    { 
      icon: <FacebookIcon sx={{ fontSize: '7rem' }} />, 
      url: 'https://www.facebook.com/FarhanRana.M',
      label: 'Facebook Profile',
      isGroup: false
    }
  ];

  return (
    <Container>
      <Box sx={{ minHeight: '100vh', pt: 10, pb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="h5" gutterBottom>
          Connect with us on social media
        </Typography>
        <Stack 
          direction="row" 
          spacing={24} 
          justifyContent="center" 
          sx={{ mt: 16 }}
        >
          {socialLinks.map((social, index) => (
            <SocialIcon
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: social.isGroup ? 'rgba(5, 22, 80, 0.15)' : 'transparent',
                padding: social.isGroup ? '50px' : '0',
                borderRadius: social.isGroup ? '50%' : '0',
                boxShadow: social.isGroup ? '0 0 40px rgba(5, 22, 80, 0.3)' : 'none',
                animationDelay: index % 2 === 0 ? '0s' : '1s'
              }}
            >
              <IconButton
                color="primary"
                component="span"
                aria-label={social.label}
                size="large"
                sx={{
                  transition: 'all 0.3s ease',
                  '& .MuiSvgIcon-root': {
                    fontSize: '7rem',
                    color: '#051650',
                    filter: 'drop-shadow(0 0 20px rgba(5, 22, 80, 0.6))'
                  }
                }}
              >
                {social.icon}
              </IconButton>
            </SocialIcon>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default Contact; 