import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { map } from 'lodash';
import moment from 'moment';
import { getUserApi } from '../../api/user';
import AvatarNotFound from '../../assets/png/avatar-no-found.png';
import { API_HOST } from '../../utils/constants';
import { replaceURLWithHTMLLinks } from '../../utils/funtions';

import './ListTweets.scss';

export default function ListTweets(props) {
    const { tweets } = props;


    return (
        <div className='list-tweet'>
            {map(tweets, (tweet, index) => (
                <Tweet tweet={tweet} key={index} />
            ))}
        </div>
    );
}

function Tweet(props) {
    const { tweet } = props;

    const [useInfo, setUseInfo] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        getUserApi(tweet.userId)
            .then(response => {
                setUseInfo(response);
                setAvatarUrl(
                    response?.avatar ? `${API_HOST}/obtenerAvatar?id=${response.id}` : AvatarNotFound
                );
            })
    }, [tweet]);

    return (
        <div className='tweet'>
            <Image className='avatar' src={avatarUrl} roundedCircle />
            <div>
                <div className='name'>
                    {useInfo?.nombre} {useInfo?.apellidos}
                    <span>{moment(tweet.fecha).calendar()}</span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: replaceURLWithHTMLLinks(tweet.mensaje) }} />
            </div>
        </div>
    );
}