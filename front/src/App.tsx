import { Route, Routes } from 'react-router-dom';
import AppToolBar from './components/UI/AppToolBar/AppToolBar.tsx';
import LoginPage from './features/Users/LoginPage.tsx';
import RegisterPage from './features/Users/RegisterPage.tsx';
import Galleries from './features/Galleries/Galleries.tsx';
import AddGallery from './features/Galleries/AddGallery.tsx';

const App = () => {
  return (
    <>
      <AppToolBar />
      <Routes>
        <Route path="/" element={<Galleries />} />
        <Route path="/addGallery" element={<AddGallery />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default App;
