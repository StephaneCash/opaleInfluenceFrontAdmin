import React, { useContext, useState } from 'react'
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import { ContextApp } from '../../context/AppContext'
import "./Dashboard.css"

const Dashboard = () => {
  const { userConnected } = useContext(ContextApp);
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
                <div className='card'></div>
              </div>
              <div className='col-sm-6'>
                <div className='card'></div>
              </div>
            </div>

            <div className='row'>
              <div className='col-sm-6'>
                <div className='card'></div>
              </div>
              <div className='col-sm-6'>
                <div className='card'></div>
              </div>
            </div>

            <div className='charts'>
              <div className='card'></div>
            </div>
          </div>

          <div className='col-sm-3 leftside'>
            CARDS3
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard