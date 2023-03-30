import React, { useContext } from 'react'
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import { ContextApp } from '../../context/AppContext'
import "./Dashboard.css";
import influenceurs from "../../assets/influenceurs.svg"
import inf from "../../assets/inf.svg"
import marketing from "../../assets/marketing.svg"
import users from "../../assets/users.svg"
import dash from "../../assets/dash.svg"
import contact from "../../assets/contact.svg"
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import Chart from "react-apexcharts";

const Dashboard = () => {
  const { userConnected } = useContext(ContextApp);
  const categories = useSelector((state) => state.categories);
  const influenceurLength = useSelector((state) => state.influenceurs);

  const options = {
    xaxis: {
      categories: ["5", '6', '8', '7']
    }
  };
  const series = [
    {
      name: "Transactions",
      data: [5, 7, 8, 4]
    },
    {
      name: "Prêts",
      data: [23, 12, 94, 81, 32, 56, 81, 19]
    },
    {
      name: "Cartes virtuelles",
      data: [2, 12, 54, 61, 32, 6, 81, 109]
    },
  ];

  console.log(userConnected)
  return (
    <>
      <Navbar />
      <div className='col-sm-12 dashboard'>
        <div className='col-sm-2'>
          <Leftbar />
        </div>
        <div className='col-sm-10 main'>
          <div className='col-sm-9'>
            <div className='row'>
              <div className='col-sm-6'>
                <div className='card alert alert-primary'>
                  <div className='categorie'>
                    <div className='nomNombre'>
                      <span className='nom'>Catégorie</span>
                      <span className='nombre'>Effectif : {categories && categories.value && categories.value.length}</span>
                    </div>
                    <div className='image'>
                      <Avatar alt="Catégorie" sx={{ width: 40, height: 40 }} src={influenceurs} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='card alert alert-primary'>
                  <div className='categorie'>
                    <div className='nomNombre'>
                      <span className='nom'>Influenceurs</span>
                      <span className='nombre'>Effectif : {influenceurLength && influenceurLength.value && influenceurLength.value.length}</span>
                    </div>
                    <div className='image'>
                      <Avatar alt="Catégorie" sx={{ width: 40, height: 40 }} src={inf} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-sm-6'>
                <div className='card alert alert-primary'>
                  <div className='categorie'>
                    <div className='nomNombre'>
                      <span className='nom'>Contacts</span>
                      <span className='nombre'>Effectif : {categories && categories.value && categories.value.length}</span>
                    </div>
                    <div className='image'>
                      <Avatar alt="Catégorie" sx={{ width: 40, height: 40 }} src={contact} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='card alert alert-primary'>
                  <div className='categorie'>
                    <div className='nomNombre'>
                      <span className='nom'>Utilisateurs</span>
                      <span className='nombre'>Effectif : {categories && categories.value && categories.value.length}</span>
                    </div>
                    <div className='image'>
                      <Avatar alt="Catégorie" sx={{ width: 40, height: 40 }} src={users} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='charts'>
              <div className='card'>
                <Chart options={options} series={series} type="bar" width={"100%"} height={400} />
              </div>
            </div>
          </div>

          <div className='col-sm-3'>
            <div className='right'>
              <div className='leftside mb-3'>
                <div className='overPlay'></div>
                <img src={marketing} alt="Marketing" />
              </div>

              <div className='leftside'>
                <div className='overPlay'></div>
                <img src={dash} alt="Marketing" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard