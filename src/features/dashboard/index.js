import avatar from '../../assets/avatar.png'
import './style.scss'
import Chart from './chart';
import BaseLayout from '../../general/layout';
import homeApi from '../../api/homeApi';
import { useEffect, useState } from 'react';
function Dashboard () {
    const currentUser = JSON.parse(localStorage.getItem('currentAccount'))
    const [currentAnalytic, setCurrentAnalytic] = useState({})

    useEffect(() => {
        getCurrentAnalytic()
        setInterval(() => getCurrentAnalytic(), 10000)
    },[])
    
    const getCurrentAnalytic = async () => {
        try {
            const res = await homeApi.getCurrentAnalytic()
            console.log(res)
            setCurrentAnalytic(res?.data?.data)
        } catch (err) {

        }
    }

    useEffect(() => {
        getCurrentAnalytic()
    }, [])

    return (
        <BaseLayout selected='dashboard'>
        <div className='dashboard d-flex justify-content-between'>
            <div className='content'>
                <div className='d-flex mb-1'>
                   
                    <p className='date-today w-50 text-end'>Monday, March 6th 2023</p>
        
                </div>

                <div className='d-flex justify-content-between'>
                    {/* <div className='me-5 w-50'> */}
                        <div className='part'>
                            <i class="fas fa-temperature-high"></i>
                            <div className='ms-5 text-center'>
                                <p className='label'>Temperature</p>
                                <p className='number'>{currentAnalytic?.currentTemp} <sup>o</sup>C</p>
                            </div>
                        </div>
                        <div className='part'>
                            <i class="fas fa-tint"></i>
                            <div className='ms-5 text-center'>
                                <p className='label'>Humidity</p>
                                <p className='number'>{currentAnalytic?.currentHumid} <span style={{fontSize: 20}}>%</span></p>
                            </div>
                        </div>
                    
                </div>
                
                <Chart className='w-100'/>
            </div>
            <div className="my-devices d-flex flex-column p-3 text-center ">
                <img src={avatar} width={120} alt="avatar" />
                <p className='text'>Hi, {currentUser?.fullname}!</p>
                <div className='bg-white' style={{borderRadius: "30px"}}>
                   
                </div>
            </div>
        </div>
        </BaseLayout>
    )
}

export default Dashboard;