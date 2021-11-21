import React, {useEffect, useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setSession} from "./store/actions/login-actions";
import Login from "./Login";

const Logout = () => {
    axios.post("http://localhost:3001/logout", {}, { withCredentials: true })
        .then(response => {
            console.log(response)
            }
        )
        .catch(error => {
            console.log("check login error", error);
        });
    return <div>
        Logout
    </div>
}




const App = () => {
    const {userInfo} = useSelector(state => state.loginReducer)
    const dispatch = useDispatch()

    const checkLoginStatus = () => {
        axios.post("http://localhost:3001/isLogin", {},{ withCredentials: true })
            .then(response => {
                if (response.data.user)
                dispatch(setSession(response.data.user))
            }
            )
            .catch(error => {
                console.log("check login error", error);
            });
    }
    useEffect(() => {
        // checkLoginStatus()
    },[])

    return (
        <div>
            <Switch>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route exact path="/logout">
                    <Logout/>
                </Route>
                <Route exact path="/registration">
                    registration
                </Route>
                <Route exact path="/">
                    {
                        userInfo
                    }
                </Route>
                <Route exact>
                    404
                </Route>
            </Switch>
        </div>
    );
};

export default App;
