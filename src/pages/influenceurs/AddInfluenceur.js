import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaCloudUploadAlt } from 'react-icons/fa';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import "./Influenceurs.css";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { baseUrlImage } from '../../bases/basesUrl';
import { newInfluenceur, updateInfluenceur } from '../../features/Influenceurs';

const AddInfluenceur = () => {

    const [nom, setNom] = useState('');
    const [postnom, setPostnom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [image, setImage] = useState('');
    const [detail, setDetail] = useState('');
    const [textDetail, setTextDetail] = useState('');
    const [categorie, setCategorie] = useState('');
    const [file, setFile] = useState('');

    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.categories);

    const location = useLocation();
    const { state } = location;

    const categories = useSelector(state => state.categories);

    const handleImage = (e) => {
        setImage(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]))
    };

    useEffect(() => {
        if (state) {
            setNom(state && state.data && state.data.nom);
            setImage(state && state.data && state.data.url);
            setTextDetail(state && state.data && state.data.textDetaillle);
            setPrenom(state && state.data && state.data.prenom);
            setPostnom(state && state.data && state.data.postnom);
            setPseudo(state && state.data && state.data.pseudo);
            setDetail(state && state.data && state.data.detail);
            setCategorie(state && state.data && state.data.categorie && state.data.categorie.id);
        }
    }, [state]);

    const addInfluenceur = (e) => {
        let formData = new FormData();
        formData.append('nom', nom);
        formData.append('postnom', postnom);
        formData.append('prenom', prenom);
        formData.append('pseudo', pseudo);
        formData.append('image', image);
        formData.append('categorieId', categorie);
        formData.append('detail', detail);
        formData.append('textDetaillle', textDetail);

        dispatch(newInfluenceur(formData));
    };

    const updateInfluenceurHandle = (e) => {
        let formData = new FormData();
        formData.append('nom', nom);
        formData.append('postnom', postnom);
        formData.append('prenom', prenom);
        formData.append('pseudo', pseudo);
        formData.append('image', image);
        formData.append('categorieId', categorie);
        formData.append('detail', detail);
        formData.append('textDetaillle', textDetail);

        let data = {}
        data.form = formData;
        data.id = state && state.data && state.data.id;

        dispatch(updateInfluenceur(data));
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
                        <div className='alert alert-primary' style={{ border: "1px solid #ddd", background: "#fff" }}>
                            <h4 style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                color: "#1976d2"
                            }}>
                                <Link to="/influenceurs"
                                    style={{
                                        fontSize: "16px", color: "#1976d2",
                                        display: "flex", alignItems: "center", gap: "5px",
                                    }}
                                >
                                    <FaArrowLeft /> Influenceurs
                                </Link>
                                <span style={{ fontSize: "15px", color: "#1976d2", }}>/</span>
                                <span style={{ fontSize: "17px" }}>
                                    {
                                        state ? `Modification de ${state && state.data && state.data.nom}` : "Ajout"
                                    }
                                </span>
                            </h4>
                        </div>
                    </div>

                    <div className='col-sm-12 tableCategorie'>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div className='col-sm-12'>
                                    <div className="form-group mb-3">
                                        <label htmlFor="nom">Entrer un nom</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nom"
                                            placeholder="Entrer un nom"
                                            value={nom}
                                            onChange={(e) => setNom(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-sm-6'>
                                        <div className="form-group mb-3">
                                            <label htmlFor="prenom">Prénom</label>
                                            <input
                                                type="text"
                                                placeholder='Prénom'
                                                className="form-control"
                                                id="prenom"
                                                value={prenom}
                                                onChange={(e) => setPrenom(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm-6'>
                                        <div className="form-group mb-3">
                                            <label htmlFor="postnom">Postnom</label>
                                            <input
                                                type="text"
                                                placeholder='Prénom'
                                                className="form-control"
                                                id="postnom"
                                                value={postnom}
                                                onChange={(e) => setPostnom(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-sm-6'>
                                        <div className="form-group mb-3">
                                            <label htmlFor="pseudo">Pseudo</label>
                                            <input
                                                type="text"
                                                placeholder='Pseudo'
                                                className="form-control"
                                                id="pseudo"
                                                value={pseudo}
                                                onChange={(e) => setPseudo(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm-6'>
                                        <div className="form-group mb-3">
                                            <label htmlFor="photod">Choisir une photo</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="photo"
                                                onChange={handleImage}
                                                style={{ width: "100%" }}
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="form-group mb-3">
                                    <label htmlFor="desc">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="desc"
                                        placeholder='Description'
                                        onChange={(e) => setTextDetail(e.target.value)}
                                        value={textDetail}
                                        rows="3">
                                    </textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="exampleFormControlTextarea1">Choisir une catégorie</label>
                                    <select
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        onChange={(e) => setCategorie(e.target.value)}
                                    >
                                        <option value="" key="">--Choisir une catégorie--</option>
                                        {
                                            categories && categories.isSuccess ?
                                                categories.value && categories.value.map((val, i) => {
                                                    return <option value={val.id} key={i} selected={
                                                        state ? categorie === val.id ? true : false : false
                                                    }>
                                                        {val.nom}
                                                    </option>
                                                })
                                                : "Aucune catégorie trouvée."
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className={file ? "col-sm-6 imageCard" : image ? "col-sm-6 imageCard" : "col-sm-6"}>
                                <div className="form-group mb-3">
                                    <label htmlFor="bio">Breve biographie</label>
                                    <textarea
                                        className="form-control"
                                        id="bio"
                                        placeholder='Biographie'
                                        onChange={(e) => setDetail(e.target.value)}
                                        value={detail}
                                        rows="3"></textarea>
                                </div>
                                <h5>Image</h5>
                                <div className='card' style={{ border: image ? "1px solid #ddd" : "0px solid #ddd" }}>
                                    {
                                        file ? <img src={file} alt="" className='img-thumbnail' /> :
                                            image ?
                                                <img src={image ? baseUrlImage + "/" + image : ""}
                                                    className='img-thumbnail' alt="catégorie" />
                                                : <div className='noneImage'>
                                                    <FaCloudUploadAlt size={100} />
                                                    <label htmlFor="photo"> Veuillez choisir une image</label>
                                                </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <button
                            className='btn btn-primary'
                            onClick={!state ? addInfluenceur : updateInfluenceurHandle}
                            disabled={nom && textDetail ? false : true}
                        >
                            {
                                isLoading && isLoading.loading ? <Loader /> : state ? "Modifier" : "Ajouter"
                            }

                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddInfluenceur