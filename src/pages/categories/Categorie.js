import React, { useContext, useEffect, useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import { ContextApp } from '../../context/AppContext'
import "./Categorie.css"
import ListCategorie from './ListCategorie';
import { useDispatch, useSelector } from 'react-redux';
import { getAllcategories } from '../../features/Categories';

const Categorie = () => {

    // const { userConnected } = useContext(ContextApp);

    const categoriesList = useSelector((state) => state);

    console.log(categoriesList)

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
                            <div className="input-group">
                                <input type="search" id="form1" className="form-control" />
                                <FaSearch color='#1976d2' />
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <button className='btn btn-primary'>
                                <FaPlus />
                                <Link to='add'>
                                    Ajouter
                                </Link>
                            </button>
                        </div>
                    </div>

                    <div className='col-sm-12 tableCategorie'>
                        <ListCategorie data={categoriesList} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categorie