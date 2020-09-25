import React from 'react';
import moment from 'moment';
import localization from 'moment/locale/es-mx';

import { Location, Link, DataBirth } from '../../../utils/Icons';

import './InfoUser.scss';

export default function InfoUser(props) {
    const { user } = props;

    return (
        <div className='info-user'>
            <h2 className='name'>
                {user?.nombre} {user?.apellidos}
            </h2>
            <p className='email'>{user?.email}</p>
            {user?.biografia && <div className='biografia'>{user?.biografia}</div>}

            <div className='more-info'>
                {user?.ubicacion && (
                    <p>
                        <Location />
                        {user.ubicacion}
                    </p>
                )}
                {user?.sitioWeb && (
                    <a href={user.sitioWeb} alt={user.sitioWeb} target='_blank' rel='noopener noreferrer'>
                        <Link />
                        {user.sitioWeb}
                    </a>
                )}
                {user?.fechaNacimiento && (
                    <p>
                        <DataBirth />
                        {moment(user.fechaNacimiento).locale("ar", localization).format("LL")}
                    </p>
                )}
            </div>
        </div>
    )
}
