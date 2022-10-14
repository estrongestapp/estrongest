import Swal from 'sweetalert2';

import { signIn as signInRequest } from '../../../../api';

export default async function signIn(changeInformation) {
    openAlert(changeInformation);
}

async function openAlert(changeInformation) {
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

                    let serverInfos = rollback(infos || {});
                    if (isSynced) {
                        const localInfos = JSON.parse(localStorage.getItem('info')) || {};

                        for (const category of Object.keys(localInfos)) {
                            const thisCategory = localInfos[category];
                            const serverCategory = serverInfos[category] || {};

                            for (const subCategory of Object.keys(thisCategory)) {
                                const thisSubCategory = thisCategory[subCategory];
                                const serverSubCategory = serverCategory[subCategory] || {};

                                for (const week of Object.keys(thisSubCategory)) {
                                    const serverWeek = serverSubCategory[week];
                                    if (!serverWeek) {
                                        Object.defineProperty(serverSubCategory, week, {
                                            value: thisSubCategory[week],
                                            enumerable: true,
                                        });
                                    }
                                }
                            }
                        }

                        localStorage.setItem('info', JSON.stringify(serverInfos));
                    } else {
                        serverInfos = JSON.parse(localStorage.getItem('info'));
                    }

                    localStorage.setItem('user', JSON.stringify({ login, token, isSynced, nome }));
                    changeInformation(serverInfos);
                } catch (error) {
                    Swal.showValidationMessage(error?.response?.data || error);
                }
            }
        },
        confirmButtonText: 'Ok',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
    });

    return result.value;
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