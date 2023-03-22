import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Dashboard from "../pages/dashboard/Dashboard";
import RoutesPrivate from './RoutesPrivate';
import Categorie from '../pages/categories/Categorie';

const RoutesFree = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />

                <Route element={<RoutesPrivate />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/categories' element={<Categorie />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesFree