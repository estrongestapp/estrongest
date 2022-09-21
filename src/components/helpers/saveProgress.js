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

    let total = 0;
    for (let i = moment('2022-06-20').utc(true).week(); i <= moment().utc(true).week(); i++) {
        const weekPoints = calculatePoints(information, i);
        total += weekPoints;
    }

    return total;
}

export default async function openAlert() {
    const points = calculateTotalPoints();

    const result = await Swal.fire({
        icon: 'question',
        title: 'Deseja salvar seu prgoresso?',
        text: `Total de pontos: ${points}`,
        confirmButtonText: 'Sim',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
        const user = JSON.parse(localStorage.getItem('user'));

        const infos = organizeInfos();

        await saveProgress(infos, user);

        if (!user.isSynced) {
            localStorage.setItem('user', JSON.stringify({ ...user, isSynced: true }));
        }
    }
}