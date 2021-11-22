const initialState = {
    userInfo: "11",
    name: "",
    password: ""
}
export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "session":
            return {...state, userInfo: action.userInfo};
        case "login":
            return {...state, name: action.name, password: action.password};
        default:
            return state;
    }
}
