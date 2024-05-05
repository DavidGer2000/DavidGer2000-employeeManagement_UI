import React, { useEffect, useState} from 'react'
import { useForm} from "react-hook-form"
import { useParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../service/apiService'

const Updating = () => {
  // Initialize form hooks and state variables
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData,setFormData] = useState({});
  const params = useParams();

  
  useEffect(() => {
    doApi();
  },[])

  // Fetch employee data from API based on id parameter
  const doApi = async() => {
    try {
      const url = API_URL+"/"+params["id"];
      const data = await doApiGet(url);
      setFormData(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Handle form submission for updating employee data
  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    doApiPut(_bodyData)
  }

   // Send PUT request to API to update employee data
  const doApiPut = async (_bodyData) => {
    try {
      const url = API_URL+"/"+params["id"];
      const data = await doApiMethod(url, "PUT", _bodyData);
      if (data.acknowledged) {
        alert("employee update")
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <main>
      <div className='container d-flex justify-content-center'>
        <div className="contain-fluid w-100">
          <h1 className="w-50 m-auto">Update employee</h1>
          {formData.Name?
          <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 m-auto'>

            <label>ID</label>
            <input defaultValue={formData.IDentify} {...register("IDentify", { required: true, minLength: 9 })} className="form-control" type="text" />
            {errors.name && <div className="text-danger">* Enter valid ID</div>}

            <label>Name</label>
            <input defaultValue={formData.Name} {...register("Name", { required: true, minLength: 2 })} className="form-control" type="text" />
            {errors.name && <div className="text-danger">* Enter valid name (min 2 chars)</div>}

            <label>Position</label>
            <input defaultValue={formData.Position} {...register("Position")} className="form-control" type="text" />

            <label>Salary</label>
            <input defaultValue={formData.Salary} {...register("Salary")} className="form-control" type="text" />
            <button className='btn btn-success mt-3'>Update</button>
          </form>
           : <h2>Loading...</h2>
          }
        </div>
      </div>
    </main>
  )
}

export default Updating