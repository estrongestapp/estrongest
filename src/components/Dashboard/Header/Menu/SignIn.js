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
                    const response = await signInRequest(user);

                    console.log(response.data);
    
                    localStorage.setItem('user', JSON.stringify(response.data));
    
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