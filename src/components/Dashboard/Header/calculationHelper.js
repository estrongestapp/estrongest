/* eslint-disable */

const multipliers = {
    agua: 1,
    alimento: 1,
    exercicio: 1/32,
    banho: 1,
    estudo: 1/30,
    idioma: 5,
    leitura: 1/10,
    notas: -2,
    internet: 2,
    namoro: 10,
    reuniao: 5,
    game: 2,
    visitante: 10,
    culto: 4,
    ministerio: 3,
    tarefa: 2,
    boaAcao: 2,
};

function calculateFisico(fisico, week) {
    const agua = fisico?.agua || {};
    const alimento = fisico?.alimento || {};
    const banho = fisico?.banho || {};
    const exercicio = fisico?.exercicio || {};

    const thisWeekFisico = {
        agua: `${week}` in agua ? agua[week] : {},
        alimento: `${week}` in alimento ? alimento[week] : {},
        banho: `${week}` in banho ? banho[week] : {},
        exercicio: `${week}` in exercicio ? exercicio[week] : 0,
    };

    return calculateFisicoPoints(thisWeekFisico);
}

function calculateFisicoPoints(thisWeekFisico) {
    const { agua, alimento, banho, exercicio } = thisWeekFisico;

    let aguaPoints = Object.values(agua).filter((value) => value).length * multipliers.agua;
    let alimentoPoints = Object.values(alimento).filter((value) => value).length * multipliers.alimento;
    let banhoPoints = Object.values(banho).filter((value) => value).length * multipliers.banho;
    let exercicioPoints = exercicio * multipliers.exercicio;

    if (aguaPoints > 5) aguaPoints = 5;
    if (alimentoPoints > 5) alimentoPoints = 5;
    if (banhoPoints > 5) banhoPoints = 5;
    if (exercicioPoints > 10) exercicioPoints = 10;

    return aguaPoints + alimentoPoints + banhoPoints + Math.floor(exercicioPoints);
}

function calculateIntelectual(intelecutal, week) {
    const estudo = intelecutal?.estudo || {};
    const idioma = intelecutal?.idioma || {};
    const leitura = intelecutal?.leitura || {};
    const notas = intelecutal?.notas || {};

    const thisWeekIntelectual = {
        estudo: `${week}` in estudo ? estudo[week] : 0,
        idioma: `${week}` in idioma ? idioma[week] : false,
        leitura: `${week}` in leitura ? leitura[week] : 0,
        notas: `${week}` in notas ? notas[week] : 0,
    };

    return calculateIntelectualPoints(thisWeekIntelectual);
}

function calculateIntelectualPoints(thisWeekIntelectual) {
    const { estudo, idioma, leitura, notas } = thisWeekIntelectual;

    let estudoPoints = estudo * multipliers.estudo;
    let leituraPoints = leitura * multipliers.leitura;
    let notasPoints = notas == false ? 0 : notas.length * multipliers.notas;
    let idiomaPoints = (idioma ? 1 : 0) * multipliers.idioma;

    if (estudoPoints > 10) estudoPoints = 10;
    if (leituraPoints > 10) leituraPoints = 10;

    return Math.floor(estudoPoints) + idiomaPoints + Math.floor(leituraPoints) + notasPoints;
}

function calculateEmocional(emocional, week) {
    const internet = emocional?.internet || {};
    const namoro = emocional?.namoro || {};

    const thisWeekEmocional = {
        internet: `${week}` in internet ? internet[week] : {},
        namoro: `${week}` in namoro ? namoro[week] : null,
    };

    return calculateEmocionalPoints(thisWeekEmocional);
}

function calculateEmocionalPoints(thisWeekEmocional) {
    const { internet, namoro } = thisWeekEmocional;

    let internetPoints = 0;
    for (const minutes of Object.values(internet)) {
        let factor;

        if (minutes <= 120) {
            factor = 1;
        } else if (minutes <= 180) {
            factor = 0;
        } else {
            factor = -1;
        }

        internetPoints += factor * multipliers.internet;
    }
    let namoroPoints = (namoro || namoro === null ? 0 : 1) * multipliers.namoro;

    return internetPoints + namoroPoints;
}

function calculateEspiritual(espiritual, week) {
    const reuniao = espiritual?.reuniao || {};
    const game = espiritual?.game || {};
    const visitante = espiritual?.visitante || {};
    const culto = espiritual?.culto || {};
    const ministerio = espiritual?.ministerio || {};
    const tarefa = espiritual?.tarefa || {};
    const boaAcao = espiritual?.boaAcao || {};

    const thisWeekEspiritual = {
        reuniao: `${week}` in reuniao ? reuniao[week] : false,
        game: `${week}` in game ? game[week] : false,
        visitante: `${week}` in visitante ? visitante[week] : false,
        culto: `${week}` in culto ? culto[week] : false,
        ministerio: `${week}` in ministerio ? ministerio[week] : false,
        tarefa: `${week}` in tarefa ? tarefa[week] : {},
        boaAcao: `${week}` in boaAcao ? boaAcao[week] : 0,
    };

    return calculateEspiritualPoints(thisWeekEspiritual);
}

function calculateEspiritualPoints(thisWeekEspiritual) {
    const { reuniao, game, visitante, culto, ministerio, tarefa, boaAcao } = thisWeekEspiritual;

    let reuniaoPoints = (reuniao ? 1 : 0) * multipliers.reuniao;
    let gamePoints = (game ? 1 : 0) * multipliers.game;
    let visitantePoints = (visitante ? 1 : 0) * multipliers.visitante;
    let cultoPoints = (culto ? 1 : 0) * multipliers.culto;
    let ministerioPoints = (ministerio ? 1 : 0) * multipliers.ministerio;
    let tarefaPoints = Object.values(tarefa).filter((value) => value).length * multipliers.tarefa;
    let boaAcaoPoints = boaAcao * multipliers.boaAcao;

    if (boaAcao >= 3) boaAcaoPoints = 6;

    return reuniaoPoints + gamePoints + visitantePoints + cultoPoints + ministerioPoints + tarefaPoints + boaAcaoPoints;
}

export default function calculatePoints(information, week) {
    const fisico = information?.fisico || {};
    const intelectual = information?.intelectual || {};
    const emocional = information?.emocional || {};
    const espiritual = information?.espiritual || {};

    const fisicoPoints = calculateFisico(fisico, week);
    const intelectualPoints = calculateIntelectual(intelectual, week);
    const emocionalPoints = calculateEmocional(emocional, week);
    const espiritualPoints = calculateEspiritual(espiritual, week);

    return fisicoPoints + intelectualPoints + emocionalPoints + espiritualPoints;
}