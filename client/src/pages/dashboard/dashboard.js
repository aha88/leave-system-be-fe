import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import {customersData, sessionV, tokenV } from '@/store/authuser';
import  { useRouter } from 'next/router';
import MyDataTable from '@/component/myTable';
import { CCardTitle, CCol, CContainer, CRow } from '@coreui/react';
import userService from './../../services/userService'; 
import { Col } from 'react-bootstrap';


const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (customersData.value == null ){
           

            const fetchUserData = async () => {
                setLoading(true);
                const token = tokenV.value ?? sessionStorage.getItem('tk');
                const id= sessionStorage.getItem('id');

                try {
                    const userData = await userService.fetchUserData(id, token);  // Call the service
                    setData(userData);  
                    customersData.value = userData
                } catch (err) {
                    setError(err.message);  // Set error state
                } finally {
                    setLoading(false);  // Set loading to false
                }
            };
            
            fetchUserData();
        }
    }, [sessionV.value, tokenV.value, router,loading]);

 

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className='body'>
            <CContainer className='mt-3'>
                <CRow className='mt-3'>
                    <CCol md={12}>
                        <CCardTitle>
                            <h2>
                                Dashboard
                            </h2>
                        </CCardTitle>
                    </CCol>
                </CRow>
                <CRow>
                    <Col>
                        {/* {JSON.stringify(data[0].data[0])} */}
                    </Col>
                </CRow>
            </CContainer>
        </div>
    );
};

export default Dashboard;

export async function getServerSideProps(context) {

    const data=[];
    return {
        props: {
            data, // Pass data as props to the page
        },
    };

}