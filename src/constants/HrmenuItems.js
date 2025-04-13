import { patch } from "@mui/material";

// src/constants/menuItems.js
const menuItems = [
  {
    label: "Dashboard",
    path: "dashboard",
  },

  {
    label: "Employee",
    children: [
      { label: "ADD EMPLOYEE", path: "addemp" },
      { label: "LIST EMPLOYEE", path: "emplist" },
    ],
  },

  {
    label: "Appriciation",
    path: "appriciationlist",
  },
  {
    label: "leaves",
    path: "leaverequests",
  },
  
  { label: "apperisiallist", path: "apperisiallist" },

  {
    label: "Auth",
    children: [{ label: "Login", path: "/login" }],
  },

  
];

export default menuItems;
