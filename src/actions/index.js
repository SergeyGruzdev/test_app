const dataLoaded = (items) => {
    return {
        type: 'FETCH_DATA_SUCCESS',
        payload: items
    }
}

const dataRequested = () => {
    return {
        type: 'FETCH_DATA_REQUEST'
    }
}

const dataError = (error) => {
    return {
        type: 'FETCH_DATA_FAILURE',
        payload: error
    }
}

const onMoveLeft = (from, ids) => {
    return {
        type: 'MOVE_DATA_LEFT',
        payload: {
            from: from,
            ids: ids
        }
    }
}

const onMoveRight = (from,ids) => {
    return {
        type: 'MOVE_DATA_RIGHT',
        payload: {
            from: from,
            ids: ids
        }
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
    onMoveLeft,
    onMoveRight
}