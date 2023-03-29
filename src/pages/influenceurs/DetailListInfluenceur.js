import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import { baseUrlImage } from '../../bases/basesUrl';
import { useSelector } from 'react-redux';
import { dateParserFunction } from '../../utils';
import DetailImage from './DetailImage';

export default function DetailListInfluenceur(props) {

    let data = props.data;

    const [showModal, setShowModal] = React.useState(false);
    const [row, setRow] = React.useState('');
    const [inf, setInf] = React.useState('');

    const showImage = (id) => {
        setShowModal(true);
        setRow(id)
    };

    const closeModal = () => {
        setShowModal(false);
    }

    let categories = useSelector((state) => state.categories);

    React.useEffect(() => {
        if (data) {
            categories && categories.value && categories.value.map(val => {
                if (val.id === data.categorieId) {
                    return setInf(val);
                }
            })
        }
    }, [data, categories]);

    return (
        <TableContainer component={Paper} style={{ borderTop: "1px solid #ddd" }}>
            <div className='alert alert-primary'>
                <h6>Détail de {data && data.nom} membre depuis {dateParserFunction(data.createdAt)}</h6>
            </div>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody key={data.id}>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell width={200} style={{ fontWeight: "bold" }}>Nom</TableCell>
                        <TableCell width={200}>{data.nom}</TableCell>
                    </TableRow>

                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell width={200} style={{ fontWeight: "bold" }}>Prénom </TableCell>
                        <TableCell width={200}>{data.prenom}</TableCell>
                    </TableRow>

                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell width={200} style={{ fontWeight: "bold" }}>Postnom</TableCell>
                        <TableCell width={200}>{data.postnom}</TableCell>
                    </TableRow>

                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell width={200} style={{ fontWeight: "bold" }}>Pseudo </TableCell>
                        <TableCell width={200}>{data.pseudo}</TableCell>
                    </TableRow>

                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell width={200} style={{ fontWeight: "bold" }}>Description </TableCell>
                        <TableCell width={200}>{data.detail}</TableCell>
                    </TableRow>

                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell width={200} style={{ fontWeight: "bold" }}>Biographie </TableCell>
                        <TableCell width={200}>{data.textDetaillle}</TableCell>
                    </TableRow>

                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell width={200} style={{ fontWeight: "bold" }}>Catégorie </TableCell>
                        <TableCell width={200}>{inf ? inf.nom : data.categorie && data.categorie.nom}</TableCell>
                    </TableRow>

                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell width={200} style={{ fontWeight: "bold" }}>Photo </TableCell>
                        <TableCell width={200}>
                            <Avatar
                                style={{ cursor: "pointer" }}
                                onClick={() => showImage(data)}
                                alt={data && data.nom.toUpperCase()}
                                src={baseUrlImage + "/" + data.url}
                                sx={{ width: 100, height: 100 }}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            {
                <DetailImage
                    show={showModal}
                    closeModal={closeModal}
                    data={row}
                />
            }
        </TableContainer>
    );
}