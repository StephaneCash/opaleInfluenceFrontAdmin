import React, { useContext, useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import { ContextApp } from '../../context/AppContext'
import "./Categorie.css"
import ListCategorie from './ListCategorie';

const Categorie = () => {
    const { userConnected } = useContext(ContextApp);
    console.log(userConnected)
    return (
        <>
            <Navbar />
            <div className='col-sm-12 categories'>
                <div className='col-sm-2'>
                    <Leftbar />
                </div>
                <div className='col-sm-10 main'>
                    <div className='col-sm-12'>
                        <h3>Catégories</h3>
                    </div>
                    <div className='alert alert-success'>
                        <div className='col-sm-8'>
                            <div class="input-group">
                                <input type="search" id="form1" class="form-control" />
                                <FaSearch color='#1976d2' />
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <button className='btn btn-primary'>
                                <FaPlus/>
                                Ajouter
                            </button>
                        </div>
                    </div>

                    <div className='col-sm-12 tableCategorie'>
                        <ListCategorie/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categorie