import React from 'react'
import { API_URL, doApiMethod } from '../service/apiService';


const Deleting = (props) => {
  
  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    const employee_Id = localStorage.getItem("id");
    doApiDelete(employee_Id)
  }

  const doApiDelete = async(employee_Id) => {
    try{
      const url = API_URL+"/"+employee_Id;
      const data = await doApiMethod(url, "DELETE");
      if(data){
        alert("Employee delete")
        console.log(data);
      }
    }
    catch(err){
      console.log(err);
    }
  }


  return (
    <div className='popup_delete'>
      <div className='inside_popup'>
        <form onSubmit={onSubForm}>
          <h2>Delete</h2>
          <label>ar you shure do yo want delete?:</label>
          <div>
          <button className='btn btn-success mt-3 me-2' >Delete</button>
          <button onClick={() => {
           props.setshowDelete(false)
          }} type="button" className='btn btn-danger mt-3 '>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Deleting