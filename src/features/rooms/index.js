import logo from '../../assets/logo.png'
import { Form, InputGroup, Tabs, Tab, Table } from 'react-bootstrap';
import './style.scss'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import BaseLayout from '../../general/layout';
import AppButton from '../../general/components/appButton';
import { useEffect, useState } from 'react';
import ModalCreateRoom from './modalCreateRoom';
import ModalDeleteConfirm from '../../general/components/modalDeleteConfirm';
import roomApi from '../../api/roomApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ModalUpdateRoom from './modalUpdateRoom';

function Rooms() {
    const [showModalCreateRoom, setShowModalCreateRoom] = useState(false)
    const navigate = useNavigate()
    const [rooms, setRooms] = useState([])
    const [showModalDeleteRoom, setShowModalDeleteRoom] = useState(false)
    const [showModalUpdateRoom, setShowModalUpdateRoom] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState(null)


    // ==========================
    const [filter, setFilter] = useState({ date: "2023-04-21", address: "" });
    const [stations, setStations] = useState([]);
    const [violations, setViolations] = useState([
        
    ]);

    // const getViolations = async () => {
    //     try {

    //     } catch (err) {

    //     }
    // }

    //Gọi lúc load trang lần đầu, chỉ gọi 1 lần 
    // useEffect({

    // }, [])

    // useEffect({
    // }, [])

    // const handleSubmit = async () => {

    // }



    const handleGetViolations = async () => {
        try {

        } catch (err) {

        }
    }

    // =================================================================


    const currentHome = JSON.parse(localStorage.getItem('currentHome'))
    const getRoomList = async () => {
        try {
            const res = await roomApi.getRoomList(currentHome?.id)
            setRooms(res?.data?.data);
            localStorage.setItem('roomList', JSON.stringify(res?.data?.data))
        } catch (err) {

        }
    }

    const handleDeleteRoom = async () => {
        try {
            const res = await roomApi.deleteRoom(selectedRoom?.id)
            toast(`Successfully deleted room ${selectedRoom?.name}`, { type: toast.TYPE.SUCCESS })
            setShowModalDeleteRoom(false)
        } catch (err) {
            toast('Error! Try again', { type: toast.TYPE.ERROR })
            setShowModalDeleteRoom(false)
        }
    }

    useEffect(() => {
        getRoomList()
    }, [])

    useEffect(() => {
        getRoomList()
    }, [showModalCreateRoom, showModalDeleteRoom, showModalUpdateRoom])

    return (
        <BaseLayout selected='rooms'>
            <div className='dashboard devices-screen'>
                <div className='d-flex mb-1'>
                    <InputGroup className='w-50'>
                        <Form.Control className='search-bar' placeholder='Search...' />
                        {/* <i class="fas fa-search"></i> */}
                    </InputGroup>
                    <p className='date-today w-50 text-end'>Monday, March 6th 2023</p>

                </div>

                <div className='filter-wrapper'>
                    <input
                        type="date"
                        className='filter-date'
                        value={filter.date}
                        // bắt sự kiện thay đổi filter
                        onChange={(event) => {
                            setFilter(prev => {
                                return {
                                    ...prev,
                                    date: event.target.value
                                }
                            })
                            console.log(filter)
                        }}
                    />
                    <select
                        name="" id=""
                        className="filter-add"
                        onChange={(event) => {
                            setFilter((prev) => {
                                return {
                                    ...prev,
                                    address: event.target.value
                                }
                            })
                            
                            console.log(filter)
                        }}
                    >
                        <option value="lethanhnghi">Lê Thanh Nghị</option>
                        <option value="trandainghia">Trần Đại Nghĩa</option>
                    </select>
                </div>

                <AppButton
                    text='Submit'
                    beforeIcon={<i class="fas fa-plus me-2"></i>}
                    className='btn-viewall d-flex'
                    onClick={handleGetViolations}
                />

                <Table bordered striped hover className="mt-4 text-center">
                    <thead className="text-center">
                        <tr>
                            <th>ID</th>
                            <th>Người vi phạm</th>
                            {/* <th>Total Devices</th> */}
                            <th>Loại xe</th>
                            <th>Biển số xe</th>
                            <th>Thời gian</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {violations?.map((item, index) => (
                            <tr>
                                <td>{item?.id}</td>
                                <td className="text-start">{item?.vehicle?.name} </td>
                                <td className="text-start">{item?.vehicle?.type} </td>
                                <td className="text-start">{item?.vehicle?.serial} </td>
                                <td className="text-start">{item?.time} </td>
                                {/* <td>{item?.totalDevices}</td> */}
                                <td>
                                    <AppButton
                                        text='View Detail'
                                        beforeIcon={<i class="fas fa-plus me-2"></i>}
                                        className='btn-viewall d-flex mx-auto'
                                        onClick={() => navigate('/devices')}
                                    />
                                </td>
                                <td className="text-center">
                                    <i className="fas fa-pencil-alt" onClick={(e) => {
                                        e.preventDefault()
                                        setSelectedRoom(item)
                                        setShowModalUpdateRoom(true)
                                        // handleEditRoom(item)
                                    }}></i>
                                    <i className="fas fa-trash-alt ms-3" onClick={() => {
                                        setSelectedRoom(item)
                                        setShowModalDeleteRoom(true)
                                    }}></i>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </Table>
            </div>

            <ModalCreateRoom
                show={showModalCreateRoom}
                onHide={() => setShowModalCreateRoom(false)}
                homeId={currentHome?.id}
            />

            <ModalUpdateRoom
                show={showModalUpdateRoom}
                onHide={() => setShowModalUpdateRoom(false)}
                updateRoom={selectedRoom}
            />

            <ModalDeleteConfirm
                show={showModalDeleteRoom}
                onHide={() => { setShowModalDeleteRoom(false) }}
                title="Bạn có chắc chắn muốn xóa phòng này?"
                handleDeleteSubmit={handleDeleteRoom}
            />
        </BaseLayout>
    )
}

export default Rooms;