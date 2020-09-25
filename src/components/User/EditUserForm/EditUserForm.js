import React, { useState, useCallback } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useDropzone } from 'react-dropzone';
import es from 'date-fns/locale/es';
import { toast } from 'react-toastify';

import { API_HOST } from '../../../utils/constants';
import { Camara } from '../../../utils/Icons';
import { uploadBannerApi, uploadAvatarApi, updateInfoApi } from '../../../api/user';

import './EditUserForm.scss';

export default function EditUserForm(props) {
    const { user, setShowModal } = props;
    const [formData, setFormData] = useState(initialValue(user));
    const [bannerUrl, setBannerUrl] = useState(
        user?.banner ? `${API_HOST}/obtenerBanner?id=${user.id}` : null
    );
    const [bannerFile, setBannerFile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(
        user?.avatar ? `${API_HOST}/obtenerAvatar?id=${user.id}` : null
    );
    const [avatarFile, setAvatarFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const onDropBanner = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setBannerUrl(URL.createObjectURL(file));
        setBannerFile(file);
        //console.log(acceptedFile);
    });
    const { getRootProps: getRootBannerProps, getInputProps: getInputBannerProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop: onDropBanner
    });

    const onDropAvatar = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setAvatarUrl(URL.createObjectURL(file));
        setAvatarFile(file);
        //console.log(acceptedFile);
    });
    const { getRootProps: getRootAvatarProps, getInputProps: getInputAvatarProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop: onDropAvatar
    });


    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Editando");
        if (bannerFile) {
            await uploadBannerApi(bannerFile).catch(() => {
                toast.error("Error al Subir el Banner");
            });
        }
        if (avatarFile) {
            await uploadAvatarApi(avatarFile).catch(() => {
                toast.error("Error al Subir el Avatar");
            });
        }
        await updateInfoApi(formData)
            .then(
                setShowModal(false)
            )
            .catch(() => {
                toast.error("Error al Subir los Datos");
            });
        setLoading(false);
        window.location.reload();
    }
    return (
        <div className='edit-user-form'>
            <div
                className='banner'
                style={{ backgroundImage: `url('${bannerUrl}')` }}
                {...getRootBannerProps()}
            >
                <input {...getInputBannerProps()} />
                <Camara />
            </div>
            <div
                className='avatar'
                style={{ backgroundImage: `url('${avatarUrl}')` }}
                {...getRootAvatarProps()}
            >
                <input {...getInputAvatarProps()} />
                <Camara />
            </div>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type='text'
                                placeholder='Nombre'
                                name='nombre'
                                defaultValue={formData.nombre}
                                onChange={onChange}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type='text'
                                placeholder='Apellidos'
                                name='apellidos'
                                defaultValue={formData.apellidos}
                                onChange={onChange}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        as='textarea'
                        row='3'
                        placeholder='Agrega tu biografía'
                        name='biografia'
                        type='text'
                        defaultValue={formData.biografia}
                        onChange={onChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        placeholder='Sitio Web'
                        name='sitioWeb'
                        type='text'
                        defaultValue={formData.sitioWeb}
                        onChange={onChange}
                    />
                </Form.Group>
                <Form.Group>
                    <DatePicker
                        placeholder='Fecha de nacimiento'
                        locale={es}
                        selected={new Date(formData.fechaNacimiento)}
                        onChange={date => setFormData({ ...formData, fechaNacimiento: date })}
                    />
                </Form.Group>
                <Button className='btn-submit' type='submit' variant='primary'>
                    {loading && <Spinner animation='border' size='sm' />} Actualizar
                </Button>
            </Form>
        </div>
    );
}

function initialValue(user) {
    return {
        nombre: user.nombre ? user.nombre : "",
        apellidos: user.apellidos || "", //lo mismo que el otro
        biografia: user.biografia || "",
        ubicacion: user.ubicacion || "",
        sitioWeb: user.sitioWeb || "",
        fechaNacimiento: user.fechaNacimiento || "",
    };
}