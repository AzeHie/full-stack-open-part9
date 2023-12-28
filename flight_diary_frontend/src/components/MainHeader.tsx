import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';

const MainHeader = () => {
  return (
    <div className='main-header__container'>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='absolute'>
          <Toolbar sx={{ justifyContent: 'center ' }}>
            <Typography variant='h6' component='div' sx={{ paddingRight: 5 }}>
              <Link to='/' className='mainheader__link'>
                Flight diary
              </Link>
            </Typography>
            <Typography
              variant='h6'
              component='div'
              sx={{ paddingRight: 5, textDecoration: 'none' }}
            >
              <Link to='/addentry' className='mainheader__link'>
                New entry
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default MainHeader;
