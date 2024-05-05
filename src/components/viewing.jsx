import React, { useEffect, useState,  } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../service/apiService';
import EmployeeList from './employeeList';

const Viewing = () => {
  const [arr, setAr] = useState([]);
  const [loading, setLoading] = useState(true);
  
  


  useEffect(() => {
    doApi();
  }, [])

  const doApi = async (_bodyData) => {
    try {
      const url = API_URL;
      const data = await doApiGet(url);
      setAr(data);
      setLoading(false);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
   
    <main>
      <div className="container">
        <div className="container-fluid">{loading ? (
          <div>Loading...</div>
        ) : (<EmployeeList list={arr} />)}
        </div>
      </div>
    </main>

  )
}

export default Viewing