const initialState = {
    data: [],
    loading: true,
    error:null
}

const updateData = (data,payload, quantity) => {
    const {from, ids } = payload
    const keys = Object.keys(data)
    const idx = keys.findIndex(item => item === from)
    const to = keys[idx + quantity]
    const items = data[from].filter(item => ids.some(f => f === item.id))
    const prevItems = data[from].filter(item => !ids.some(f => f === item.id))
    return {
        ...data,
        [from]  :   [...prevItems],
        [to]    :   [...data[to],...items]
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_DATA_REQUEST':
            return {
                state,
                loading: true,
                error:null
            }
        case 'FETCH_DATA_SUCCESS':
            //return {...action.payload, loading:false,error:null}
            return {
                data: action.payload,
                loading: false,
                error: null
            }
        case 'FETCH_DATA_FAILURE':
            return {
                state,
                loading: false,
                error: action.payload
            }
        case 'MOVE_DATA_LEFT':
            return {
                ...state,
                data: updateData(state.data, action.payload, -1)
            }

        case 'MOVE_DATA_RIGHT':
            return {
                ...state,
                data: updateData(state.data, action.payload, 1)
            }
        default:
            return state
    }
}

export default reducer