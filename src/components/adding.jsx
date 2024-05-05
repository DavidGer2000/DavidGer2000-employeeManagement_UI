import React from 'react'
import { useForm } from "react-hook-form"
import { API_URL, doApiMethod } from '../service/apiService'

const Adding = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();


  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    doApiPost(_bodyData)
  }

  const doApiPost = async (_bodyData) => {
    try {
      const url = API_URL;
      const data = await doApiMethod(url, "POST", _bodyData);
      if (data._id) {
        alert("employee added")
        reset();
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
          <h1 className="w-50 m-auto">Add new employee</h1>
          <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 m-auto'>

            <label>ID</label>
            <input {...register("IDentify", {
              required: "ID is required",
              minLength: { value: 9, message: "ID must be at least 9 characters long" }
            })} className="form-control" type="text" />
            {errors.IDentify && <div className="text-danger">{errors.IDentify.message}</div>}

            <label>Name</label>
            <input {...register("Name", {
              required: "Name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters long" }
            })} className="form-control" type="text" />
            {errors.Name && <div className="text-danger">{errors.Name.message}</div>}

            <label>Position</label>
            <input {...register("Position", {
              required: "Position is required"
            })} className="form-control" type="text" />
            {errors.Position && <div className="text-danger">{errors.Position.message}</div>}

            <label>Salary</label>
            <input {...register("Salary", {
              required: "Salary is required",
              min: { value: 1, message: "Salary must be at least 1" }
            })} className="form-control" type="text" />
            {errors.Salary && <div className="text-danger">{errors.Salary.message}</div>}

            <button className='btn btn-success mt-3'>Add Employee</button>
          </form>

        </div>
      </div>
    </main>
  )
}

export default Adding