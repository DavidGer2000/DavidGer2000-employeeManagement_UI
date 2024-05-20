import React, { useEffect, useState, } from 'react'
import { API_URL, doApiGet } from '../service/apiService';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import Employee from './employee';
import MyButton from './mybutton';
import Deleting from './deleting';

const NewViewing = () => {
    const EMPLOYEE_PER_PAGE = 6;

    const nav = useNavigate();
    const params = useParams();
    const [query, setQuery] = useSearchParams();

    const [employeeList, setEmployeeList] = useState([]);
    const [visibleList, setVisibleList] = useState();
    const [start, setStart] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(Math.ceil(employeeList.length / EMPLOYEE_PER_PAGE));
    const [activeButton, setActiveButton] = useState(1);
    const [buttonNumber, setButtonNumber] = useState(1);

    const [choice, setChoice] = useState("Name");
    const [serchValue, setSearchValue] = useState();

    const [loading, setLoading] = useState(true);
    const [showDelete, setShowDelete] = useState(false);


    useEffect(() => {
        query.get("serchValue") ? doFilterApi() : doApi();
    }, [page]);

    useEffect(() => {
        setTotalPages(Math.ceil(employeeList.length / EMPLOYEE_PER_PAGE))
        setVisibleList(employeeList.slice(0, EMPLOYEE_PER_PAGE))
    }, [employeeList]);

    useEffect(() => {
        setStart(0)
        setActiveButton(1)
        setButtonNumber(1)
    }, []);



    const doApi = async (_bodyData) => {
        try {
            const url = API_URL + "?page=" + query.get("page");
            const data = await doApiGet(url);
            employeeList.length > 0 ?
                setEmployeeList([...employeeList, ...data]) :
                setEmployeeList(data);
            setLoading(false);
        }
        catch (err) {
            console.log(err);
        }
    }

    const doFilterApi = async (_bodyData) => {
        try {
            const url = API_URL + "?select=" + (serchValue ? choice : query.get("select")) + "&serchValue=" + (serchValue ? serchValue : query.get("serchValue"));
            const data = await doApiGet(url);
            setEmployeeList(data);
            setLoading(false);
            setStart(0)
            setActiveButton(1)
            setButtonNumber(1)
        }
        catch (err) {
            console.log(err);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setQuery(`select=${choice}&serchValue=${serchValue}`)
        doFilterApi()
    }


    const renderEmployees = () => {
        return visibleList.map((item, index) => (
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

    const onPageButtonClick = (pageNum) => {
        const startIndex = (pageNum - 1) * EMPLOYEE_PER_PAGE;
        const endIndex = startIndex + EMPLOYEE_PER_PAGE;
        const tempArr = employeeList.slice(startIndex, endIndex);
        setVisibleList(tempArr);
        setStart(startIndex);
        setActiveButton(pageNum);
        setButtonNumber(pageNum);

        if (pageNum == totalPages) {
            nav(`/viewing?page=${page + 1}`)
            setPage(page + 1)
        }

    }

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
    }

    return (
        <main>
            <div className="container">
                <div className="contaainer-fluid">
                    {loading ? <div>Loading...</div> :
                        <div>
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
                                    disabled={start + EMPLOYEE_PER_PAGE >= employeeList.length}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </main>
    )
}

export default NewViewing