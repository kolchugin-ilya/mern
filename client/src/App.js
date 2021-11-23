import React, { useEffect} from "react";
import axios from "axios";
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./Login";

const App = () => {

    const Logout = () => {
        axios.post("http://localhost:3001/logout", {}, {withCredentials: true})
            .then(response => {
                localStorage.clear()
                    window.location = "/"
            })
            .catch(error => {
                console.log("check login error", error);
            });
        return null;
    }
    useEffect(() => {
        axios.post("http://localhost:3001/isLogin", {}, {withCredentials: true})
            .then(response => {
                if (response.data.user)
                    console.log("Чел есть")
                else {
                    localStorage.clear();
                }
            })
            .catch(error => {
                console.log("check login error", error);
            });
        console.log(localStorage)
    });

        return (
            <div>
                <Switch>
                    <Route exact path="/">
                        {
                            (localStorage.getItem('userinfo'))
                            ?
                            <div>
                                HOMEPAGE
                                WELCOME CHEL
                            </div>
                            :
                            <Redirect to="/login"/>
                        }
                    </Route>
                    <Route exact path="/registration">
                        registration
                    </Route>
                    <Route exact path="/logout">
                        {
                            (localStorage.getItem('userinfo'))
                                ?
                                <Logout/>
                                :
                                <Redirect to="/login"/>
                        }
                    </Route>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Route exact>
                        {
                            (localStorage.getItem('userinfo'))
                                ?
                                <div>404</div>
                                :
                                <Redirect to="/login"/>
                        }
                    </Route>
                </Switch>
            </div>
        );
};

export default App;
