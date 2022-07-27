import { useState } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import calculatePoints from '../calculationHelper';

export default function BasicMenu() {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	function sendPoints (name, points) {
		const number = process.env.REACT_APP_NUMERO_CELULAR;
		window.open(`https://wa.me/${number}?text=${encodeURIComponent(`${name}: ${points}`)}`);
	}

	function calculateTotalPoints() {
		const information = JSON.parse(localStorage.getItem('info'));

		let total = 0;
		for (let i = moment('2022-06-20').utc(true).week(); i <= moment().utc(true).week(); i++) {
			const weekPoints = calculatePoints(information, i);
			total += weekPoints;
		}

		return total;
	}

	function openAlert() {
		handleClose();
		const points = calculateTotalPoints();

		Swal.fire({
			icon: 'question',
			title: 'Deseja enviar seus pontos?',
			text: `Total de pontos: ${points}`,
			confirmButtonText: 'Sim',
			showCancelButton: true,
			cancelButtonText: 'Cancelar',
		}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire({
			title: 'Digite seu nome:',
			input: 'text',
			inputValue: localStorage.getItem('nome'),
			confirmButtonText: 'Enviar',
			showCancelButton: true,
			cancelButtonText: 'Cancelar',
			}).then((result) => {
			if (result.isConfirmed) {
				localStorage.setItem('nome', result.value);
				sendPoints(result.value, points);
			}
			});
		}
		});
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