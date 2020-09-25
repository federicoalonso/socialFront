import React from 'react';
import { Modal } from "react-bootstrap";
import LogoWhite from "../../../assets/png/logo-white.png";

import "./BasicModal.scss";

export default function BasicModal(props) {
    const { show, setShow, children } = props;

    return (
        <Modal
            className="basic-modal"
            show={show}
            centered
            size="lg"
            onHide={() => setShow(false)}
        >
            <Modal.Header>
                <Modal.Title>
                    <img src={LogoWhite} alt="twiter" />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
}
