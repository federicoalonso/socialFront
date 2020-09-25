import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import className from 'classnames';
import { toast } from 'react-toastify';
import { Close } from '../../../utils/Icons';
import { postTweetApi } from '../../../api/tweets';

import './TweetModal.scss';

export default function TweetModal(props) {
    const { show, setShow } = props;

    const [message, setMessage] = useState("");

    const maxLength = 280;

    const onSubmit = e => {
        e.preventDefault();

        if (message.length > 0 && message.length <= maxLength) {
            postTweetApi(message)
                .then(response => {
                    if (response?.code >= 200 && response?.code < 300) {
                        toast.success(response.message);
                        setShow(false);
                        window.location.reload();
                    } else {
                        toast.warning(response.message);
                    }
                })
                .catch(() => {
                    toast.warning("Error al enviar el tweet, intente nuevamente más tarde.");
                });
        } else {
            toast.warning("Se deben ingresar datos correctos.");
        }
    }

    return (
        <Modal
            className='tweet-modal'
            show={show}
            onHide={() => setShow(false)}
            centered
            size='lg'
        >
            <Modal.Header>
                <Modal.Title>
                    <Close onClick={() => setShow(false)} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Control
                        as='textarea'
                        rows='6'
                        type='text'
                        placeholder="Qué estas Pensando??"
                        onChange={e => setMessage(e.target.value)}
                    />
                    <span className={className('cont', { error: message.length > maxLength })}>
                        {message.length}
                    </span>
                    <Button type='submit' disabled={message.length > maxLength || message.length < 1 ? true : false}>Tweet</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
