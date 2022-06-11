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
                'dia': number,
            },
            namoro: boolean,
        },
        espiritual: {
            reuniao: boolean,
            game: boolean,
            culto: boolean,
            ministerio: boolean,
            live: boolean,
            
        },
    };
*/