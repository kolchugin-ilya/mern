import React, {useEffect, useRef, useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setLoading, setSession} from "./store/actions/login-actions";
import Login from "./Login";

const Logout = () => {
    axios.post("http://localhost:3001/logout", {}, {withCredentials: true})
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
    const {userInfo, loading} = useSelector(state => state.loginReducer)
    const dispatch = useDispatch()

    const checkLoginStatus = () => {
        dispatch(setLoading(true));
        axios.post("http://localhost:3001/isLogin", {}, {withCredentials: true})
            .then(response => {
                dispatch(setLoading(false));
                    if (response.data.user)
                        dispatch(setSession(response.data.user))
                }
            )
            .catch(error => {
                console.log("check login error", error);
                dispatch(setLoading(false));
            });
    }

    useEffect(() => {
        checkLoginStatus();
    }, [])
    const HomePage = ({userinfo}) => {
        return <div>
            {/*{*/}
            {/*    (userinfo === "") &&*/}
            {/*    <Redirect to="/login"/>*/}
            {/*}*/}
            homePage {userinfo}
        </div>
    }
    const NotFoundPage = () => {
        return <div>404</div>
    }
    // const PrivateRoute = ({component: Component, ...props}) => {
    //     return <Route exact {...props}>
    //         {
    //             (userInfo === "")
    //                 ?
    //                 <Redirect to="/login"/>
    //                 :
    //                 <Component props={props}/>
    //         }
    //     </Route>
    // }
    return (
        <div>
            {loading ? (
                <div>...Data Loading.....</div>
            ) : (
                <div>
                    <Switch>
                        <Route exact path="/">
                            {
                                (userInfo === "")
                                ?
                                    <HomePage userinfo={userInfo}/>
:
                                    <Redirect to="/login"/>
                            }
                        </Route>
                        <Route exact path="/login">
                            <Login/>
                        </Route>
                        <Route exact path="/registration">
                            registration
                        </Route>
                        <Route exact path="/logout">
                            <Logout/>
                        </Route>
                        <Route exact>
                            <NotFoundPage/>
                        </Route>
                    </Switch>
                </div>
            )}
        </div>

    );
};

export default App;
