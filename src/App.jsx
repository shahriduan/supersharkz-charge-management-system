import { useState,useRef } from 'react';
import './App.css';
import Header from './components/Header';
import FormDialog from './components/FormDialog';
import ChargeLedgerTable from './components/ChargeLedgerTable';
import { Snackbar, Alert, Button } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";

const INITIAL_CHARGES = [
  { charge_id: 'chg_001', charge_amount: 120.00, paid_amount:   0.00, student_id: 'stu_101', date_charged: '2025-01-05' },
  { charge_id: 'chg_002', charge_amount:  80.50, paid_amount:  80.50, student_id: 'stu_102', date_charged: '2025-01-07' },
  { charge_id: 'chg_003', charge_amount: 150.00, paid_amount:  50.00, student_id: 'stu_101', date_charged: '2025-01-12' },
  { charge_id: 'chg_004', charge_amount:  95.00, paid_amount:   0.00, student_id: 'stu_103', date_charged: '2025-01-15' },
  { charge_id: 'chg_005', charge_amount: 200.00, paid_amount: 200.00, student_id: 'stu_104', date_charged: '2025-01-20' },
];

function App() {
  // UI
  const formRef = useRef();
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  // Data
  const [charges, setCharges] = useState(INITIAL_CHARGES);

  function generateId(charges) {
    const nums = charges.map(c => parseInt(c.charge_id.replace('chg_', ''), 10)).filter(Boolean);
    return `chg_${String(Math.max(0, ...nums) + 1).padStart(3, '0')}`;
  }

  const openAddDialog = () => {
    formRef.current.setFormFromParent({ ...formRef.current.getEmptyForm(), charge_id: generateId(charges), date_charged: new Date().toISOString().split('T')[0] });
    formRef.current.setErrorsFromParent({});
    setModal({ mode: 'add' });
  };

  const closeModal = () => { 
    setModal(null); 
    formRef.current.setErrorsFromParent({});
  };

  return (
    <>
      <Header onOpenFormDialog={openAddDialog}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAddDialog}
          sx={{ bgcolor: "rgba(255,255,255,0.15)", "&:hover": { bgcolor: "rgba(255,255,255,0.25)" }, boxShadow: "none", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}>
          Add Charge
        </Button>
      </Header>

      <ChargeLedgerTable 
        charges={charges} 
        setCharges={setCharges} 
        setToast={setToast} 
        setModal={setModal} 
        setErrors={(err) => formRef.current?.setErrorsFromParent(err)} 
        setForm={(form) => formRef.current?.setFormFromParent(form)} 
      />

      <FormDialog 
        ref={formRef} 
        modal={modal} 
        onCloseModal={closeModal} 
        charges={charges} 
        setCharges={setCharges} 
        setToast={setToast} 
      />

      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={toast?.sev || "success"} variant="filled" onClose={() => setToast(null)} sx={{ borderRadius: 2 }}>
          {toast?.msg}
        </Alert>
      </Snackbar>
    </>
  )
}

export default App
