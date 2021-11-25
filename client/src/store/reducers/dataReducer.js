const initialState = {
    id:"",
    data: "",
    col1: "",
    col2: "",
    col3: "",
    show: false
}

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "insert":
            return {...state, col1: action.col1, col2: action.col2, col3: action.col3};
        case "fetch":
            return {...state, data: action.data};
        case "show":
            return {...state, show: action.show};
        case "search":
            return {...state, id: action.id};
        default:
            return state;
    }
}

