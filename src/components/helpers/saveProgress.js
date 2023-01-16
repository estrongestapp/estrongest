import moment from 'moment';
import Swal from 'sweetalert2';
import _ from 'lodash';

import { saveProgress } from '../../api';

import calculatePoints from '../Dashboard/Header/calculationHelper';

function organizeInfos() {
    const information = JSON.parse(localStorage.getItem('info'));

    const organized = {};

    for (const category in information) {
        for (const subCategory in information[category]) {
            for (const week in information[category][subCategory]) {
                if (week == moment().utc(true).week()) continue;
                if (!organized[week]) {
                    organized[week] = {};
                }
                organized[week][subCategory] = information[category][subCategory][week];
            }
        }
    }

    return organized;
}

function calculateTotalPoints() {
    const information = JSON.parse(localStorage.getItem('info'));
    const startWeek = moment('2022-06-20').utc(true).week();
    const week = moment().utc(true).week();
    const thisWeek = week < startWeek ? moment('2022-12-30').utc(true).week() + week : week;
    const lastWeek = moment('2023-01-09').week() + moment('2022-12-30').utc(true).week();

    let total = 0;
    for (let i = startWeek; i <= lastWeek ; i++) {
        const relativeWeek = i - startWeek;
        const multiplier = Math.floor(relativeWeek / 5);
        const weekToCalculate = i > moment('2022-12-30').utc(true).week() ? i - moment('2022-12-30').utc(true).week() : i;
        const weekPoints = calculatePoints(information, weekToCalculate) * (2 ** multiplier);
        
        if (relativeWeek === 29) {
            total += weekPoints * 2;
        } else {
            total += weekPoints;
        }
    }

    return total;
}

export default async function openAlert() {
    const points = calculateTotalPoints();

    const result = await Swal.fire({
        icon: 'question',
        title: 'Deseja salvar seu progresso?',
        text: `Total de pontos: ${points}`,
        confirmButtonText: 'Sim',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            const user = JSON.parse(localStorage.getItem('user'));
    
            const infos = organizeInfos();
            
            try {
                await saveProgress(infos, user);
                if (!user.isSynced) {
                    localStorage.setItem('user', JSON.stringify({ ...user, isSynced: true }));
                }
                Swal.fire('Progresso salvo!','', 'success');
            } catch(error) {
                Swal.fire(error.response.data, '', 'error');
            }
        }
    });
}