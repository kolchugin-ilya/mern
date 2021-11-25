import React, { useEffect} from "react";
import axios from "axios";
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./Login";
import {useDispatch, useSelector} from "react-redux";
import {setLoading, setSession} from "./store/actions/login-actions";
import Registration from "./Registration";

const App = () => {
    const { loading, userInfo } = useSelector(state => state.loginReducer)
    const dispatch = useDispatch()

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
                if (response.data.user) {
                    dispatch(setSession({name: response.data.user.name, role: response.data.user.role }))
                }
                else {
                    localStorage.clear();
                }
                dispatch(setLoading(false))
            })
            .catch(error => {
                localStorage.clear();
                dispatch(setLoading(false))
                console.log("check login error", error);
            });
    }, []);

        return (
                (loading)
                ?
                    <div> Идёт загрузка</div>
                :
                <div>
                    <Switch>
                        <Route exact path="/">
                            {
                                (localStorage.getItem('userinfo'))
                                    ?
                                    <div>
                                        <p>WELCOME  {userInfo.name} </p>
                                        <p>role {userInfo.role} </p>
                                    </div>
                                    :
                                    <Redirect to="/login"/>
                            }
                        </Route>
                        <Route exact path="/registration">
                            <Registration/>
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
