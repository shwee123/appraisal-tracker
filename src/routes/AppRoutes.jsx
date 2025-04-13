import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import { Tables } from '../examples/Tables';
import HrLayout from '../layouts/HrLayout';
import HrDashboard from '../pages/HrDashboard';
import AddEmployee from '../pages/AddEmployee';
import { EmployeeList } from '../pages/EmployeeList';
import { ProfilePage } from '../pages/ProfilePage';
import { CreateEmployeeAppriciation } from '../pages/CreateEmployeeAppriciatino';
import { AppriciationList } from '../pages/AppriciationList';
import MyAppriciation from '../pages/MyAppriciation';
import { CreateGoal } from '../pages/CreateGoal';
import MyGoals from '../pages/MyGoals';
import ApplyForLeave from '../pages/ApplyForLeave';
import LeaveRequestList from '../pages/LeaveRequestList';
import { ApperisialForm } from '../pages/ApperisialForm';
import ApperisialList from '../pages/ApperisialList';
import { UpdateEmployee } from '../pages/UpdateEmployee';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      {path:'table',element:<Tables/>},
      {path:"myappriciations",element:<MyAppriciation/>},
      {path:"profile",element :<ProfilePage/>},
      {path:"creategoal",element:<CreateGoal/>},
      {path:"mygoals",element:<MyGoals></MyGoals>},
      {path:"applyforleave",element:<ApplyForLeave/>}


    ],
  },
  {
    path: '/hr',
    element: <HrLayout />,
    children: [
      { path: '', element: <HrDashboard /> },
      { path: 'dashboard', element: <HrDashboard /> },
      {path:"addemp",element:<AddEmployee/>},
      {path:"emplist",element:<EmployeeList/>},
      {path:"empappriciation/:userId",element:<CreateEmployeeAppriciation/>},
      {path:"appriciationlist",element:<AppriciationList/>},
      {path:"leaverequests",element:<LeaveRequestList/>},
      {path:"apperisial/:id",element:<ApperisialForm/>},
      {path:"apperisiallist",element:<ApperisialList/>}
      ,{path:"updatemp/:id",element:<UpdateEmployee/>}

    ],
  },
  // Routes WITHOUT layout
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
]);

const AppRoutes = () => <RouterProvider router={router} />;
export default AppRoutes;
