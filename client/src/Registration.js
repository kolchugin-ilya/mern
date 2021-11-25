import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setError, setLogin} from "./store/actions/login-actions";
import axios from "axios";

const Registration = () => {
    const {name, password, error} = useSelector(state => state.loginReducer)
    const dispatch = useDispatch()

    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:3001/registration", {
            "name": name,
            "password": password
        }, {withCredentials: true})
            .then(response => {
                    console.log(response)
                }
            )
            .catch(error => {
                dispatch(setError(
                    {
                        message: "Произошла ошибка, проверьте правильность ввода данных!",
                        error: true,
                        style: {backgroundColor: "red"}
                    }))
            });
    }

    return (
        <div>
            {
                "name: " + name + "..." + "password: " + password
            }
            <form method='POST' onSubmit={(event) => handleSubmit(event)}>
                <h3>Registration</h3>
                <input style={error.style}
                       type="text" name="name" value={name} required
                       onChange={(event) => {
                           dispatch(setLogin(event.target.value, password))
                       }}
                />
                <input style={error.style}
                       type="password" name="password" value={password} required
                       onChange={(event) => {
                           dispatch(setLogin(name, event.target.value))
                       }}
                />
                <input type="submit" value="registration"/>
                {
                    (error.error) &&
                    <div>{error.message}</div>
                }
            </form>
        </div>

    );
};

export default Registration;
