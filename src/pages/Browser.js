import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const Browser = () => {
  const browsers = [
    { name: 'AdsPower', url: 'https://www.adspower.com/' },
    { name: 'Incognition', url: 'https://incogniton.com/' },
    { name: 'MoreLogin', url: 'https://www.morelogin.com/' },
    { name: 'ClonBrowser', url: 'https://www.clonbrowser.com/' },
    { name: 'GoLogin', url: 'https://gologin.com/' },
    { name: 'Dolphin{anty}', url: 'https://dolphin-anty.com/' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <Container maxWidth="xl">
      <Box 
        sx={{ 
          minHeight: '100vh', 
          pt: 10, 
          pb: 4,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(147, 112, 219, 0.1) 0%, transparent 50%)',
            animation: 'pulse 8s ease-in-out infinite',
            zIndex: -1
          }
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{
              color: '#E6E6FA',
              textAlign: 'center',
              textShadow: '0 0 20px rgba(147, 112, 219, 0.5)',
              fontWeight: 'bold',
              mb: 4,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, rgba(147, 112, 219, 0.8), transparent)',
                animation: 'shimmer 2s infinite'
              }
            }}
          >
            Browser Tools
          </Typography>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {browsers.map((browser, index) => (
              <Grid item xs={12} sm={6} md={4} key={browser.name}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: [0, -1, 1, -1, 0],
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Paper 
                    sx={{ 
                      p: 4,
                      height: '100%',
                      background: 'rgba(20, 20, 40, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(147, 112, 219, 0.2)',
                      borderRadius: '20px',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 3,
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
                      transition: 'all 0.3s ease',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, rgba(147, 112, 219, 0.1), rgba(30, 144, 255, 0.1))',
                        borderRadius: '20px',
                        zIndex: 0,
                        transition: 'opacity 0.3s ease'
                      },
                      '&:hover': {
                        boxShadow: '0 8px 32px rgba(147, 112, 219, 0.3)',
                        border: '1px solid rgba(147, 112, 219, 0.4)',
                        '&::before': {
                          opacity: 0.8,
                          background: 'linear-gradient(45deg, rgba(147, 112, 219, 0.2), rgba(30, 144, 255, 0.2))',
                        }
                      }
                    }}
                  >
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      sx={{ 
                        color: '#E6E6FA',
                        fontWeight: 'bold',
                        position: 'relative',
                        zIndex: 1,
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      {browser.name}
                    </Typography>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="contained" 
                        href={browser.url}
                        target="_blank"
                        sx={{ 
                          position: 'relative',
                          zIndex: 1,
                          background: 'linear-gradient(45deg, #9370DB, #4169E1)',
                          color: 'white',
                          padding: '12px 24px',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          textTransform: 'none',
                          borderRadius: '12px',
                          transition: 'all 0.3s ease',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                            transform: 'translateX(-100%)',
                            transition: 'transform 0.6s ease',
                          },
                          '&:hover': {
                            background: 'linear-gradient(45deg, #8A2BE2, #1E90FF)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 20px rgba(147, 112, 219, 0.4)',
                            '&::before': {
                              transform: 'translateX(100%)',
                            }
                          }
                        }}
                      >
                        Visit {browser.name}
                      </Button>
                    </motion.div>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-45deg); }
          100% { transform: translateX(150%) skewX(-45deg); }
        }
      `}</style>
    </Container>
  );
};

export default Browser; 