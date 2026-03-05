import { Dialog, DialogTitle, DialogContent, Stack, Avatar, Box, Typography, TextField, Grid, InputAdornment, Divider, DialogActions, Button } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon } from "@mui/icons-material";
import { useState } from 'react';

export default function FormModal({ modal, onCloseModal }) {
  const EMPTY_FORM = { charge_id: '', charge_amount: '', paid_amount: '', student_id: '', date_charged: '' };

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(e => ({ ...e, [name]: undefined }));
  };

  const handleSubmit = () => {
    // Logic here
    onCloseModal();
  };

  return (
    <Dialog open={!!modal} onClose={onCloseModal} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar sx={{ bgcolor: "primary.light", width: 36, height: 36 }}>
            {modal?.mode === "add" ? <AddIcon sx={{ color: "primary.dark" }} /> : <EditIcon sx={{ color: "primary.dark" }} />}
          </Avatar>
          <Box>
            <Typography variant="h6">{modal?.mode === "add" ? "Add New Charge" : "Edit Charge"}</Typography>
            <Typography variant="caption" color="text.secondary">
              {modal?.mode === "add" ? "Fill in the details below to record a new charge." : `Editing ${modal?.id}`}
            </Typography>
          </Box>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={2.5}>
          <TextField
            label="Charge ID"
            name="charge_id"
            value={form.charge_id}
            onChange={handleChange}
            disabled={modal?.mode === "edit"}
            error={!!errors.charge_id}
            helperText={errors.charge_id}
            slotProps={{ input: { sx: { fontFamily: "'DM Mono', monospace" } } }}
          />
        <TextField
          label="Student ID"
          name="student_id"
          value={form.student_id}
          onChange={handleChange}
          error={!!errors.student_id}
          helperText={errors.student_id || "e.g. stu_101"}
          placeholder="stu_101"
          slotProps={{ input: { sx: { fontFamily: "'DM Mono', monospace" } } }}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Charge Amount"
              name="charge_amount"
              type="number"
              value={form.charge_amount}
              onChange={handleChange}
              error={!!errors.charge_amount}
              helperText={errors.charge_amount || "Total amount charged"}
              slotProps={{
                htmlInput: { min: 0, step: "0.01" },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      RM
                    </InputAdornment>
                  )
                }
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Paid Amount"
              name="paid_amount"
              type="number"
              value={form.paid_amount}
              onChange={handleChange}
              error={!!errors.paid_amount}
              helperText={errors.paid_amount || "Must be ≤ charge amount"}
              slotProps={{
                htmlInput: { min: 0, step: "0.01" },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      RM
                    </InputAdornment>
                  )
                }
              }}
            />
          </Grid>
        </Grid>
        <TextField
          label="Date Charged"
          name="date_charged"
          type="date"
          value={form.date_charged}
          onChange={handleChange}
          error={!!errors.date_charged}
          helperText={errors.date_charged}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button variant="outlined" onClick={onCloseModal} color="inherit">Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {modal?.mode === "add" ? "Add Charge" : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
