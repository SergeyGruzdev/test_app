import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    MOVE_DATA
} from "./action-types"


const dataLoaded = (items) => {
    return {
        type: FETCH_DATA_SUCCESS,
        payload: items
    }
}

const dataRequested = () => {
    return {
        type: FETCH_DATA_REQUEST
    }
}

const dataError = (error) => {
    return {
        type: FETCH_DATA_FAILURE,
        payload: error
    }
}

const onMove = props => {
    return {
        type: MOVE_DATA,
        payload: props
    }
}

const fetchData = (dataService, dispatch) => () => {
    dispatch(dataRequested())
    dataService.getData()
        .then((data) => dispatch(dataLoaded(data)))
        .catch((err) => dispatch(dataError(err)))
}

export {
    fetchData,
    onMove
}