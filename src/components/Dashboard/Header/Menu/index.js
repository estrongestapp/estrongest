import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import sendTotalPoints from '../../../helpers/sendPoints';

export default function BasicMenu() {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	function openAlert() {
		handleClose();
		sendTotalPoints();
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
				<MenuItem onClick={openAlert}>Enviar pontuação</MenuItem>
			</Menu>
		</div>
	);
}