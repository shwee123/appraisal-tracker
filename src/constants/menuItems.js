// src/constants/menuItems.js

const getMenuItems = (navigate) => {
  const userId = localStorage.getItem('id');

  const handleLogout = () => {
    alert("calle....")
    localStorage.removeItem('id');
    navigate('/login'); // Redirect to login page without refresh
  };

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Appreciations',
      path: '/myappriciations',
    },
    
    {
      label:"leave",
      path:"applyforleave"
    },
    
    {
      label: 'Goals',
      children: [
        { label: 'Create Goal', path: '/creategoal' },
        { label: 'My Goals', path: '/mygoals' },
      ],
    },
    {
      label: 'Profile',
      path: '/profile',
    },
    
  ];

  return menuItems;
};

export default getMenuItems;
