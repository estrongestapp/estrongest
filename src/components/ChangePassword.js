import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import { changePassword as changePasswordRequest } from '../api';

import { Box, TextField, Button } from '@mui/material';

export default function ChangePassword() {
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [params] = useSearchParams();

    async function saveNewPassword() {
        const errors = {
            senha: {
                empty: !newPassword && 'A senha não pode estar vazia!',
                short: newPassword.length < 4 && 'A senha deve ter pelo menos 4 caracteres!',
                long: newPassword.length > 10 && 'A senha não pode ter mais que 10 caracteres!',
            },
            repetirSenha: {
                empty: !repeatNewPassword && 'Você precisa repetir a senha!',
                invalid: newPassword !== repeatNewPassword && 'As senhas precisam ser iguais!',
            }
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
            Swal.fire(
                'Erro!',
                errorMessage,
                'error'
            );;
        } else {
            try {
                await changePasswordRequest(newPassword, params.get('token'));
    
                Swal.fire(
                    'Sucesso',
                    'Senha alterada com sucesso!',
                    'success'
                );
            } catch (error) {
                Swal.fire(
                    'Erro!',
                    error?.response?.data || error,
                    'error'
                );
            }
        }
    }

    return (
        <Box
            component='form'
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '20px'
            }}
        >
            <TextField
                id="outlined-basic"
                type='password'
                label="Nova senha"
                variant="outlined"
                onChange={(event) => setNewPassword(event.target.value)}
            />
            <TextField
                id="outlined-basic"
                type='password'
                label="Repetir nova senha"
                variant="outlined"
                onChange={(event) => setRepeatNewPassword(event.target.value)}
            />
            <Button onClick={saveNewPassword} variant='contained'>
                Salvar
            </Button>
        </Box>
    );
}