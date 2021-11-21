export function setSession(userInfo) {
    return (dispatch) => {
        try {
            dispatch({type: "session", userInfo: userInfo})
        } catch (e) {
            console.log(e)
        }
    }
}

export function setLogin(name="", password="") {
    return (dispatch) => {
        try {
            dispatch({type: "login", name: name, password: password})
        } catch (e) {
            console.log(e)
        }
    }
}