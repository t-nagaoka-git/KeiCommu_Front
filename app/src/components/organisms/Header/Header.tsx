import {makeStyles, Theme} from '@material-ui/core/styles';
import {useRouter} from 'next/router';
import React from 'react';
import {AuthContext} from '@/pages/_app';
import {signOut} from '@/apis/auth';
import Cookies from 'js-cookie';
import styles from './styles.module.css';
import {AppBar, Toolbar, Typography, IconButton, Menu, MenuItem} from '@material-ui/core';
import Link from 'next/link';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    maxWidth: 500,
    width: '100%',
  },
  title: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
}));

function HeaderBase() {
  const router = useRouter();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {isLoggedIn, setIsLoggedIn, currentUser} = React.useContext(AuthContext);
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

          setAnchorEl(null);
          setIsLoggedIn(false);

          router.push('/login');
        } else {
          console.log('Failed in sign out');
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (isLoggedIn && currentUser) {
      return (
        <>
          <Link href={`/users/${currentUser.id}`}>
            <a>
              <MenuItem onClick={handleClose}>プロフィール</MenuItem>
            </a>
          </Link>
          <MenuItem onClick={handleSignOut}>ログアウト</MenuItem>
        </>
      );
    } else {
      return (
        <>
          <Link href="/login">
            <a>
              <MenuItem onClick={handleClose}>ログイン</MenuItem>
            </a>
          </Link>
          <Link href="/signup">
            <a>
              <MenuItem onClick={handleClose}>アカウント登録</MenuItem>
            </a>
          </Link>
        </>
      );
    }
  };

  return (
    <>
      <AppBar position="fixed" className={styles.module}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            <Link href="/">
              <a>継コミュ！</a>
            </Link>
          </Typography>
          <IconButton color="inherit">
            <Link href="/">
              <a>
                <HomeIcon />
              </a>
            </Link>
          </IconButton>
          <IconButton color="inherit">
            <Link href="/teams">
              <a>
                <GroupIcon />
              </a>
            </Link>
          </IconButton>
          <IconButton color="inherit">
            <Link href="/search">
              <a>
                <SearchIcon />
              </a>
            </Link>
          </IconButton>
          <IconButton aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
            <a>
              <AccountCircleIcon />
            </a>
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
      <div className={classes.offset} />
    </>
  );
}

export const Header = React.memo(HeaderBase);
