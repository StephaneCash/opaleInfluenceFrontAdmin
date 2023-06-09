import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Dashboard from "../pages/dashboard/Dashboard";
import RoutesPrivate from './RoutesPrivate';
import Categorie from '../pages/categories/Categorie';
import AddCategorie from '../pages/categories/AddCategorie';
import Influenceurs from '../pages/influenceurs/Influenceurs';
import DetailCategorie from '../pages/categories/DetailCategorie';
import AddInfluenceur from '../pages/influenceurs/AddInfluenceur';
import DetailInfluenceur from '../pages/influenceurs/DetailInfluenceur';
import Demandes from '../pages/demandes/Demandes';
import Users from '../pages/users/Users';

const RoutesFree = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />

                <Route element={<RoutesPrivate />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/categories' element={<Categorie />} />
                    <Route path='/demandes' element={<Demandes />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/categories/add' element={<AddCategorie />} />
                    <Route path='/influenceurs' element={<Influenceurs />} />
                    <Route path='/categories/detail' element={<DetailCategorie />} />
                    <Route path='/influenceurs/add' element={<AddInfluenceur />} />
                    <Route path='/influenceurs/detail' element={<DetailInfluenceur />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesFree