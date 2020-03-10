import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAccount } from 'gql'
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
  useMediaQuery,
  Box,
  Container,
  Typography,
  Divider,
} from '@material-ui/core'
import logoImg from 'img/logo.svg'
import { Navigation } from './navigation'
import freeKassaImg from 'img/free-kassa.svg'
import clsx from 'clsx'
// import { AuthSocial } from 'view/auth/auth-social'
import { LoginButton } from 'view/auth/login-button'

export function Footer() {
  const { account } = useAccount()
  const history = useHistory()
  const theme = useTheme()
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))
  // const down650px = useMediaQuery('(max-width: 650px)')
  const c = useStyles({ isLoggedIn: !!account })

  const FreeKassaBanner = () => (
    <a href='https://www.free-kassa.ru' target='_blank' rel='noopener noreferrer'>
      <img src={freeKassaImg} alt='We accept FREE-KASSA' />
    </a>
  )

  return (
    <>
      <Container className={clsx(c.container, c.top)}>
        <Box className={c.logo} onClick={() => history.push('/')}>
          <img src={logoImg} className={c.logoIcon} alt='Logo' />
          <Typography className={c.logoText}>Кнопка</Typography>
        </Box>

        {account && (
          <Box className={c.navigation}>
            <Navigation color='secondary' vertical={xsDown} />
          </Box>
        )}

        {account && <FreeKassaBanner />}
        {/* {!accountData && !down650px && (
          <Box display='flex' alignItems='center'>
            <Typography variant='body2' color='textSecondary'>
              Войти через
            </Typography>
            <Box pl={3} />
            <AuthSocial />
          </Box>
        )} */}
        {!account && <LoginButton style={{ borderRadius: 24 }} text='Личный Кабинет' />}
      </Container>

      <Container className={c.container} style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Divider />
      </Container>

      <Container className={clsx(c.container, c.bot)}>
        <Typography color='textSecondary' variant='body2' className={c.copyright}>
          Copyright © 2020 knopka.money
        </Typography>

        {!account && <FreeKassaBanner />}
      </Container>
    </>
  )
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        background: theme.palette.grey[100],
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
    },
    top: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      borderTop: `1px solid ${theme.palette.divider}`,
      [theme.breakpoints.up('md')]: {
        borderWidth: 2,
      },
    },
    navigation: {
      marginRight: theme.spacing(-2),
      '@media (max-width: 740px)': {
        order: 1,
        width: '100%',
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(3),
        paddingTop: theme.spacing(3),
      },
      [theme.breakpoints.down('xs')]: {
        paddingTop: 0,
      },
    },
    bot: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: ({ isLoggedIn }: any) => (isLoggedIn ? 'center' : 'space-between'),
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
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
    copyright: {
      [theme.breakpoints.down('xs')]: {
        fontSize: 15,
      },
    },
  })
)
