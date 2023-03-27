import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import { baseUrlImage } from '../../bases/basesUrl';
import LoaderBlue from '../../components/loader/LoaderBlue';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { FaInfo, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import InfiniteScroll from 'react-infinite-scroll-component';
import { deleteInfluenceur, getAllInfluenceurs } from "../../features/Influenceurs"
import { dateParserFunction } from '../../utils';

export default function ListInfluenceurs(props) {
    let data = props.data;
    let valueSearch = props.valueSearch && props.valueSearch.toLowerCase();

    const [showBtnAddInf, setShowBtnAddInf] = React.useState(true);

    const [influenceurs, setinfluenceurs] = React.useState([]);
    const [hasMore, setHasMore] = React.useState(true);
    const [count, setCount] = React.useState(10);

    let dispatch = useDispatch();

    React.useEffect(() => {
        setinfluenceurs(data && data.value && data.value)
    }, [data]);

    React.useEffect(() => {
        dispatch(getAllInfluenceurs(count));
    }, [dispatch, count]);

    const deleteCategorie = (id) => {
        swal({
            text: "Etes-vous sûr de vouloir supprimer cet influenceur ?",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deleteInfluenceur(id));
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    const loadMore = () => {
        if (influenceurs.length === count) {
            setinfluenceurs(influenceurs && influenceurs.concat(influenceurs))
            setHasMore(true)
            setCount(count + 10);
        }
        else {
            setHasMore(false)
            setCount(count + 10);
        }
    };

    const handleCheckBox = (id) => {
        setShowBtnAddInf(!showBtnAddInf);
    };

    return (
        <TableContainer component={Paper} id="scrollableDiv"
            style={{
                height: 510,
                overflow: 'auto',
            }}>
            <div style={{ background: '#fff', border: "1px solid #ddd", padding: "1rem" }}>
                <span>Pages</span> / <span>Influenceurs {data && data.value && data.value.length > 0 ? `(${data.value.length})` :
                    `(0)`}</span>
                <br />
                <h6>Influenceurs</h6>
            </div>
            <InfiniteScroll
                dataLength={influenceurs && influenceurs.length}
                next={loadMore}
                hasMore={hasMore}
                loader={
                    <div style={{
                        width: '100%',
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <LoaderBlue />
                    </div>
                }
                endMessage={
                    <div style={{
                        width: '100%',
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: '1rem'
                    }}>
                        Plus de données disponibles
                    </div>
                }
                scrollableTarget="scrollableDiv"
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <input
                                    style={{ border: "2px solid silver", width: 20, height: 20 }}
                                    className="form-check-input" type="checkbox" value=""
                                    id="flexCheckDefault"
                                />
                            </TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Nom</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Date inscription</TableCell>
                            <TableCell align="left">Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {influenceurs && influenceurs.length > 0 ? influenceurs.filter(val => {
                            const nom = val && val.nom !== undefined && val.nom.toLowerCase();
                            return nom && nom.includes(valueSearch)
                        })
                            .map((row, i) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell width={60}>
                                        <input
                                            className="form-check-input" type="checkbox"
                                            value="" id="flexCheckDefault"
                                            onClick={() => handleCheckBox(row && row.id)}
                                            style={{ border: "2px solid silver", width: 20, height: 20 }}
                                        />
                                    </TableCell>
                                    <TableCell width={60}>{i + 1}</TableCell>
                                    <TableCell width={300}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <div>
                                                <Avatar alt="Remy Sharp" sx={{ width: 40, height: 40 }} src={baseUrlImage + "/" + row.url} />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: "600", }}>{row.nom + ' ' + row.pseudo}</div>
                                                <div className='mt-1' style={{ color: "#666", fontSize: '13px' }}>{row && row.categorie && row.categorie.nom}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell align="left" width={500} style={{ fontFamily: "Roboto", textAlign: "justify", fontWeight: "400", lineHeight: "1.4rem" }}>
                                        {
                                            row.detail.split(".") ? row.detail.split(".")[0] + "..." : row.detail
                                        }
                                    </TableCell>
                                    <TableCell width={300}>
                                        {
                                            dateParserFunction(row.createdAt)
                                        }
                                    </TableCell>
                                    <TableCell align="left" width={130}>
                                        <Link to={{ pathname: "detail" }} state={{ data: row }} style={{ color: "#111" }} className="me-1">
                                            <FaInfo size={18} />
                                        </Link>
                                        <Link to={{ pathname: "add" }} state={{ data: row }} style={{ color: "#111" }} className="me-1">
                                            <FaRegEdit size={18} />
                                        </Link>
                                        <FaRegTrashAlt size={18} style={{ cursor: 'pointer' }} onClick={() => deleteCategorie(row.id)} />
                                    </TableCell>
                                </TableRow>
                            )) :
                            data && data.value && data.value.length === 0 ?
                                <TableCell colSpan="6px"
                                    style={{
                                        textAlign: "center",
                                    }}
                                >
                                    Pas de données disponibles.
                                </TableCell> :

                                <TableCell align="left" style={{ textAlign: "center" }} colSpan="6px">
                                    ''
                                </TableCell>
                        }

                    </TableBody>
                </Table>
            </InfiniteScroll>
        </TableContainer>
    );
}