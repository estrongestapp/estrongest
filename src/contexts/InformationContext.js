import { createContext } from 'react';

const InformationContext = createContext();

export default InformationContext;

/*
    {
        fisico: {
            exercicio: number,
            alimento: {
                'dia': boolean,
            },
            refri: number,
            agua: {
                'dia': boolean,
            },
        },
        intelectual: {
            estudo: number,
            leitura: number,
            notas: [
                {
                    materia: string,
                    nota: number,
                }
            ]
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