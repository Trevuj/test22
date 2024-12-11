import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'WinCleaner', path: '/wincleaner' },
    { text: 'Browser', path: '/browser' },
    { text: 'Contact', path: '/contact' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          background: 'rgba(75, 0, 130, 0.4)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(147, 112, 219, 0.3)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              background: 'linear-gradient(45deg, #9370DB, #6C63FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.8rem',
              letterSpacing: '1.5px',
              fontFamily: '"Poppins", sans-serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.3s ease',
              },
            }}
          >
            Survey World of Farhan
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                color: '#9370DB',
                '&:hover': {
                  color: '#6C63FF',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 3 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: location.pathname === item.path ? '#E6E6FA' : 'rgba(230, 230, 250, 0.7)',
                    position: 'relative',
                    padding: '8px 16px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    background: location.pathname === item.path ? 
                      'linear-gradient(45deg, rgba(147, 112, 219, 0.2), rgba(108, 99, 255, 0.2))' : 
                      'transparent',
                    borderRadius: '8px',
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(45deg, rgba(147, 112, 219, 0.3), rgba(108, 99, 255, 0.3))',
                      border: '1px solid rgba(147, 112, 219, 0.5)',
                      transform: 'translateY(-2px)',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: location.pathname === item.path ? '100%' : '0%',
                      height: '2px',
                      background: 'linear-gradient(45deg, #9370DB, #6C63FF)',
                      transition: 'width 0.3s ease',
                      borderRadius: '2px',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            width: 240,
            background: 'rgba(75, 0, 130, 0.95)',
            backdropFilter: 'blur(10px)',
            borderLeft: '1px solid rgba(147, 112, 219, 0.3)',
          },
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                color: location.pathname === item.path ? '#E6E6FA' : 'rgba(230, 230, 250, 0.7)',
                margin: '8px',
                borderRadius: '8px',
                background: location.pathname === item.path ? 
                  'linear-gradient(45deg, rgba(147, 112, 219, 0.2), rgba(108, 99, 255, 0.2))' : 
                  'transparent',
                '&:hover': {
                  background: 'linear-gradient(45deg, rgba(147, 112, 219, 0.3), rgba(108, 99, 255, 0.3))',
                },
              }}
            >
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar; 