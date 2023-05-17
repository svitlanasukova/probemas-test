import {
	AppBar,
	Toolbar,
	Button,
	IconButton,
	Drawer,
	Link,
	MenuItem,
	Container,
	Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from 'react';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import CurrencySelect from './CurrencySelect';
import CloseIcon from '@mui/icons-material/Close';

const headerMenu = [
	{
		label: 'OSRS Gold',
		href: '/osrs-gold',
	},
	{
		label: 'RS3 Gold',
		href: '/rs3-gold',
	},
	{
		label: 'Sell RS Gold',
		href: '/sell-rs-gold',
	},
	{
		label: 'OSRS Items',
		href: '/osrs-items',
	},
	{
		label: 'OSRS Accounts',
		href: '/osrs-accounts',
	},
	{
		label: 'Reward Chests',
		href: '/reward-chests',
	},
];

export default function Header() {
	const [state, setState] = useState({
		mobileView: false,
		drawerOpen: false,
	});

	const { mobileView, drawerOpen } = state;

	useEffect(() => {
		const setResponsiveness = () => {
			return window.innerWidth < 1100
				? setState(prevState => ({ ...prevState, mobileView: true }))
				: setState(prevState => ({ ...prevState, mobileView: false }));
		};

		setResponsiveness();

		window.addEventListener('resize', () => setResponsiveness());

		return () => {
			window.removeEventListener('resize', () => setResponsiveness());
		};
	}, []);

	const displayDesktop = () => {
		return (
			<Container>
				<Toolbar sx={{ padding: '0!important' }}>
					<div style={{ marginRight: '24px' }}>{probemasLogo}</div>
					<div>{getMenuButtons()}</div>
					<CurrencySelect />
					<Button
						{...{
							to: '/login',
							color: 'inherit',
							component: RouterLink,
							variant: 'text',
							sx: {
								'&::before': {
									display: 'none',
								},
							},
						}}
					>
						Sign Up
					</Button>
					<Button
						{...{
							to: '/login',
							component: RouterLink,
							variant: 'contained',
						}}
					>
						Login
					</Button>
				</Toolbar>
			</Container>
		);
	};

	const displayMobile = () => {
		const handleDrawerOpen = () =>
			setState(prevState => ({ ...prevState, drawerOpen: true }));
		const handleDrawerClose = () =>
			setState(prevState => ({ ...prevState, drawerOpen: false }));

		return (
			<Toolbar>
				<IconButton
					{...{
						edge: 'start',
						color: 'inherit',
						'aria-label': 'menu',
						'aria-haspopup': 'true',
						onClick: handleDrawerOpen,
					}}
				>
					<MenuIcon />
				</IconButton>

				<Drawer
					{...{
						anchor: 'left',
						open: drawerOpen,
						onClose: handleDrawerClose,
					}}
				>
					<CloseIcon onClick={handleDrawerClose} />
					<div>{getDrawerChoices()}</div>
					<CurrencySelect />
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: '1rem',
						}}
					>
						<Button
							{...{
								to: '/signup',
								component: RouterLink,
								variant: 'outlined',
							}}
						>
							Sign Up
						</Button>
						<Button
							{...{
								to: '/login',
								component: RouterLink,
								variant: 'contained',
							}}
						>
							Login
						</Button>
					</Box>
				</Drawer>

				<div style={{ margin: '0 auto' }}>{probemasLogo}</div>
				<Button
					{...{
						to: '/login',
						component: RouterLink,
						variant: 'contained',
					}}
				>
					Login
				</Button>
			</Toolbar>
		);
	};

	const getDrawerChoices = () => {
		return headerMenu.map(({ label, href }) => {
			return (
				<Link
					{...{
						component: RouterLink,
						to: href,
						color: 'inherit',
						style: { textDecoration: 'none' },
						key: label,
					}}
				>
					<MenuItem>{label}</MenuItem>
				</Link>
			);
		});
	};

	const probemasLogo = (
		<NavLink
			to='/'
			style={{
				maxWidth: '110px',
				height: 'auto',
				display: 'flex',
			}}
		>
			<img src={logo} />
		</NavLink>
	);

	const getMenuButtons = () => {
		return headerMenu.map(({ label, href }) => {
			return (
				<Button
					{...{
						key: label,
						color: 'inherit',
						to: href,
						component: RouterLink,
						variant: 'text',
					}}
				>
					{label}
				</Button>
			);
		});
	};

	return <AppBar>{mobileView ? displayMobile() : displayDesktop()}</AppBar>;
}
