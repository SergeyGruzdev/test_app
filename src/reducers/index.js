import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    MOVE_DATA
} from "../actions/action-types"

const initialState = {
    data: [],
    loading: true,
    error:null
}

const updateData = (data,payload) => {
    const {from, to, ids } = payload
    const newItems = data[from].filter(item => ids.includes(item.id))
    const remainItems = data[from].filter(item => !ids.includes(item.id))
    return {
        ...data,
        [from]  :   [...remainItems],
        [to]    :   [...data[to],...newItems]
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {
                state,
                loading: true,
                error:null
            }
        case FETCH_DATA_SUCCESS:
            return {
                data: action.payload,
                loading: false,
                error: null
            }
        case FETCH_DATA_FAILURE:
            return {
                state,
                loading: false,
                error: action.payload
            }
        case MOVE_DATA:
            return {
                ...state,
                data: updateData(state.data, action.payload)
            }
        default:
            return state
    }
}

export default reducer