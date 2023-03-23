import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Dashboard from "../pages/dashboard/Dashboard";
import RoutesPrivate from './RoutesPrivate';
import Categorie from '../pages/categories/Categorie';
import AddCategorie from '../pages/categories/AddCategorie';

const RoutesFree = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />

                <Route element={<RoutesPrivate />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/categories' element={<Categorie />} />
                    <Route path='/categories/add' element={<AddCategorie />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesFree