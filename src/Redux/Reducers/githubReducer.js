import types from "../Constants";

const initialState = {
    isGettingContribution: false,
    getContributionSuccess: false,
    getContributionFailed: false,
    getContributionMessage: null,
    contributionData: {},
}

export const githubReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REQUEST_GET_CONTRIBUTIONS:
            return{
                ...state,
                isGettingContribution: true,
                getContributionSuccess: false,
                getContributionFailed: false,
                getContributionMessage: null,
            }
        case types.SUCCESS_GET_CONTRIBUTIONS:
            return{
                ...state,
                isGettingContribution: false,
                getContributionSuccess: true,
                getContributionFailed: false,
                getContributionMessage: null,
                contributionData: action.payload
            }
        case types.FAILED_GET_CONTRIBUTIONS:
            return{
                ...state,
                isGettingContribution: false,
                getContributionSuccess: false,
                getContributionFailed: true,
                getContributionMessage: action.message,
            }
        default:
            return state
    }
}