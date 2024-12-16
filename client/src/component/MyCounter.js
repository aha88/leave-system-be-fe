import React, { useMemo } from 'react';
import { CCol } from '@coreui/react';

const MyCounter = ({title,number, btn}) => {
  return (
    <CCol md={3} >
      <div className=' boxcontainer bg-white-border p-2'>
        <div className='top'>
          <h5>{title}</h5>
          <h2>{number}</h2>
        </div>
        {btn ?
        <>
        <div className='border-top-1 text-right p-2'>
          <a className='text-right'><small>View More</small></a>
        </div>
        </>
        :
        ''
      }
      </div>
  </CCol>
)
};

export default MyCounter;
