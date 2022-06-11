import { createContext } from 'react';

const InformationContext = createContext();

export default InformationContext;

/*
    {
        fisico: {
            exercico: {
                'semana': number,
            }
            alimento: {
                'semana': {
                    'dia': boolean,
                },
            },
            refri: {
                'semana': number,
            }
            agua: {
                'semana': {
                    'dia': boolean,
                },
            },
        },
        intelectual: {
            estudo: {
                'semana': number,
            },
            leitura: {
                'semana': number,
            },
            notas: {
                'semana': [
                    {
                        materia: string,
                        nota: number,
                    }
                ]
            }
        },
        emocional: {
            internet: {
                'semana': {
                    'dia': number,
                },
            },
            namoro: {
                'semana': boolean,
            },
        },
        espiritual: {
            reuniao: {
                'semana': boolean,
            },
            game: {
                'semana': boolean,
            },
            culto: {
                'semana': boolean,
            },
            ministerio: {
                'semana': boolean,
            },
            live: {
                'semana': boolean,
            },
            leitura: {
                'semana': {
                    'dia': boolean,
                },
            },
            boaAcao: {
                'semana': number,
            },
        },
    };
*/