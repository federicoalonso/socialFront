import { API_HOST } from '../utils/constants';
import { getTokenApi } from './auth';

export function getUserApi(id) {
    const url = `${API_HOST}/perfil?id=${id}`;

    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `${getTokenApi()}`
        }
    }

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

export function uploadBannerApi(file){
    const url = `${API_HOST}/subirBanner`;

    const formData = new FormData();
    formData.append("banner", file);

    const params = {
        method: "POST",
        headers: {
            Authorization: `${getTokenApi()}`
        },
        body: formData
    }

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

export function uploadAvatarApi(file){
    const url = `${API_HOST}/subirAvatar`;

    const formData = new FormData();
    formData.append("avatar", file);

    const params = {
        method: "POST",
        headers: {
            Authorization: `${getTokenApi()}`
        },
        body: formData
    }

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

export function updateInfoApi(user){
    const url = `${API_HOST}/modificarPerfil`;

    const params = {
        method: "PUT",
        headers: {
            Authorization: `${getTokenApi()}`
        },
        body: JSON.stringify(user)
    }

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