import types from "../Constants"

export const addNewAgenda = (newAgenda) => {
    return async (dispatch) => {
        dispatch({
            type: types.REQUEST_ADD_AGENDA
        })
        try {
            let result = newAgenda

            let localData = JSON.parse(localStorage.getItem('agendaData'))

            let newData = localData?.length ? localData : []

            newData.push(result)

            localStorage.setItem('agendaData', JSON.stringify(newData))

            return dispatch({
                type: types.SUCCESS_ADD_AGENDA,
                payload: newData
            })
        } catch (error) {
            console.log(error.message)

            let errorMessage
            if (error.message.includes('Network Error')) errorMessage = "Network error, Enable CORS Extension"
            else errorMessage = error.message

            return dispatch({
                type: types.FAILED_ADD_AGENDA,
                message: errorMessage
            })
        }

    }
}

export const completingAgenda = (agendaIndex) => {
    return async (dispatch) => {
        dispatch({
            type: types.REQUEST_ADD_AGENDA
        })
        try {
            let localData = JSON.parse(localStorage.getItem('agendaData'))

            let newData = localData?.length ? localData : []

            let filteredData = newData.filter((v, index) => {
                return index !== agendaIndex
            })

            localStorage.setItem('agendaData', JSON.stringify(filteredData))

            return dispatch({
                type: types.SUCCESS_ADD_AGENDA,
                payload: filteredData
            })
        } catch (error) {
            console.log(error.message)

            let errorMessage
            if (error.message.includes('Network Error')) errorMessage = "Network error, Enable CORS Extension"
            else errorMessage = error.message

            return dispatch({
                type: types.FAILED_ADD_AGENDA,
                message: errorMessage
            })
        }

    }
}