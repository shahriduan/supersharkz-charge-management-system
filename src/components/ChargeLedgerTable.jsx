import { 
  Box, Container, Paper, Typography, Chip, TableContainer, Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody, Stack, Tooltip, IconButton, Dialog, DialogTitle, Avatar, Divider, DialogContent, DialogContentText, DialogActions, Button
} from '@mui/material';
import { useState, useMemo } from 'react';
import { rm } from '../utils/currencyUtils.js';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';
import UnpaidIcon from '@mui/icons-material/RadioButtonUnchecked';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ChargeLedgerTable({ charges, setCharges, setToast, setModal, setErrors, setForm }) {
  const COLUMNS = [
    { id: 'charge_id', label: 'Charge ID' },
    { id: 'student_id', label: 'Student' },
    { id: 'date_charged', label: 'Date' },
    { id: 'charge_amount', label: 'Charged' },
    { id: 'paid_amount', label: 'Paid' },
    { id: null, label: 'Outstanding' },
    { id: null, label: 'Status' },
    { id: null, label: 'Actions' },
  ];

  const [orderBy, setOrderBy] = useState('date_charged');
  const [order, setOrder]   = useState('desc');
  const [deleteTgt, setDeleteTgt] = useState(null);

  const handleSort = (col) => {
    setOrder(orderBy === col && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(col);
  };

  const outstanding = (c) => c.charge_amount - c.paid_amount;

  const openEdit = (c) => {
    setForm({ ...c, charge_amount: String(c.charge_amount), paid_amount: String(c.paid_amount) });
    setErrors({});
    setModal({ mode: "edit", id: c.charge_id });
  };

  const confirmDelete = () => {
    setCharges(charge => charge.filter(item => item.charge_id !== deleteTgt));
    setToast({ msg: `Charge ${deleteTgt} deleted.`, sev: "error" });
    setDeleteTgt(null);
  };

  const sorted = useMemo(() => {
    return [...charges].sort((a, b) => {
      let av = a[orderBy], bv = b[orderBy];
      if (typeof av === 'number') return order === 'asc' ? av - bv : bv - av;
      return order === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
  }, [charges, order, orderBy]);

  return (
    <>
      <Box sx={{ bgcolor: "background.default", minHeight: "calc(100vh - 64px)", py: 4 }}>
        <Container maxWidth="xl">
          <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
            <Box sx={{ px: 3, py: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9" }}>
              <Box>
                <Typography variant="h6" sx={{ color: "text.primary" }}>Charge Ledger</Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>{charges.length} records total</Typography>
              </Box>
              <Chip label={`${charges.filter(c => c.paid_amount < c.charge_amount).length} outstanding`} size="small" color="error" variant="outlined" />
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {COLUMNS.map((col, i) => (
                      <TableCell key={i} align={i >= 3 && i <= 5 ? "right" : "left"}>
                        {col.id ? (
                          <TableSortLabel
                            active={orderBy === col.id}
                            direction={orderBy === col.id ? order : "asc"}
                            onClick={() => handleSort(col.id)}>
                            {col.label}
                          </TableSortLabel>
                        ) : col.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sorted.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} align="center" sx={{ py: 6, color: "text.secondary" }}>
                        No charges recorded yet. Click "Add Charge" to get started.
                      </TableCell>
                    </TableRow>
                  )}
                  {sorted.map((sortedCharge) => (
                    <TableRow key={sortedCharge.charge_id}>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, color: "primary.main", fontSize: "0.8rem" }}>
                          {sortedCharge.charge_id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={sortedCharge.student_id}
                          size="small"
                          variant="outlined"
                          sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", borderColor: "#cbd5e1", color: "text.secondary" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>{sortedCharge.date_charged}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, color: "text.primary" }}>
                          {rm(sortedCharge.charge_amount)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontFamily: "'DM Mono', monospace", color: "success.dark", fontWeight: 600 }}>
                          {rm(sortedCharge.paid_amount)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, color: outstanding(sortedCharge) > 0 ? "error.main" : "success.dark" }}>
                          {rm(outstanding(sortedCharge))}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <StatusChip charge={sortedCharge} />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          <Tooltip title="Edit charge">
                            <IconButton size="small" onClick={() => openEdit(sortedCharge)} sx={{ color: "primary.main", "&:hover": { bgcolor: "#e0f2fe" } }}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete charge">
                            <IconButton size="small" onClick={() => setDeleteTgt(sortedCharge.charge_id)} sx={{ color: "error.main", "&:hover": { bgcolor: "error.light" } }}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>

      {/* Delete dialog confirmation */}
      <Dialog open={!!deleteTgt} onClose={() => setDeleteTgt(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar sx={{ bgcolor: "error.light", width: 36, height: 36 }}>
              <DeleteIcon sx={{ color: "error.main" }} />
            </Avatar>
            <Typography variant="h6">Delete Charge</Typography>
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 2.5 }}>
          <DialogContentText>
            You are about to permanently delete charge{" "}
            <Box component="span" sx={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, color: "text.primary", bgcolor: "#f1f5f9", px: 0.75, py: 0.25, borderRadius: 1 }}>
              {deleteTgt}
            </Box>
            .
          </DialogContentText>
          <DialogContentText sx={{ mt: 1.5, fontSize: "0.82rem", color: "text.disabled" }}>
            This action is permanent and cannot be undone. Please confirm you have selected the correct record.
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button variant="outlined" onClick={() => setDeleteTgt(null)} color="inherit">Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>Yes, Delete Permanently</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

function StatusChip({ charge }) {
  const out = charge.charge_amount - charge.paid_amount;

  if (out <= 0) {
    return <Chip label="Paid" size="small" icon={<CheckIcon sx={{ fontSize: "14px !important" }} />} sx={{ bgcolor: "success.light", color: "success.dark" }} />;
  }

  if (charge.paid_amount > 0) {
    return <Chip label="Partial" size="small" icon={<WarningIcon sx={{ fontSize: "14px !important" }} />} sx={{ bgcolor: "warning.light", color: "warning.main" }} />;
  }

  return <Chip label="Unpaid" size="small" icon={<UnpaidIcon sx={{ fontSize: "14px !important" }} />} sx={{ bgcolor: "error.light", color: "error.main" }} />;
}
