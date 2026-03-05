import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)",
          boxShadow: "0 2px 20px rgba(3,105,161,0.25)",
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: { fontWeight: 700, textTransform: "none", borderRadius: 8, letterSpacing: "0.01em" },
        containedPrimary: { boxShadow: "0 2px 8px rgba(2,132,199,0.35)", "&:hover": { boxShadow: "0 4px 14px rgba(2,132,199,0.45)" } },
      }
    },
    MuiTextField: {
      defaultProps: { size: "small", fullWidth: true },
      styleOverrides: { root: { "& .MuiOutlinedInput-root": { borderRadius: 8 } } }
    },
    MuiDialog: {
      styleOverrides: { paper: { borderRadius: 16, boxShadow: "0 20px 60px rgba(15,23,42,0.2)" } }
    },
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
