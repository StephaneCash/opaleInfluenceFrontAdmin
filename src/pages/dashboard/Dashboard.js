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
import { Avatar, Button } from '@mui/material';
import Chart from "react-apexcharts";
import { FaArrowRight } from 'react-icons/fa';

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

function valuetext(value) {
  return `${value}°C`;
}

const Dashboard = () => {
  const { userConnected } = useContext(ContextApp);
  const categories = useSelector((state) => state.categories);
  const usersLength = useSelector((state) => state.users);
  const contacts = useSelector((state) => state.contacts);

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
  ];

  const series1 = [
    {
      name: "Transactions",
      data: [5, 7, 8, 4]
    },
    {
      name: "Transactions",
      data: [3, 2, 6, 4]
    },
  ];

  console.log(userConnected)

  const value = 0.66;

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
                <div className='alert alert-primary cardAlert'>
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
                <div className='alert alert-primary cardAlert'>
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
                <div className='alert alert-primary cardAlert'>
                  <div className='categorie'>
                    <div className='nomNombre'>
                      <span className='nom'>Contacts</span>
                      <span className='nombre'>Effectif : {contacts && contacts.value && contacts.value.length}</span>
                    </div>
                    <div className='image'>
                      <Avatar alt="Catégorie" sx={{ width: 40, height: 40 }} src={contact} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-sm-6'>
                <div className=' alert alert-primary cardAlert'>
                  <div className='categorie'>
                    <div className='nomNombre'>
                      <span className='nom'>Utilisateurs</span>
                      <span className='nombre'>Effectif : {usersLength && usersLength.value && usersLength.value.length}</span>
                    </div>
                    <div className='image'>
                      <Avatar alt="Catégorie" sx={{ width: 40, height: 40 }} src={users} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='charts'>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className='col-sm-6'>
                  <div className='card' style={{ background: "#efefef", border: "1px solid #efefef" }}>
                    <Chart options={options} series={series1} type="bar" width={"100%"} height={400} />
                  </div>
                </div>
                <div className='col-sm-6'>
                  <div className='card' style={{ background: "#efefef", border: "1px solid #efefef" }}>
                    <Chart options={options} series={series} type="area" width={"100%"} height={400} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-sm-3'>
            <div className='right'>
              <div className='leftside mb-3'>
                <div className='overPlay'></div>
                <img src={marketing} alt="Marketing" />
                <div className='content'>
                  <div className='card'>
                    <div className='card-header'>
                      <span>Articles (56)</span>
                    </div>
                    <div className='card-body' style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <Button variant="contained" color='primary' style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px"
                      }}>
                        Découvrir <FaArrowRight />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='leftside'>
                <div className='overPlay'></div>
                <img src={dash} alt="Marketing" />
                <div className='content'>
                  <div className='card'>
                    <div className='card-header'>
                      <span>Médias (520)</span>
                    </div>

                    <div className='card-body' style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <Button variant="contained" color='primary' style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px"
                      }}>
                        Découvrir <FaArrowRight />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard