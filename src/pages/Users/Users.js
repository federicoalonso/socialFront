import React, { useState, useEffect } from 'react';
import { Spinner, ButtonGroup, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { isEmpty } from 'lodash';
import { useDebouncedCallback } from 'use-debounce';

import BasicLayout from '../../layout/BasicLayout';
import { getUsersApi } from '../../api/follow';
import ListUsers from '../../components/ListUsers';

import './Users.scss';

function Users(props) {
    const { setRefreshChckLogin, location, history } = props;
    const params = useUserQuery(location);

    const [users, setUsers] = useState(null);
    const [typeUser, setTypeUser] = useState(params.type || "follow");
    const [btnLoading, setBtnLoading] = useState(false);

    const onSearch = useDebouncedCallback((value) => {
        setUsers(null);
        history.push({
            search: queryString.stringify({ ...params, search: value, page: 1 })
        })
    }, 300);

    const moreData = () => {
        const pageTemp = parseInt(params.page) + 1;
        setBtnLoading(true);
        history.push({
            search: queryString.stringify({ ...params, page: pageTemp }),
        })
    }

    useEffect(() => {
        getUsersApi(queryString.stringify(params))
            .then(response => {
                if (params.page == 1) {
                    if (isEmpty(response)) {
                        setUsers([]);
                    } else {
                        setUsers(response);
                    }
                } else {
                    if (!response) {
                        setBtnLoading(0);
                    } else {
                        setUsers(...users, ...response);
                        setBtnLoading(false);
                    }
                }
            })
            .catch(() => {
                setUsers([]);
            });
    }, [location]);

    const onChangeType = (type) => {
        setUsers(null);
        if (type === "new") {
            setTypeUser('new');
        } else {
            setTypeUser('follow');
        }

        history.push({
            search: queryString.stringify({ type: type, page: 1, search: '' })
        });
    }

    return (
        <BasicLayout
            className='users'
            title='Usuarios'
            setRefreshChckLogin={setRefreshChckLogin}
        >
            <div className='users__title'>
                <h2>Usuarios</h2>
                <input
                    type='text'
                    placeholder='Busca un Usuario...'
                    onChange={(e) => onSearch.callback(e.target.value)}
                />
            </div>
            <ButtonGroup className='users__options'>
                <Button
                    onClick={() => onChangeType('follow')}
                    className={typeUser === 'follow' && 'active'}
                >Siguiendo</Button>
                <Button
                    onClick={() => onChangeType('new')}
                    className={typeUser === 'new' && 'active'}
                >Nuevos</Button>
            </ButtonGroup>

            {!users ? (
                <div className='users__loading'>
                    <Spinner animation='border' variant='info' />
                    Buscando Usuarios
                </div>
            ) : (
                    <>
                        <ListUsers users={users} />
                        <Button className='busqueda' onClick={moreData}>
                            {!btnLoading ? (
                                btnLoading !== 0 && 'Obtener más Usuarios'
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

function useUserQuery(location) {
    const { page = 1, type = 'follow', search = "" } = queryString.parse(location.search);
    return { page, type, search };
}

export default withRouter(Users);