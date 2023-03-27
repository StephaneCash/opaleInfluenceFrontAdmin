import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaPlus, FaSearch } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import "./Categorie.css"
import { useSelector } from 'react-redux';
import DetailListCatgorie from './DetailListCatgorie';

const DetailCategorie = () => {

    const categoriesList = useSelector((state) => state.categories);
    const [data, setDtata] = useState('');

    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        if (state) {
            setDtata(state.data)
        }
    }, [state]);

    return (
        <>
            <Navbar />
            <div className='col-sm-12 categories'>
                <div className='col-sm-2'>
                    <Leftbar />
                </div>
                <div className='col-sm-10 main'>
                    <div className='alert alert-success'>
                        <Link to="/categories">
                            <div className='retour'>
                                <FaArrowLeft />
                                <span>Retour</span>
                            </div>
                        </Link>
                    </div>

                    <div className='col-sm-12 tableCategorie'>
                        <DetailListCatgorie
                            data={data}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailCategorie