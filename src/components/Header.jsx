import { AppBar, Toolbar, Box, Avatar, Button, Typography } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";

export default function Header({ onOpenFormDialog }) {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ py: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexGrow: 1 }}>
          <Avatar sx={{ bgcolor: "rgba(255,255,255,0.15)", width: 42, height: 42, fontSize: 22 }}>🦈</Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.3px" }}>
              SUPERSHARKZ
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.65)", letterSpacing: "0.12em", textTransform: "uppercase", fontSize: "0.65rem" }}>
              Charge Management System
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onOpenFormDialog}
          sx={{ bgcolor: "rgba(255,255,255,0.15)", "&:hover": { bgcolor: "rgba(255,255,255,0.25)" }, boxShadow: "none", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}>
          Add Charge
        </Button>
      </Toolbar>
    </AppBar>
  )
}
