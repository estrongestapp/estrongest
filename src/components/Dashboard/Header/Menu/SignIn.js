import Swal from 'sweetalert2';

import { signIn as signInRequest } from '../../../../api';

export default function signIn() {
    openAlert();
}

async function openAlert() {
    const result = await Swal.fire({
        title: 'Entrar',
        html: 
            '<input type="text" id="login" class="swal2-input" placeholder="Usuário">' +
            '<input type="password" id="senha" class="swal2-input" placeholder="Senha">',
        focusConfirm: false,
        allowOutsideClick: () => !Swal.isLoading(),
        allowEscapeKey: () => !Swal.isLoading(),
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            const login = document.getElementById('login').value;
            const senha = document.getElementById('senha').value;

            const errors = {
                login: {
                    empty: !login && 'O login não pode ser vazio!',
                },
                senha: {
                    empty: !senha && 'A senha não pode estar vazia!',
                },
            };

            const user = {
                login,
                senha,
            };

            const validate = (errors) => {
                for (const type of Object.keys(errors)) {
                    const errorType = errors[type];
                    for (const subType of Object.keys(errorType)) {
                        const message = errorType[subType];
                        if (message) {
                            return message;
                        }
                    }
                }

                return '';
            };

            const errorMessage = validate(errors);

            if (errorMessage) {
                Swal.showValidationMessage(errorMessage);
            } else {
                try {
                    const { data } = await signInRequest(user);
                    const { login, token, isSynced, nome, infos } = data;
    
                    localStorage.setItem('user', JSON.stringify({ login, token, isSynced, nome }));

                    if (isSynced) {
                        localStorage.setItem('info', JSON.stringify(rollback(infos)));
                    }
    
                    return;
                } catch (error) {
                    Swal.showValidationMessage(error.response.data);
                }
            }
        },
        confirmButtonText: 'Ok',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
    });
}

function rollback(infos) {
	const categories = {
		exercicio: {},
		alimento: {},
		agua: {},
		estudo: {},
		leitura: {},
		notas: {},
		internet: {},
		namoro: {},
		reuniao: {},
		game: {},
		culto: {},
		ministerio: {},
		live: {},
		tarefa: {},
		boaAcao: {},
	};

	for (const week of Object.keys(infos)) {
		const weekInfo = infos[week];
		for (const category of Object.keys(weekInfo)) {
			if (weekInfo[category]) {
				categories[category][week] = weekInfo[category];
			}
		}
	}

	const {
		exercicio,
		alimento,
		agua,
		estudo,
		leitura,
		notas,
		internet,
		namoro,
		reuniao,
		game,
		culto,
		ministerio,
		live,
		tarefa,
		boaAcao,
	} = categories;

	const oldInfos = {
		fisico: {
			exercicio,
			alimento,
			agua,
		},
		intelectual: {
			estudo,
			leitura,
			notas,
		},
		emocional: {
			internet,
			namoro,
		},
		espiritual: {
			reuniao,
			game,
			culto,
			ministerio,
			live,
			tarefa,
			boaAcao,
		},
	};

	return oldInfos;
}