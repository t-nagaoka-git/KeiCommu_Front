import {makeStyles} from '@material-ui/core/styles';
import {useRouter} from 'next/router';
import React from 'react';
import {AuthContext} from '@/pages/_app';
import {signOut} from '@/apis/auth';
import Cookies from 'js-cookie';
import styles from './styles.module.css';
import {Button, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem} from '@material-ui/core';
import Link from 'next/link';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

function HeaderBase() {
  const router = useRouter();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {isLoggedIn, setIsLoggedIn} = React.useContext(AuthContext);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const AuthButtons = () => {
    const handleSignOut = async () => {
      try {
        const res = await signOut();

        if (res.data.success === true) {
          Cookies.remove('_access_token');
          Cookies.remove('_client');
          Cookies.remove('_uid');

          setIsLoggedIn(false);
          router.push('/login');

          console.log('Succeeded in sign out');
        } else {
          console.log('Failed in sign out');
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (isLoggedIn) {
      return (
        <MenuItem>
          <Button color="inherit" onClick={handleSignOut}>
            ログアウト
          </Button>
        </MenuItem>
      );
    } else {
      return (
        <>
          <MenuItem>
            <Link href="/login">
              <a>ログイン</a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/signup">
              <a>アカウント登録</a>
            </Link>
          </MenuItem>
        </>
      );
    }
  };

  return (
    <AppBar position="static" className={styles.module}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link href="/">
            <a>継コミュ！</a>
          </Link>
        </Typography>
        <IconButton aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          className={styles.authButtons}
          onClose={handleClose}
        >
          <AuthButtons />
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export const Header = React.memo(HeaderBase);
