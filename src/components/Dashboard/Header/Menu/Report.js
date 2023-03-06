import Swal from 'sweetalert2';
import moment from 'moment';

import calculatePoints from '../calculationHelper';

const START_DATE = process.env.REACT_APP_START_DATE;

export default function showReport() {
    const information = JSON.parse(localStorage.getItem('info'));
    const startWeek = moment(START_DATE).utc(true).week();
    const week = moment().utc(true).week();
    //const thisWeek = week < startWeek ? moment('2022-12-30').utc(true).week() + week : week;
    const lastWeek = week//moment('2023-01-09').week() + moment('2022-12-30').utc(true).week();

    let total = 0;
    let weeks = '';
    for (let i = startWeek; i <= lastWeek ; i++) {
        const relativeWeek = i - startWeek;
        const multiplier = moment().week(i).day(0).month() + 1;
        //const weekToCalculate = i > moment('2022-12-30').utc(true).week() ? i - moment('2022-12-30').utc(true).week() : i;

        if (relativeWeek === 29) {
            const weekPoints = calculatePoints(information, i);
            weeks += `<li>${relativeWeek + 1}ª semana: ${weekPoints} * ${multiplier} * 2 = ${weekPoints * multiplier * 2}</li>`;
            total += weekPoints * multiplier * 2;
        } else {
            const weekPoints = calculatePoints(information, i);
            weeks += `<li>${relativeWeek + 1}ª semana: ${weekPoints} * ${multiplier} = ${weekPoints * multiplier}</li>`;
            total += weekPoints * multiplier;
        }
    }

    Swal.fire({
        title: 'Relatório',
        html: '<ul>' + weeks + '</ul>' + `<br />Total: ${total}`,
    });
}