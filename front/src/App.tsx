import { Route, Routes } from 'react-router-dom';
import AppToolBar from './components/UI/AppToolBar/AppToolBar.tsx';
import LoginPage from './features/Users/LoginPage.tsx';
import RegisterPage from './features/Users/RegisterPage.tsx';

const App = () => {
  return (
    <>
      <AppToolBar />
      <Routes>
        <Route path="/" element={<div>sd</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default App;
