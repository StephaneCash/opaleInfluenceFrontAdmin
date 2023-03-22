import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import App from '../App';
import { baseUrl } from '../bases/basesUrl';

export const ContextApp = createContext();

const AppContext = () => {

    const [userConnected, setUserConnected] = useState(null);

    useEffect(() => {
        axios.get(`${baseUrl}/users`)
            .then(res => {
                setUserConnected(res.data && res.data.data[0]);
                console.log(res)
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <ContextApp.Provider
            value={{
                userConnected, setUserConnected
            }}
        >
            <App />
        </ContextApp.Provider>
    )
}

export default AppContext