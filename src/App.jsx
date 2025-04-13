import axios from 'axios';
import AppRoutes from './routes/AppRoutes';
import { ThemeProviderCustom } from './theme/ThemeContext';

const App = () => {
  axios.defaults.baseURL = "http://localhost:3001"
  return (
    <ThemeProviderCustom>
      <AppRoutes />
    </ThemeProviderCustom>
  );
};

export default App;