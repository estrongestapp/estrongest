import Swal from 'sweetalert2';

import { signUp as signUpRequest } from '../../../../api';

export default function signUp() {
    openAlert();
}

async function openAlert() {
    const result = await Swal.fire({
        title: 'Cadastrar-se',
        html: 
            '<input type="text" id="login" class="swal2-input" placeholder="Usuário">' +
            '<input type="text" id="nome" class="swal2-input" placeholder="Nome completo">' +
            '<input type="password" id="senha" class="swal2-input" placeholder="Senha">' +
            '<input type="password" id="repetir-senha" class="swal2-input" placeholder="Repetir senha">',
        focusConfirm: false,
        allowOutsideClick: () => !Swal.isLoading(),
        allowEscapeKey: () => !Swal.isLoading(),
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            const login = document.getElementById('login').value;
            const nome = document.getElementById('nome').value;
            const senha = document.getElementById('senha').value;
            const repetirSenha = document.getElementById('repetir-senha').value;

            const errors = {
                login: {
                    empty: !login && 'O login não pode ser vazio!',
                    short: login.length < 3 && 'O nome de usuário deve ter pelo menos 3 caracteres!',
                    long: login.length > 20 && 'O nome de usuário não pode ter mais que 20 caracteres!',
                },
                nome: {
                    empty: !nome && 'O nome não pode estar vazio!',
                    short: nome.length < 3 && 'O nome precisa ter pelo menos 3 letras!',
                },
                senha: {
                    empty: !senha && 'A senha não pode estar vazia!',
                    short: senha.length < 4 && 'A senha deve ter pelo menos 4 caracteres!',
                    long: senha.length > 10 && 'A senha não pode ter mais que 10 caracteres!',
                },
                repetirSenha: {
                    empty: !repetirSenha && 'Você precisa repetir a senha!',
                    invalid: senha !== repetirSenha && 'As senhas precisam ser iguais!',
                }
            };

            const user = {
                login,
                nome,
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
                    await signUpRequest(user);
    
                    await Swal.fire({
                        icon: 'success',
                        title: 'Cadastrado!',
                    });
    
                    return {
                        login,
                        nome
                    };
                } catch (error) {
                    Swal.showValidationMessage(error.response.data);
                }
            }
        },
        confirmButtonText: 'Ok',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
    });

    return result.value;
}