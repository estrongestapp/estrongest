import moment from 'moment';
import Swal from 'sweetalert2';

import calculatePoints from '../Dashboard/Header/calculationHelper';

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

export default function openAlert() {
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