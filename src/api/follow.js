import { API_HOST } from '../utils/constants';
import {getTokenApi} from "./auth";

export function checkFollowApi(idUser){
    const url = `${API_HOST}/consultaAmistad?id=${idUser}`;

    const params = {
        headers: {
            Authorization: `${getTokenApi()}`
        }
    };

    return fetch(url, params)
        .then(response => {
            if (response.status >= 400) throw null;
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
}

export function followUserApi(idUser){
    const url = `${API_HOST}/amistad?id=${idUser}`;

    const params = {
        method:"POST",
        headers: {
            Authorization: `${getTokenApi()}`
        }
    };

    return fetch(url, params)
        .then(response => {
            if (response.status >= 400) throw null;
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
}

export function unFollowUserApi(idUser){
    const url = `${API_HOST}/bajaAmistad?id=${idUser}`;

    const params = {
        method:"DELETE",
        headers: {
            Authorization: `${getTokenApi()}`
        }
    };

    return fetch(url, params)
        .then(response => {
            if (response.status >= 400) throw null;
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
}

export function getUsersApi(paramsUrl){
    const url = `${API_HOST}/verUsuarios?${paramsUrl}`;

    const params = {
        headers: {
            Authorization: `${getTokenApi()}`
        }
    };

    return fetch(url, params)
        .then(response => {
            if (response.status >= 400) throw null;
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
}