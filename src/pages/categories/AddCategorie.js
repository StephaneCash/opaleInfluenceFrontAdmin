import React, { useState } from 'react';
import { FaHandPointLeft } from 'react-icons/fa';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import "./Categorie.css";
import { Link } from 'react-router-dom';
import { newCategorie } from "../../features/Categories";
import { useDispatch } from 'react-redux';

const AddCategorie = () => {

    const [nom, setNom] = useState('');
    const [file, setFile] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const handleImage = (e) => {
        setImage(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]))
    }

    const addCategorie = (e) => {
       
        let formData = new FormData();
        formData.append('nom', nom);
        formData.append('image', image);
        formData.append('description', description);

        dispatch(newCategorie(formData));
    };

    return (
        <>
            <Navbar />
            <div className='col-sm-12 categories'>
                <div className='col-sm-2'>
                    <Leftbar />
                </div>
                <div className='col-sm-10 main'>
                    <div className='col-sm-12'>
                        <div className='alert alert-success'>
                            <h4 style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                color: "#1976d2"
                            }}>
                                <Link to="/categories"
                                    style={{ fontSize: "16px", color: "#1976d2", textDecoration: "underline" }}>
                                    Catégories
                                </Link>
                                <span style={{ fontSize: "15px", color: "#1976d2", }}>/</span>
                                <span style={{ fontSize: "17px" }}>Ajout</span>
                            </h4>
                        </div>
                    </div>

                    <div className='col-sm-12 tableCategorie'>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div className="form-group mb-3">
                                    <label htmlFor="exampleFormControlInput1">Entrer un nom</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        placeholder="Entrer un nom"
                                        onChange={(e) => setNom(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="exampleFormControlFile1">Choisir une photo</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="exampleFormControlFile1"
                                        onChange={handleImage}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="exampleFormControlTextarea1">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows="3"></textarea>
                                </div>

                            </div>
                            <div className={file ? "col-sm-6 imageCard" : image ? "col-sm-6 imageCard" : "col-sm-6"}>
                                <h5>Image</h5>
                                <div className='card'>
                                    {
                                        file ? <img src={file} alt="" className='img-thumbnail' /> :
                                            image ?
                                                <img src={image ? image + "/" + image : ""}
                                                    className='img-thumbnail' alt="catégorie" />
                                                : <div className='noneImage'>
                                                    <FaHandPointLeft size={20} />
                                                    Veuillez choisir une image
                                                </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <button className='btn btn-primary' onClick={addCategorie}>
                            Ajouter
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCategorie