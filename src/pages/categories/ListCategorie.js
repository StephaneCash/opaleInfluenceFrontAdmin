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
import { deleteCategory, getAllcategories } from '../../features/Categories';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { FaInfo, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function ListCategorie(props) {
  let data = props.data;
  let valueSearch = props.valueSearch && props.valueSearch.toLowerCase();

  const [showBtnAddInf, setShowBtnAddInf] = React.useState(true);

  const [categories, setCategories] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [count, setCount] = React.useState(10);

  let dispatch = useDispatch();

  React.useEffect(() => {
    setCategories(data && data.value && data.value)
  }, [data]);

  React.useEffect(() => {
    dispatch(getAllcategories(count));
  }, [dispatch, count]);

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

  const loadMore = () => {
    if (categories.length === count) {
      setCategories(categories && categories.concat(categories))
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
      <div className='alert alert-primary' style={{ background: '#fff', border: "1px solid #ddd" }}>
        <span>Pages</span> / <span>Catégories {data && data.value && data.value.length > 0 ? `(${data.value.length})` : `(0)`}</span>
        <br />
        <h6>Catégories</h6>
      </div>
      <InfiniteScroll
        dataLength={data && data.value && data.value.length}
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
              <TableCell align="left">Photo</TableCell>
              <TableCell align="left">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {categories && categories.length > 0 ? categories.filter(val => {
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
                  <TableCell width={200}>{row.nom}</TableCell>
                  <TableCell align="left" width={500} style={{ fontFamily: "Roboto", textAlign: "justify", fontWeight: "400", lineHeight: "1.4rem" }}>
                    {
                      row.description.split(".") ? row.description.split(".")[0] + "..." : row.description
                    }
                  </TableCell>
                  <TableCell align="left" width={120}>
                    <Avatar alt="Remy Sharp" sx={{ width: 50, height: 50 }} src={baseUrlImage + "/" + row.url} />
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
                  <LoaderBlue />
                </TableCell>
            }

          </TableBody>
        </Table>
      </InfiniteScroll>
    </TableContainer>
  );
}