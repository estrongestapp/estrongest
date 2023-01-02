import Swal from 'sweetalert2';
import moment from 'moment';

import calculatePoints from '../calculationHelper';

export default function showReport() {
    const information = JSON.parse(localStorage.getItem('info'));
    const startWeek = moment('2022-06-20').utc(true).week();
    const week = moment().utc(true).week();
    const thisWeek = week < startWeek ? moment('2022-12-30').utc(true).week() + week : week;

    let total = 0;
    let weeks = '';
    for (let i = startWeek; i <= thisWeek ; i++) {
        const relativeWeek = i - startWeek;
        const multiplier = 2 ** Math.floor(relativeWeek / 5);
        const weekToCalculate = i > moment('2022-12-30').utc(true).week() ? i - moment('2022-12-30').utc(true).week() : i;
        const weekPoints = calculatePoints(information, weekToCalculate);
        weeks += `<li>${relativeWeek + 1}ª semana: ${weekPoints} * ${multiplier} = ${weekPoints * multiplier}</li>`;
        total += weekPoints * multiplier;
    }

    Swal.fire({
        title: 'Relatório',
        html: '<ul>' + weeks + '</ul>' + `<br />Total: ${total}`,
    });
}