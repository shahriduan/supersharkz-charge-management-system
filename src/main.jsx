import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0284c7', light: '#38bdf8', dark: '#0369a1', contrastText: '#fff' },
    secondary: { main: '#0891b2' },
    success: { main: '#16a34a', light: '#dcfce7', dark: '#15803d' },
    warning: { main: '#d97706', light: '#fef3c7' },
    error: { main: '#dc2626', light: '#fee2e2' },
    background: { default: '#f0f9ff', paper: '#ffffff' },
    text: { primary: '#0f172a', secondary: '#475569' },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
    h4: { fontWeight: 800, letterSpacing: '-0.5px' },
    h6: { fontWeight: 700 },
    subtitle2: { fontWeight: 600, letterSpacing: '0.02em' },
  },
  shape: { borderRadius: 5 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)',
          boxShadow: '0 2px 20px rgba(3,105,161,0.25)',
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: { boxShadow: '0 1px 3px rgba(15,23,42,0.08), 0 4px 16px rgba(15,23,42,0.06)' }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            backgroundColor: '#f8fafc',
            color: '#64748b',
            fontWeight: 700,
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            borderBottom: '2px solid #e2e8f0',
          }
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover .MuiTableCell-root': { backgroundColor: '#f0f9ff' },
          '&:last-child .MuiTableCell-root': { borderBottom: 0 },
        }
      }
    },
    MuiTableCell: {
      styleOverrides: { root: { borderColor: '#f1f5f9', padding: '14px 16px' } }
    },
    MuiButton: {
      styleOverrides: {
        root: { fontWeight: 700, textTransform: 'none', borderRadius: 8, letterSpacing: '0.01em' },
        containedPrimary: { boxShadow: '0 2px 8px rgba(2,132,199,0.35)', '&:hover': { boxShadow: '0 4px 14px rgba(2,132,199,0.45)' } },
      }
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.05em' } } },
    MuiTextField: {
      defaultProps: { size: 'small', fullWidth: true },
      styleOverrides: { root: { '& .MuiOutlinedInput-root': { borderRadius: 8 } } }
    },
    MuiDialog: {
      styleOverrides: { paper: { borderRadius: 16, boxShadow: '0 20px 60px rgba(15,23,42,0.2)' } }
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
