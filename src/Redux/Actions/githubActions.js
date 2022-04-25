import types from "../Constants"
import { githubServices } from "../Services/githubServices"

export const getContributions = (years) => {
    return async (dispatch) => {
        dispatch({
            type: types.REQUEST_GET_CONTRIBUTIONS
        })
        try {
            let { result, error } = await githubServices.getContributions(years)

            if (error) throw error

            return dispatch({
                type: types.SUCCESS_GET_CONTRIBUTIONS,
                payload: result
            })
        } catch (error) {
            console.log(error.message)

            let errorMessage
            if (error.message.includes('Network Error')) errorMessage = "Network error, Enable CORS Extension"
            else errorMessage = error.message

            return dispatch({
                type: types.FAILED_GET_CONTRIBUTIONS,
                message: errorMessage
            })
        }

    }
}