import moment from "moment";

const week = moment().utc(true).week();

const multipliers = {
    agua: 1,
    alimento: 1,
    exercicio: 1/18,
    refri: -2,
};

function calculateFisico(fisico) {
    const agua = fisico?.agua || {};
    const alimento = fisico?.alimento || {};
    const exercicio = fisico?.exercicio || {};
    const refri = fisico?.refri || {};

    const thisWeekFisico = {
        agua: `${week}` in agua ? agua[week] : {},
        alimento: `${week}` in alimento ? alimento[week] : {},
        exercicio: `${week}` in exercicio ? exercicio[week] : 0,
        refri: `${week}` in refri ? refri[week] : 0,
    }

    return calculateFisicoPoints(thisWeekFisico);
}

function calculateFisicoPoints(thisWeekFisico) {
    const { agua, alimento, exercicio, refri } = thisWeekFisico;

    let aguaPoints = Object.values(agua).filter((value) => value).length * multipliers.agua;
    let alimentoPoints = Object.values(alimento).filter((value) => value).length * multipliers.alimento;
    let exercicioPoints = exercicio * multipliers.exercicio;
    let refriPoints = refri > 3 ? (refri - 3) * multipliers.refri : 0;

    if (aguaPoints > 5) aguaPoints = 5;
    if (alimentoPoints > 5) alimentoPoints = 5;
    if (exercicioPoints > 10) exercicioPoints = 10;

    return aguaPoints + alimentoPoints + Math.round(exercicioPoints) + refriPoints;
}

export default {
    fisico: calculateFisico,
};