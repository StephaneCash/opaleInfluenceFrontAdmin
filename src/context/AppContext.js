import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import App from '../App';
import { baseUrl } from '../bases/basesUrl';
import { decodeToken } from "react-jwt";

export const ContextApp = createContext();

const AppContext = () => {

    const [userConnected, setUserConnected] = useState(null);
    const [categories, setCategories] = useState(null);
    const [uid, setUid] = useState(null);

    const jwt = JSON.parse(localStorage.getItem('tokenUser'));

    useEffect(() => {
        if (jwt) {
            setUid(decodeToken(jwt));
        }
    }, [jwt]);

    useEffect(() => {
        if (uid && uid.id) {
            axios.get(`${baseUrl}/users/${uid && uid.id}`)
                .then(res => {
                    setUserConnected(res.data && res.data.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [uid]);

    useEffect(() => {
        axios.get(`${baseUrl}/categories`)
            .then(res => {
                setCategories(res.data && res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <ContextApp.Provider
            value={{
                userConnected, setUserConnected, categories
            }}
        >
            <App />
        </ContextApp.Provider>
    )
}

export default AppContext