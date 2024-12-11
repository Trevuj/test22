import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9C27B0',
      light: '#BA68C8',
      dark: '#7B1FA2',
    },
    secondary: {
      main: '#6C63FF',
      light: '#8A84FF',
      dark: '#4A43DB',
    },
    background: {
      default: 'transparent',
      paper: 'rgba(42, 9, 68, 0.6)',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#B0B0B0',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#04007561',
      textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#070A0E',
    },
    h5: {
      fontWeight: 500,
      color: '#E0E0E0',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'transparent',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'rgba(156, 39, 176, 0.1)',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(156, 39, 176, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 20px rgba(156, 39, 176, 0.3)',
            background: 'rgba(156, 39, 176, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(42, 9, 68, 0.4)',
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          border: '1px solid rgba(156, 39, 176, 0.2)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 16,
            padding: '2px',
            background: 'linear-gradient(45deg, rgba(156, 39, 176, 0.5), rgba(108, 99, 255, 0.2))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: '#6C63FF',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.1) 0%, rgba(0, 0, 0, 0.2) 100%)',
        },
      },
    },
  },
}); 