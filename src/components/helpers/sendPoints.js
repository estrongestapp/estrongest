import moment from 'moment';
import Swal from 'sweetalert2';

import calculatePoints from '../Dashboard/Header/calculationHelper';

function sendPoints (name, points) {
    const number = process.env.REACT_APP_NUMERO_CELULAR;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(`${name}: ${points}`)}`);
}

export default function calculateTotalPoints() {
    const information = JSON.parse(localStorage.getItem('info'));
    const startWeek = moment('2022-06-20').utc(true).week();
    const thisWeek = moment().utc(true).week();

    let total = 0;
    for (let i = startWeek; i <= thisWeek ; i++) {
        const relativeWeek = i - startWeek;
        const multiplier = Math.floor(relativeWeek / 5);
        const weekPoints = calculatePoints(information, i) * (2 ** multiplier);
        total += weekPoints;
    }

    return total;
}

/*export default function openAlert() {
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
}*/