import { API_HOST } from '../utils/constants';
import {getTokenApi} from "./auth";

export function postTweetApi(mensaje){
    const url = `${API_HOST}/tweet`;
    const data = {
        mensaje
    };

    const params = {
        method:"POST",
        headers: {
            Authorization: `${getTokenApi()}`
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params)
        .then(response => {
            if (response.status >= 400) throw {code:response.status, message: "Error del Servidor."};
            return {code:response.status, message: "Tweet Enviado."};
        })
        .catch(err => {
            return err;
        });
}

export function getUserTweetsApi(idUser, page){
    const url = `${API_HOST}/leoTweets?id=${idUser}&pagina=${page}`;

    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `${getTokenApi()}`
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
}

export function getTweetsFollowersApi(page = 1){
    const url = `${API_HOST}/verTweets?pagina=${page}`;

    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `${getTokenApi()}`
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
}