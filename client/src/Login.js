import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setLogin} from "./store/actions/login-actions";
import axios from "axios";

const Login = () => {
    const {name, password} = useSelector(state => state.loginReducer)
    const dispatch = useDispatch()

    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:3001/login", {
            "name": name,
            "password": password
        },{ withCredentials: true })
            .then(response => {
                if (response.data.session.userinfo) {
                    localStorage.setItem('userinfo', response.data.session.userinfo)
                    window.location = "/"
                }
                }
            )
            .catch(error => {
                console.log("check login error", error);
            });
    }
    return (
        <div>
                        {
                            "name: " + name + "..." + "password: " + password
                        }
                        <form method='POST' onSubmit={(event) => handleSubmit(event)}>
                            <h3>Sign in</h3>
                            <input type="text" name="name" value={name}
                                   onChange={(event) => {
                                       dispatch(setLogin(event.target.value, password))
                                   }}
                            />
                            <input type="password" name="password" value={password}
                                   onChange={(event) => {
                                       dispatch(setLogin(name, event.target.value))
                                   }}
                            />
                            <input type="submit" value="login"/>
                        </form>
                    </div>

    );
};

export default Login;
