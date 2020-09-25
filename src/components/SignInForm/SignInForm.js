import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { values, size } from 'lodash';
import { toast } from 'react-toastify';
import { isEmailValid } from "../../utils/validation";
import { signInApi, setTokenApi } from '../../api/auth';

import "./SignInForm.scss";

export default function SignInForm(props) {
    const { setShowModal, setRefreshChckLogin } = props;
    const [formData, setFormData] = useState(initilFormValue());
    const [signInLoading, setSignInLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        let validCount =0;
        values(formData).some(value => {
            value && validCount++
            return null;
        });

        if (validCount !== size(formData)) {
            toast.warning("Completa todos los Campos del Formulario");
        } else {
            if (!isEmailValid(formData.email)) {
                toast.warning("Email inválido");
            } else {
                setSignInLoading(true);
                signInApi(formData).then(response => {
                    if (response.code) {
                        toast.warn(response.message);
                    }else{
                        toast.success("Registro Correcto");
                        setTokenApi(response.token);
                        setShowModal(false);
                        setFormData(initilFormValue());
                        setRefreshChckLogin(true);
                    }
                }).catch(() => {
                    toast.error("Error del servidor, vuelva a intentarlo luego.")
                }).finally(() => {
                    setSignInLoading(false);
                });
            }
        }
    };

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className='sign-in-form'>
            <h2>Ingreso</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Form.Control 
                    type='email' 
                    placeholder='Correo Electrónico' 
                    defaultValue={formData.email}
                    name='email'
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                    type='password' 
                    placeholder='Contraseña' 
                    defaultValue={formData.password}
                    name='password'
                    />
                </Form.Group>
                <Button variant='primary' type='submit'>
                {!signInLoading ? "Iniciar Sesión" : <Spinner animation='border' />}
                </Button>
            </Form>
        </div>
    );
}

function initilFormValue() {
    return {
        email: '',
        password: ''
    };
}