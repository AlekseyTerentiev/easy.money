import React from 'react';
import { useHistory } from 'react-router-dom';
import { GetAccount_account } from 'gql/types/GetAccount';
import { useAccount, useBalance } from 'gql';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Container,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Hidden,
  Avatar,
  Popover,
  Divider,
} from '@material-ui/core';
import { Balances } from 'components/billing/balances';
import logoImg from 'img/logo.svg';
import { Navigation } from './navigation';
import { LoginButton } from 'components/auth/login-button';
import { LogoutButton } from 'components/auth/logout-button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Route } from 'react-router-dom';

export function AppBar() {
  const history = useHistory();
  const { account } = useAccount();
  const { balance } = useBalance('RUB');

  const c = useStyles();

  return (
    <>
      <Container className={c.container}>
        <MuiAppBar className={c.root} position='static'>
          <Toolbar disableGutters>
            <Box className={c.logo} onClick={() => history.push('/')}>
              <img src={logoImg} className={c.logoIcon} alt='Logo' />
              <Typography className={c.logoText}>Кнопка</Typography>
            </Box>

            {account && (
              <Hidden smDown>
                <Navigation />
              </Hidden>
            )}

            <Box ml='auto' />

            {account && (
              <Box
                onClick={() => history.push('/refill')}
                display='flex'
                alignItems='center'
                style={{ cursor: 'pointer' }}
              >
                <Typography variant='body2'>
                  <Balances className={c.balances} />
                </Typography>
              </Box>
            )}

            {account ? (
              <AppBarAccount account={account} />
            ) : (
              <LoginButton style={{ borderRadius: 24 }} text='Личный Кабинет' />
            )}
          </Toolbar>
        </MuiAppBar>
      </Container>

      {account && (
        <Hidden mdUp>
          <Container className={c.container}>
            <Navigation />
          </Container>
        </Hidden>
      )}

      <Route path='/' exact>
        {balance === 0 && (
          <Container className={c.container}>
            <Box className={c.alert}>
              <Typography display='inline' variant='caption'>
                Сперва необходимо
              </Typography>{' '}
              <Link to={`/refill`} component={RouterLink} variant='caption' noWrap>
                пополнить баланс
              </Link>
            </Box>
          </Container>
        )}
      </Route>
    </>
  );
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.primary,
      background: '#fff',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('lg')]: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
    },
    container: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        borderWidth: 2,
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
      },
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(5),
      },
    },
    logoIcon: {
      width: '3.5vw',
      minWidth: 32,
      maxWidth: 48,
      marginRight: theme.spacing(1.2),
    },
    logoText: {
      fontWeight: 'bold',
      fontSize: 14,
      [theme.breakpoints.up('sm')]: {
        fontSize: 18,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: 22,
      },
    },
    balances: {
      marginRight: theme.spacing(1.8),
      [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(2),
      },
      fontWeight: 'normal',
    },
    alert: {
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },
      [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
      },
    },
  })
);

export interface AppBarAccountProps {
  account: GetAccount_account;
}

export const AppBarAccount: React.FC<AppBarAccountProps> = ({ account }) => {
  const c = useAppBarAccountStyles();

  const [popoverAnchorEl, setPopoverAnchorEl] = React.useState<null | HTMLElement>(null);
  const popoverIsOpen = Boolean(popoverAnchorEl);
  function handleAccountPopupOpen(event: React.MouseEvent<HTMLElement>) {
    setPopoverAnchorEl(event.currentTarget);
  }
  function handlePopupClose() {
    setPopoverAnchorEl(null);
  }

  return (
    <>
      <Avatar
        alt={account.displayName || ''}
        src={account.picture || undefined}
        classes={{
          root: c.avatarRoot,
          img: c.avatarImg,
        }}
        onClick={handleAccountPopupOpen}
        aria-controls='account-popup'
        aria-haspopup='true'
      />
      <Popover
        id='account-popup'
        anchorEl={popoverAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
        open={popoverIsOpen}
        onClose={handlePopupClose}
      >
        <Box p={3}>
          <Typography align='center'>{account.displayName}</Typography>
          <Box my={2}>
            <Divider />
          </Box>
          <LogoutButton onClick={handlePopupClose} />
        </Box>
      </Popover>
    </>
  );
};

export const useAppBarAccountStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatarRoot: {
      width: '3.5vw',
      height: '3.5vw',
      minWidth: 32,
      minHeight: 32,
      maxWidth: 48,
      maxHeight: 48,
    },
    avatarImg: {
      background: 'none',
    },
  })
);
