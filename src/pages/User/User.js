import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import userAuth from '../../hooks/useAuth';
import BasicLayout from '../../layout/BasicLayout';
import BannerAvatar from '../../components/User/BannerAvatar';
import InfoUser from '../../components/User/InfoUser';
import ListTweets from '../../components/ListTweets';
import { getUserApi } from "../../api/user";
import { getUserTweetsApi } from '../../api/tweets';

import "./User.scss";

function User(props) {
    const { match, setRefreshChckLogin } = props;
    const [user, setUser] = useState(null);
    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(1);
    const [loadingTweets, setLoadingTweets] = useState(false);
    const { params } = match;
    const loggedUsser = userAuth();

    useEffect(() => {
        getUserTweetsApi(params.id, 1)
            .then(response => {
                setTweets(response);
            })
            .catch(() => {
                setTweets([]);
                toast.error("El al traer los tweets del usuario.");
            })
    }, [params])

    useEffect(() => {
        getUserApi(params.id)
            .then(response => {
                if (!response) toast.error("El usuario que has visitado no existe");
                setUser(response);
            })
            .catch(() => {
                toast.error("El usuario que has visitado no existe");
            })
    }, [params])

    const moreData = () => {
        const pageTemp = page + 1;
        setLoadingTweets(true);

        getUserTweetsApi(params.id, pageTemp)
            .then(response => {
                if(!response){
                    setLoadingTweets(0);
                }else{
                    setTweets([...tweets, ...response]);
                    setPage(pageTemp);
                    setLoadingTweets(false);
                }
            })
    }

    return (
        <BasicLayout className="user" setRefreshChckLogin={setRefreshChckLogin}>
            <div className="user__title">
                <h2>
                    {user ? `${user.nombre} ${user.apellidos}` : "Este usuario no existe"}
                </h2>
            </div>
            <BannerAvatar user={user} loggedUsser={loggedUsser} />
            <InfoUser user={user} />
            <div className='user__tweets'>
                <h3>Tweets</h3>
                {tweets && <ListTweets tweets={tweets} />}
                <Button onClick={moreData}>
                    {!loadingTweets ? (
                        loadingTweets !== 0 && 'Obtener más Tweets'
                    ) : (
                            <Spinner
                                as='span'
                                animation='grow'
                                sice='sm'
                                role='status'
                                arian-hidden='true'
                            />
                        )}
                </Button>
            </div>
        </BasicLayout>
    )
}

export default withRouter(User);