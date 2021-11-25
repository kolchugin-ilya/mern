import React, { useEffect} from "react";
import axios from "axios";
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./components/layout/Login";
import {useDispatch, useSelector} from "react-redux";
import {setLoading, setSession} from "./store/actions/login-actions";
import Registration from "./components/layout/Registration";
import HomePage from "./components/layout/HomePage";
import PageNotFound from "./components/layout/PageNotFound";
import Logout from "./components/layout/Logout";
import Loading from "./components/layout/Loading";

const App = () => {
    const { loading, userInfo } = useSelector(state => state.loginReducer)
    const dispatch = useDispatch()

    const isLogin = () => {
        axios.post("http://localhost:3001/isLogin", {}, {withCredentials: true})
            .then(response => {
                if (response.data.user) {
                    dispatch(setSession({name: response.data.user.name, role: response.data.user.role }))
                }
                else {
                    localStorage.clear();
                    dispatch(setSession({name: "", role: ""}))
                }
                dispatch(setLoading(false))
            })
            .catch(error => {
                localStorage.clear();
                dispatch(setSession({name: "", role: ""}))
                dispatch(setLoading(false))
                console.log("check login error", error);
            });
    }

    useEffect(() => {
        isLogin();
    }, []);

        const PrivateRoute = ({component: Component, props}) => {
            return  <Route {...props}>
                {
                    (userInfo.name)
                        ?
                        <Component userInfo={userInfo}/>
                        :
                        <Redirect to="/login"/>
                }
            </Route>
        }

        return (
                (loading)
                ?
                    <Loading/>
                :
                <div>
                    <Switch>
                        <Route exact path="/registration">
                            <Registration/>
                        </Route>
                        <Route exact path="/login">
                            <Login/>
                        </Route>
                        <PrivateRoute exact component={HomePage} path="/"/>
                        <PrivateRoute exact component={Logout} path="/logout"/>
                        <PrivateRoute component={PageNotFound}/>
                    </Switch>
                </div>
        );
};

export default App;
