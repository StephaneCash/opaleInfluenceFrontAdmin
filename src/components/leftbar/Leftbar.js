import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Leftbar.css";
import { FaHandHolding, FaHandshake, FaImage, FaRegLaughBeam, FaTable, FaTachometerAlt, FaUsers, FaVideo } from "react-icons/fa"

const Leftbar = () => {
    return (
        <div className='leftbar'>
            <div className='menu-item'>
                <NavLink to="/dashboard">
                    <div className='item'>
                        <FaTachometerAlt />
                        <span>Dashboard</span>
                    </div>
                </NavLink>
                <NavLink to="/categories">
                    <div className='item'>
                        <FaTable />
                        <span>Catégorie</span>
                    </div>
                </NavLink>
                <NavLink to="/influenceurs">
                    <div className='item'>
                        <FaRegLaughBeam />
                        <span>Influenceurs</span>
                    </div>
                </NavLink>
                <NavLink to="/demandes">
                    <div className='item'>
                        <FaHandshake />
                        <span>Demandes</span>
                    </div>
                </NavLink>
                <NavLink to="/images">
                    <div className='item'>
                        <FaImage />
                        <span>Images</span>
                    </div>
                </NavLink>
                <NavLink to="/videos">
                    <div className='item'>
                        <FaVideo />
                        <span>Vidéos</span>
                    </div>
                </NavLink>
                <NavLink to="/users">
                    <div className='item'>
                        <FaUsers />
                        <span>Utilisateurs</span>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Leftbar