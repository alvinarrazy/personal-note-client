import types from "../Constants";

const initialState = {
    agendaLists: [],
    agendaAdding: false,
    agendaHistory: []
}

export const agendaReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_INITIAL: {
            return {
                ...state,
                agendaLists: action.agendaListsData
            }
        }
        case types.REQUEST_ADD_AGENDA:
            return {
                ...state,
                agendaAdding: true
            }
        case types.SUCCESS_ADD_AGENDA:
            return {
                ...state,
                agendaLists: action.payload,
                agendaAdding: false
            }
        // case types.REQUEST_COMPLETED_TASK:
        //     return {
        //         ...state,
        //         agendaAdding: true
        //     }
        // case types.SUCCESS_COMPLETED_TASK:
        //     return {
        //         ...state,
        //         agendaLists: action.payload,
        //         agendaAdding: false
        //     }
        default:
            return state
    }
}