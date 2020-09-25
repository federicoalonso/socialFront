import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome, faUser, faUsers, faPowerOff
} from '@fortawesome/free-solid-svg-icons';
import TweetModal from '../Modal/TweetModal';
import LogoWhite from '../../assets/png/logo-white.png';
import { logoutApi } from "../../api/auth";
import useAuth from "../../hooks/useAuth";

import "./LeftMenu.scss";

export default function LeftMenu(props) {
    const { setRefreshChckLogin } = props;
    const [showModal, setShowModal] = useState(false);
    const user = useAuth();

    const logout = () => {
        logoutApi();
        setRefreshChckLogin(true);
    }
    return (
        <div className='left-menu'>
            <img className="logo" src={LogoWhite} alt='logo' />
            <Link to="/"><FontAwesomeIcon icon={faHome} />Inicio</Link>
            <Link to="/users"><FontAwesomeIcon icon={faUsers} />Usuarios</Link>
            <Link to={`/${user?._id}`}><FontAwesomeIcon icon={faUser} />Perfil</Link>
            <Link to="" onClick={logout}><FontAwesomeIcon icon={faPowerOff} />Cerrar Sesión</Link>

            <Button onClick={()=>setShowModal(true)}>Twittear</Button>
            <TweetModal
                show={showModal}
                setShow={setShowModal}
            ></TweetModal>
        </div>
    )
}
