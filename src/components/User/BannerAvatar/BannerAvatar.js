import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import AvatarNotFound from '../../../assets/png/avatar-no-found.png';
import { API_HOST } from '../../../utils/constants';
import ConfigModal from '../../Modal/ConfigModal';
import EditUserForm from '../../User/EditUserForm';
import { checkFollowApi, followUserApi, unFollowUserApi } from '../../../api/follow';

import "./BannerAvatar.scss";

export default function BannerAvatar(props) {
    const { user, loggedUsser } = props;
    const [showModal, setShowModal] = useState(false);
    const bannerURL = user?.banner ? `${API_HOST}/obtenerBanner?id=${user.id}` : null;
    const avatarURL = user?.avatar ? `${API_HOST}/obtenerAvatar?id=${user.id}` : AvatarNotFound;
    const [following, setFollowing] = useState(null);
    const [reloadFollow, setReloadFollow] = useState(false);
    useEffect(() => {
        if (user){
            checkFollowApi(user?.id).then(response => {
                if(response?.status){
                    setFollowing(true);
                }else{
                    setFollowing(false);
                }
            })
            setReloadFollow(false);
        }
    }, [user, reloadFollow]);

    const startFollow = () => {
        followUserApi(user.id).then(()=>{
            setReloadFollow(true);
        });
    };
    const endFollow = () => {
        unFollowUserApi(user.id).then(()=>{
            setReloadFollow(true);
        });
    };
    return (
        <div className='banner-avatar' style={{ backgroundImage: `url('${bannerURL}')` }}>
            <div className='avatar' style={{ backgroundImage: `url('${avatarURL}')` }}></div>
            {user && (
                <div className='options'>
                    {loggedUsser._id === user.id && <Button onClick={() => setShowModal(true)}>Editar Perfil</Button>}
                    
                    {loggedUsser._id !== user.id && (
                        following !== null && (
                            (following ? <Button onClick={endFollow} className='unfollow'><span>Siguiendo</span></Button> : <Button onClick={startFollow}>Seguir</Button>)
                        )
                        
                    )}
                </div>
            )}

            <ConfigModal
                show={showModal}
                setShow={setShowModal}
                title="Editar Perfil"
            ><EditUserForm user={user} setShowModal={setShowModal} /></ConfigModal>
        </div>
    );
}
