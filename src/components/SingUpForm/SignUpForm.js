import React, { useState } from 'react';
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { values, size, isNull } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validation";
import { signUpApi } from '../../api/auth';

import "./SignUpForm.scss";


export default function SignUpForm(props) {
    const { setShowModal } = props;
    const [formData, setFormData] = useState(initialFormValues());
    const [signUpLoading, setSignUpLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        let validCount = 0;
        values(formData).some(value => {
            value && validCount++
            return null
        });

        if (validCount !== size(formData)) {
            toast.warning("Completa todos los Campos del Formulario");
        } else {
            if (!isEmailValid(formData.email)) {
                toast.warning("Email inválido");
            } else if (formData.password !== formData.repeatPassword) {
                toast.warning("Las Contraseñas deben ser iguales");
            } else if (size(formData.password) < 6) {
                toast.warning("La Contraseña deben tener al menos 6 caracteres");
            } else {
                setSignUpLoading(true);
                signUpApi(formData).then(response => {
                    if (response.code) {
                        toast.warn(response.message);
                    }else{
                        toast.success("Registro Correcto");
                        setShowModal(false);
                        setFormData(initialFormValues());
                    }
                }).catch(() => {
                    toast.error("Error del servidor, vuelva a intentarlo luego.")
                }).finally(() => {
                    setSignUpLoading(false);
                });
            }
        }

    };

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div className="sign-up-form" >
            <h2>Crea tu cuenta</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type='text'
                                placeholder='Nombre'
                                defaultValue={formData.nombre}
                                name='nombre'
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type='text'
                                placeholder='Apellidos'
                                defaultValue={formData.apellidos}
                                name='apellidos'
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='email'
                        placeholder='Correo Electrónico'
                        defaultValue={formData.email}
                        name='email'
                    />
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type='password'
                                placeholder='Contraseña'
                                defaultValue={formData.password}
                                name='password'
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type='password'
                                placeholder='Repetir Contraseña'
                                defaultValue={formData.repeatPassword}
                                name='repeatPassword'
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {!signUpLoading ? "Regístrate" : <Spinner animation='border' />}
                    
                </Button>
            </Form>
        </div>
    );
}


function initialFormValues() {
    return {
        nombre: "",
        apellidos: '',
        email: '',
        password: '',
        repeatPassword: '',
    }
}