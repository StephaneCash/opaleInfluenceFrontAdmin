import React, { useContext, useEffect, useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import "./Influenceurs.css"
import { useSelector } from 'react-redux';
import ListInfluenceurs from './ListInfluenceurs';

const Influenceurs = () => {

    // const { userConnected } = useContext(ContextApp);

    const influenceurList = useSelector((state) => state.influenceurs);

    const [valueSearch, setValueSearch] = useState('');

    return (
        <>
            <Navbar />
            <div className='col-sm-12 influenceurs'>
                <div className='col-sm-2'>
                    <Leftbar />
                </div>
                <div className='col-sm-10 main'>
                    <div className='alert alert-success'>
                        <div className='col-sm-8'>
                            <div className="input-group">
                                <input
                                    type="search"
                                    id="form1"
                                    placeholder='Rechercher...'
                                    className="form-control"
                                    onChange={(e) => setValueSearch(e.target.value)}
                                />
                                <FaSearch color='#1976d2' />
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <Link to='add'>
                                <button className='btn btn-primary'>
                                    <FaPlus />
                                    Ajouter
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className='col-sm-12 tableCategorie'>
                        <ListInfluenceurs
                            data={influenceurList}
                            valueSearch={valueSearch}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Influenceurs