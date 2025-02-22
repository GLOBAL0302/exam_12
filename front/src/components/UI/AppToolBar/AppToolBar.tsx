import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';
import AnonymousMenu from './AnonymousMenu.tsx';
import { useNavigate } from 'react-router-dom';

import { selectUser } from '../../../features/Users/usersSlice.ts';
import UserMenu from './UserMenu.tsx';
import { useAppSelector } from '../../../store/hooks.ts';

const AppToolBar = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate('/');
  };
  return (
    <Box
      sx={{
        height: '80px',
        flexGrow: 1,
        marginBottom: 3,
      }}
    >
      <AppBar position="static">
        <Toolbar sx={{ background: 'black' }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
            <CollectionsIcon />
          </IconButton>
          <Typography onClick={goToMainPage} variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
            Gallery
          </Typography>
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolBar;
