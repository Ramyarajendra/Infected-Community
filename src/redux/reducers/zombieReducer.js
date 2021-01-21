import { ADD_GRID, NO_DAYS,RESET, SET_MATRIX } from "../actions/types";


const initialState = {
    gridState: [],
    gridSteps: null,
    numofDays: null,
    initialGrid : []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MATRIX:
            return{
                ...state,
                initialGrid: action.payload
            }
        case ADD_GRID:
            return {
                ...state,
                gridState : [...state.gridState,action.payload],
                gridSteps: action.payload
            }
        case NO_DAYS:
            return {
                ...state,
                numofDays : action.payload
            }
        case RESET:
            return initialState
        default:
            return state
    }
}