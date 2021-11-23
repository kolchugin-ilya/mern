import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";

const HomePage = () => {
    const {userInfo} = useSelector(state => state.loginReducer)
    // const dispatch = useDispatch()
    console.log(userInfo + "h")
    return (
        <div>
            {/*<Switch>*/}
            {/*    <Route>*/}
                    {
                        userInfo
                            ?
                            <div>Welcome {userInfo}</div>
                            :
                            // <Redirect to="/login"/>
                            <div>Welcome {userInfo}</div>
                    }
                {/*</Route>*/}
            {/*</Switch>*/}
        </div>
    );
};

export default HomePage;