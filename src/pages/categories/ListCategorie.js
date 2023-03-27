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
import { deleteCategory } from '../../features/Categories';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

export default function ListCategorie(props) {
  let data = props.data;
  let valueSearch = props.valueSearch && props.valueSearch.toLowerCase();

  let dispatch = useDispatch();

  const deleteCategorie = (id) => {
    swal({
      text: "Etes-vous sûr de vouloir supprimer cette catégorie ?",
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCategory(id));
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <TableContainer component={Paper} style={{ borderTop: "1px solid #ddd" }}>
      <h5 className='ms-2 mt-2'>Catégories {data && data.value && data.value.length > 0 ? `(${data.value.length})` : `(0)`}</h5>
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
          {data && data.value && data.value.length > 0 ? data.value.filter(val => {
            const nom = val.nom.toLowerCase();
            return nom.includes(valueSearch)
          })
            .map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell width={200}>{row.nom}</TableCell>
                <TableCell align="left" width={500} style={{ fontFamily: "Roboto", textAlign: "justify", fontWeight: "400" }}>
                  {
                    row.description.split(".") ? row.description.split(".")[0] + "..." : row.description
                  }
                </TableCell>
                <TableCell align="left">
                  <Avatar alt="Remy Sharp" src={baseUrlImage + "/" + row.url} />
                </TableCell>
                <TableCell align="left" width={240}>
                  <button className='btnList'>
                    <Link to={{ pathname: "detail" }} state={{ data: row }} style={{ color: "#111" }}>
                      Détail
                    </Link>
                  </button>
                  <button className='btnList'>
                    <Link to={{ pathname: "add" }} state={{ data: row }} style={{ color: "#111" }}>
                      Modifier
                    </Link>
                  </button>
                  <button className='btnList' onClick={() => deleteCategorie(row.id)}>Supprimer</button>
                </TableCell>
              </TableRow>
            )) :
            data && data.value && data.value.length === 0 ?
              <TableCell colSpan="4px"
                style={{
                  textAlign: "center",
                }}
              >
                Pas de données disponibles.
              </TableCell> :

              <TableCell align="left" style={{ textAlign: "center" }} colSpan="4px">
                <LoaderBlue />
              </TableCell>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}