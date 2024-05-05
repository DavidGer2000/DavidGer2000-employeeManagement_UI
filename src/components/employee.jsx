import React from 'react'
import { NavLink } from 'react-router-dom';


const Employee = (props) => {

    const deleteid =()=>{
      props.setshowDelete(true)
      localStorage.setItem("id", props._id)
    }

    return (
        <tr>
            <th scope="row">{props.i}</th>
            <td>{props.IDentify}</td>
            <td>{props.Name}</td>
            <td>{props.Position}</td>
            <td>{props.Salary}</td>
            <td>
                <button className='bg-danger' onClick={deleteid}>X</button>
                <button className='bg-dark ms-2 text-light'><NavLink className="nav-link fw-bolder" to={"/updating/"+props._id}>Edit</NavLink></button>
            </td>
        </tr>
    )
}
export default Employee