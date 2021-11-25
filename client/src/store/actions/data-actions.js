export function setData(col1,col2,col3) {
    return (dispatch) => {
        try {
            dispatch({type: "insert", col1: col1, col2:col2, col3:col3})
        } catch (e) {
            console.log(e)
        }
    }
}

export function fetchData(data) {
    return (dispatch) => {
        try {
            dispatch({type: "fetch", data:data})
        } catch (e) {
            console.log(e)
        }
    }
}

export function setShow(show) {
    return (dispatch) => {
        try {
            dispatch({type: "show", show: show})
        } catch (e) {
            console.log(e)
        }
    }
}


export function setSearch(id) {
    return (dispatch) => {
        try {
            dispatch({type: "search", id: id})
        } catch (e) {
            console.log(e)
        }
    }
}
