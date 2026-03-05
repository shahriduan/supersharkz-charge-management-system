import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import FormDialog from './components/FormDialog';
import ChargeLedgerTable from './components/ChargeLedgerTable';

const INITIAL_CHARGES = [
  { charge_id: 'chg_001', charge_amount: 120.00, paid_amount:   0.00, student_id: 'stu_101', date_charged: '2025-01-05' },
  { charge_id: 'chg_002', charge_amount:  80.50, paid_amount:  80.50, student_id: 'stu_102', date_charged: '2025-01-07' },
  { charge_id: 'chg_003', charge_amount: 150.00, paid_amount:  50.00, student_id: 'stu_101', date_charged: '2025-01-12' },
  { charge_id: 'chg_004', charge_amount:  95.00, paid_amount:   0.00, student_id: 'stu_103', date_charged: '2025-01-15' },
  { charge_id: 'chg_005', charge_amount: 200.00, paid_amount: 200.00, student_id: 'stu_104', date_charged: '2025-01-20' },
];

function App() {
  // UI
  const [modal, setModal]   = useState(null);

  // Data
  const [charges, setCharges] = useState(INITIAL_CHARGES);

  const openAdd = () => {
    // setForm({ ...EMPTY_FORM, charge_id: genId(charges), date_charged: new Date().toISOString().split("T")[0] });
    // setErrors({});
    setModal({ mode: 'add' });
  };

  const closeModal = () => { 
    setModal(null); 
    // setErrors({}); 
  };

  return (
    <>
      <Header onOpenFormDialog={openAdd} />
      <ChargeLedgerTable charges={charges} />
      <FormDialog modal={modal} onCloseModal={closeModal} />
    </>
  )
}

export default App
