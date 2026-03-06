# 🦈 Supersharkz — Charge Management System

> Created by: Mohammad Shahriduan

---

## How to Run the Project

This project is a single-file React component. To run it locally:

### Prerequisites

- Node.js v20 or later
- npm or yarn

### Setup

1. Clone the repository

```bash
git clone https://github.com/shahriduan/supersharkz-charge-management-system.git
cd supersharkz-charge-management-system
```

2. Install dependencies
```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser at `http://localhost:5173`



## Engineering Notes

### Assumptions Made

Since this is a frontend only assessment and there is no backend, all data is stored in the React state using the provided sample dataset. Charge IDs are automatically generated using the format `chg_NNN`. The number increases from the highest existing ID to prevent duplicates. The `student_id` field is a free text input. In a real system, this would normally be a dropdown list connected to a students API. All currency values are in Malaysian Ringgit (RM). When adding a new charge, the `date_charged` field will automatically use today's date because administrators usually record charges on the same day they happen.

### Trade-offs Chosen

The application stores all data in a single `useState` array inside the App component. It does not use other state management libraries like Redux or Zustand because the project is small and simple. When editing a charge, a modal form is used instead of editing directly in the table. This keeps the table layout clean and makes validation errors easier to see. It also helps the user focus before saving changes.

The Charge ID is automatically generated when adding a new charge. This prevents users from creating duplicate IDs. The Charge ID is visible in the form. The project uses Material UI (MUI) for the user interface components. MUI helps create a clean and modern design while keeping the code simple and easy to maintain.

### What I Would Improve Next

- Connect to a real REST API with optimistic UI updates and proper error recovery.
- Add filtering and search — by student ID, date range, or payment status.
- Add pagination or virtual scrolling for large ledgers.
- Replace the `student_id` free-text field with a searchable dropdown populated from a `/students` endpoint.


## UX Reflection

Three realistic mistakes a non-technical admin might make, and how the UI helps prevent them:

### 1. Entering a Paid Amount Higher Than the Charge Amount

An admin might accidentally enter the wrong value in the **Paid Amount** field. 
For example, entering **RM 400 paid** for a charge of **RM 200**. This is not correct because the paid amount should not be more than the charge amount.

**Prevention:** The form checks that `paid_amount` is less than or equal to `charge_amount`. If the paid amount is higher, the form will show an error message and stop the submission.

### 2. Recording a Charge Under the Wrong Student

Student IDs like `stu_101` are not easy to read. An admin may type one wrong character and add the charge to the wrong student without noticing.

**Prevention:** The `student_id` field uses a monospace font so each character is easier to see. In the table, the Student column also uses the same font so it is easier to compare the IDs. In the future, this can be improved by using a student name lookup instead of typing the ID manually.

### 3. Accidentally Submitting an Incomplete or Zero-Value Charge

An admin may click **Add Charge** before filling all the fields, or enter `0` as the charge amount. This will create a record that has no real value and may cause problems when checking financial records later.

**Prevention:** All fields are required before a charge can be created. The `charge_amount` field cannot be zero or negative. If the value is invalid, the form shows the error message **"Must be a positive number."** The form cannot be submitted until all fields are valid. Error messages are shown next to the related field so the user can easily see what needs to be fixed.


## Deletion Handling

Clicking the **Delete** button on a row does not immediately remove the charge.  
Instead, it opens a confirmation modal that:

- Shows the specific **Charge ID** being deleted so the admin can verify the correct record
- Uses **red/destructive colour coding** to clearly signal that this is an irreversible action
- Requires the admin to click a second, explicitly labelled button (**"Yes, Delete Permanently"**) to proceed
- Can be dismissed by clicking **Cancel** or pressing **Escape**

### Why this approach?

A single-click delete with no confirmation is too easy to trigger accidentally, especially on **touch devices** or when an admin is working quickly. A confirmation dialog adds just enough friction to prevent mistakes without being so cumbersome that admins start looking for workarounds. The modal is **intentionally blocking** (modal behaviour) so the admin cannot interact with other charges while a destructive action is pending.

### Permanently Means Permanently

The confirmation text intentionally includes the word **"Permanently"** to reinforce that there is **no undo**. In a production system, a **soft-delete with a short undo window** (for example, a toast notification with an **Undo** button for 5 seconds) would provide an additional safety net. This is noted as a **future improvement**.

---

*Built for the Supersharkz Full-Stack Developer Assessment*