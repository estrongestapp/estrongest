import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import sendTotalPoints from '../../../helpers/sendPoints';
import sendEncryptedInfo from '../../../helpers/sendInfo';
import saveProgress from '../../../helpers/saveProgress';
import signUp from './SignUp';
import signIn from './SignIn';

export default function BasicMenu() {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	function sendInfo() {
		handleClose();
		sendEncryptedInfo(localStorage.getItem('info'));
	}

	return (
		<div>
			<IconButton
				size="large"
				edge="start"
				aria-label="menu"
				sx={{ mr: 2 }}
				onClick={handleClick}
			>
				<MenuIcon sx={{ color: 'white' }} />
			</IconButton>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				{localStorage.getItem('user') ? <LoggedMenu handleClose={handleClose} /> : <NotLoggedMenu handleClose={handleClose} />}
			</Menu>
		</div>
	);
}

function NotLoggedMenu({ handleClose }) {
	function openSignUpAlert() {
		handleClose();
		signUp();
	}

	function openSignInAlert() {
		handleClose();
		signIn();
	}

	return (
		<>
			<MenuItem onClick={openSignUpAlert}>Cadastrar</MenuItem>
			<MenuItem onClick={openSignInAlert}>Entrar</MenuItem>
		</>
	);
}

function LoggedMenu({ handleClose }) {
	function openAlert() {
		handleClose();
		sendTotalPoints();
	}

	return (
		<>
			<MenuItem onClick={openAlert}>Enviar pontuação</MenuItem>
			<MenuItem onClick={saveProgress}>Enviar relatório</MenuItem>
			<MenuItem>Perfil</MenuItem>
			<MenuItem>Salvar progresso</MenuItem>
			<MenuItem>Sair</MenuItem>
		</>
	);
}