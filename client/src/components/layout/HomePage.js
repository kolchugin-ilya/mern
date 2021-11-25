import React, {useEffect, useMemo} from 'react';
import axios from "axios";
import {setLogin} from "../../store/actions/login-actions";
import {useDispatch, useSelector} from "react-redux";
import {fetchData, setData, setSearch, setShow} from "../../store/actions/data-actions";

const HomePage = ({userInfo}) => {
    const {col1,col2,col3,data,show,id} = useSelector(state => state.dataReducer)
    const dispatch = useDispatch();


    const handleClickFetch = () => {
        axios.post("http://localhost:3001/fetchData", {
            "id":id
        }, {withCredentials: true})
            .then(response => {
                dispatch(fetchData(response.data))
                show?dispatch(setShow(false)):dispatch(setShow(true))
            })
            .catch(error => {
                console.log("check login error", error);
            });
    }

    const handleClickInsert = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/insertData", {
            "col1": col1,
            "col2": col2,
            "col3": col3
        }, {withCredentials: true})
            .then(response => {
                dispatch(fetchData(response.data))
            })
            .catch(error => {
                console.log("check login error", error);
            });
    }
    return (
        <div>
            <p>WELCOME  {userInfo.name}  ROLE {userInfo.role} </p>
            <div>
                <input type="text" onChange={(event) => dispatch(setSearch(event.target.value))}/>
                <button onClick={() => handleClickFetch()}>press to fetch</button>
            </div>
            {
                (show) &&
                <table border="1">
                        <tr>
                            <th>id</th>
                            <th>datapos1</th>
                            <th>datapos2</th>
                            <th>datadate</th>
                            <th>active</th>
                        </tr>
                    {
                        data.result.map(el => {
                            return <tr>
                                <td>
                                    <p>{el.id}</p>
                                </td>
                                <td><p>{el.datapos1}</p></td>
                                <td>
                                    <p>{el.datapos2}</p>
                                </td>
                                <td>
                                    <p>{el.datadate}</p>
                                </td>
                                <td>
                                    <p>{el.active}</p>
                                </td>
                            </tr>
                        })
                    }
                    </table>
            }
                    <form style={{marginTop: "15px", display: "flex", flexDirection: "column", width: "250px"}} method='POST' onSubmit={event => handleClickInsert(event)}>
                            <input
                                type="text" name="col1" value={col1}
                                onChange={(event) => {
                                    dispatch(setData(event.target.value,col2,col3))
                                }}
                            />
                            <input
                                type="text" name="col2" value={col2}
                                onChange={(event) => {
                                    dispatch(setData(col1,event.target.value,col3))
                                }}
                            />
                            <input
                                type="date" name="col3" value={col3}
                                onChange={(event) => {
                                    dispatch(setData(col1,col2,event.target.value))
                                }}
                            />
                            <input type="submit" value="insert"/>
                        </form>
        </div>
    );
};

export default HomePage;
