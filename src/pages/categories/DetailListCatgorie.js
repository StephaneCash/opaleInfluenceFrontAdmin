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
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import DetailImage from './DetailImage';

export default function DetailListCatgorie(props) {

    let data = props.data;

    let dispatch = useDispatch();
    const [showModal, setShowModal] = React.useState(false);

    const showImage = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <TableContainer component={Paper} style={{ borderTop: "1px solid #ddd" }}>
            <h5 className='ms-2 mt-2'>Détail de {data && data.nom}</h5>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{ borderTop: "1px solid #ddd" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">Photo</TableCell>
                        <TableCell align="left">Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        key={data.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell width={200}>{data.nom}</TableCell>
                        <TableCell align="left" style={{ fontFamily: "Roboto", textAlign: "justify", fontWeight: "400" }}>
                            {
                                data.description
                            }
                        </TableCell>
                        <TableCell align="left">
                            <Avatar
                                style={{ cursor: "pointer" }}
                                onClick={() => showImage(data)}
                                alt={data && data.nom.toUpperCase()}
                                src={baseUrlImage + "/" + data.url}
                                sx={{ width: 100, height: 100 }}
                            />
                        </TableCell>
                        <TableCell align="left" width={240}>
                            <button className='btnList'>
                                <Link to={{ pathname: "addInfluenceurs" }} state={{ data: data }} style={{ color: "#111" }}>
                                    Ajouter des influenceurs
                                </Link>
                            </button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <DetailImage
                show={showModal}
                data={data && data}
                closeModal={closeModal}
            />
        </TableContainer>
    );
}