// export const setSession = (userInfo) => (dispatch) => Promise.resolve().then(() => {
//     try {
//         dispatch({type: "session", userInfo: userInfo})
//     } catch (e) {
//         console.log(e)
//     }
// });

export const setSession = (data) => (dispatch) => Promise.resolve().then(() => {
    return dispatch({
        type: "session",
        userInfo: data,
    });
});

export const setLoading = (data) => (dispatch) => Promise.resolve().then(() => {
    return dispatch({
        type: "loading",
        loading: data,
    });
});

// export function setLoading(loading) {
//     return (dispatch) => {
//         try {
//             dispatch({type: "loading", loading: loading})
//         } catch (e) {
//             console.log(e)
//         }
//     }
// }

export function setLogin(name="", password="") {
    return (dispatch) => {
        try {
            dispatch({type: "login", name: name, password: password})
        } catch (e) {
            console.log(e)
        }
    }
}
