import React, { useState } from 'react';
import Employee from './employee';
import MyButton from './mybutton';
import Deleting from './deleting';

const EmployeeList = (props) => {
    const employeeList = props.list || []; // Default empty array if props.list is undefined
    const EMPLOYEE_PER_PAGE = 6;

    // State variables
    const [arr, setArr] = useState(employeeList.slice(0, EMPLOYEE_PER_PAGE));
    const [start, setStart] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [choice, setChoice] = useState('Name');
    const [filterArr, setFilterArr] = useState(employeeList);
    const [totalPages, setTotalPages] = useState(Math.ceil(employeeList.length / EMPLOYEE_PER_PAGE));
    const [activeButton, setActiveButton] = useState(1);
    const [buttonNumber, setButtonNumber] = useState(1);
    const [showDelete, setShowDelete] = useState(false);

    // Filter the employee list based on search criteria
    const filterArray = () => {
        let newArray = employeeList.filter((item) => {
            if (choice === 'Name') {
                return item.Name.toLowerCase().includes(searchValue.toLowerCase());
            }
            if (choice === 'IDentify') { 
                return item.IDentify.toLowerCase().includes(searchValue.toLowerCase()); 
            }
            if (choice === 'Position'){
                return item.Position.toLowerCase().includes(searchValue.toLowerCase());
            } 
            if (choice === 'Salary') {
                const salaryNumber = Number(item.Salary.replace(',', '').replace('$', ''));
                return !isNaN(salaryNumber) && salaryNumber >= Number(searchValue);
            }
        });
        return newArray;
    };

    // Handle form submission for filtering
    const handleSubmit = (e) => {
        e.preventDefault();
        const filteredArr = filterArray();
        setArr(filteredArr.slice(0, EMPLOYEE_PER_PAGE));
        setFilterArr(filteredArr);
        setTotalPages(Math.ceil(filteredArr.length / EMPLOYEE_PER_PAGE));
    };

    // Handle pagination button click
    const onPageButtonClick = (pageNum) => {
        const startIndex = (pageNum - 1) * EMPLOYEE_PER_PAGE;
        const endIndex = startIndex + EMPLOYEE_PER_PAGE;
        const tempArr = filterArr.slice(startIndex, endIndex);
        setArr(tempArr);
        setStart(startIndex);
        setActiveButton(pageNum);
        setButtonNumber(pageNum);
    };

    // Render the employee list
    const renderEmployees = () => {
        return arr.map((item, index) => (
            <Employee
                key={item._id}
                _id={item._id}
                i={index + 1}
                IDentify={item.IDentify}
                Name={item.Name}
                Position={item.Position}
                Salary={item.Salary}
                setshowDelete={setShowDelete}
            />
        ));
    };

    // Render pagination buttons
    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <MyButton
                    key={i}
                    onEach={onPageButtonClick}
                    number={i}
                    activeButton={activeButton}
                />
            );
        }
        return buttons;
    };

    // JSX rendering
    return (
        <>
            {showDelete && <Deleting setshowDelete={setShowDelete} />}
            <form onSubmit={handleSubmit} className='text-center w-100 pt-4 mt-0'>
                <input
                    onChange={(e) => setSearchValue(e.target.value)}
                    type='text'
                    className='w-50 my-1 mx-auto'
                />
                <select onChange={(e) => setChoice(e.target.value)} className='my-0 mx-2'>
                    <option value='Name'>Name</option>
                    <option value='IDentify'>ID</option>
                    <option value='Position'>Position</option>
                    <option value='Salary'>Salary</option>
                </select>
                <button className='btn btn-warning btn-sm my-0 mx-2'>Search</button>
            </form>
            <div className='container text-center'>
                <div className='table-responsive'>
                    <table className='table table-dark table-striped'>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>ID</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Position</th>
                                <th scope='col'>Salary</th>
                                <th scope='col'>Del/Edit</th>
                            </tr>
                        </thead>
                        <tbody>{renderEmployees()}</tbody>
                    </table>
                </div>
            </div>
            <div className='d-flex justify-content-center pb-4 w-100'>
                <button
                    className='btn btn-dark m-2'
                    onClick={() => onPageButtonClick(buttonNumber - 1)}
                    disabled={start === 0}
                >
                    Back
                </button>
                {renderPaginationButtons()}
                <button
                    className='btn btn-dark m-2'
                    onClick={() => onPageButtonClick(buttonNumber + 1)}
                    disabled={start + EMPLOYEE_PER_PAGE >= filterArr.length}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default EmployeeList;
