import React, { useState, useEffect } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import queryString from 'query-string';
import BasicLayout from "../../layout/BasicLayout";
import { getTweetsFollowersApi } from '../../api/tweets';
import ListTweets from '../../components/ListTweets';

import "./Home.scss";

export default function Home(props) {
    const { setRefreshChckLogin } = props;

    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(1);
    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        getTweetsFollowersApi(page)
            .then((resp) => {
                if (!tweets) {
                    if (resp) {
                        setTweets(formatModel(resp));
                    }else{
                        setBtnLoading(false);
                    }
                } else {
                    if (!resp) {
                        setBtnLoading(0);
                    } else {
                        setTweets([...tweets, ...formatModel(resp)]);
                        setBtnLoading(false);
                    }
                }
            });
    }, [page]);

    const moreData = () => {
        const pageTemp = parseInt(page) + 1;
        setBtnLoading(true);
        setPage(page + 1);
    }

    return (
        <BasicLayout className="home" setRefreshChckLogin={setRefreshChckLogin}>
            <div className='home__title'>
                <h2>Inicio</h2>
            </div>

            {!tweets ? (
                (btnLoading) ? (
                    <div className='home__loading'>
                        <Spinner animation='border' variant='info' />
                        Buscando tweets
                    </div>
                ) : (
                    <h2>No hay tweets</h2>
                )
            ) : (
                    <>
                        <ListTweets tweets={tweets} />
                        <Button className='busqueda' onClick={moreData}>
                            {!btnLoading ? (
                                btnLoading !== 0 ? 'Obtener más Tweets' : 'No hay más tweets'
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
                    </>
                )}
        </BasicLayout>
    )
}

function formatModel(twe) {
    const tweetTemp = [];
    twe.forEach((tweet) => {
        tweetTemp.push({
            _id: tweet._id,
            userId: tweet.userRelationId,
            mensaje: tweet.Tweet.mensaje,
            fecha: tweet.Tweet.fecha
        });
    });
    return tweetTemp;
}