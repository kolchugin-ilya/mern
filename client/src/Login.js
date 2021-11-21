// import React, {useEffect} from 'react';
// import {useDispatch, useSelector} from "react-redux";
// import {setLogin, setSession} from "./store/actions/login-actions";
// import axios from "axios";
// import {url} from "./config";
//
// const Login = () => {
//     const {userInfo, name, password} = useSelector(state => state.loginReducer)
//     const dispatch = useDispatch()
//
//     // function validateForm() {
//     //     return name.length > 0 && password.length > 0;
//     // }
//
//     function handleSubmit(event) {
//         event.preventDefault();
//         console.log("press")
//         axios.post('http://localhost:3001/login', {
//             name: name,
//             password: password
//         })
//             .then((response) => {
//                 console.log(response)
//                 // dispatch(setSession(JSON.stringify(response.data.userinfo)))
//             })
//             .catch(error => console.error(`Error: ${error}`))
//     }
//
//     return (
//         <div>
//             {
//                 userInfo
//             }
//             {
//                 "name: " + name + "..." + "password: " + password
//             }
//             <form method='POST' onSubmit={(event) => handleSubmit(event)}>
//                 <h3>Sign in</h3>
//                 <input type="text" name="name" value={name}
//                        onChange={(event) => {
//                            dispatch(setLogin(event.target.value, password))
//                        }}
//                 />
//                 <input type="password" name="password" value={password}
//                        onChange={(event) => {
//                            dispatch(setLogin(name, event.target.value))
//                        }}
//                 />
//                 <input type="submit" value="login"/>
//             </form>
//         </div>
//
//     );
// };
//
// export default Login;
import axios from "axios";
import React, {useEffect} from "react";

const Login = () => {
    useEffect(() => {
        axios.post("http://localhost:3001/login", {
            name: "1", password: "1"}, { withCredentials: true }
        )
            .then(response => {
                    console.log("1")
                }
            )
            .catch(error => {
                console.log("check login error", error);
            });
    })
    return <div>
        Login
    </div>
}
export  default Login;