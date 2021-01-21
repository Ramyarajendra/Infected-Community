/**
 * @file index.js
 * @description export actions from all files here.
 */
import { ADD_GRID, NO_DAYS, RESET, SET_MATRIX } from './types';

export const initialMatrix = ( matrix) =>  dispatch => {
    dispatch({
        type: SET_MATRIX,
        payload: matrix
    })
}

export const getNumberOfDays =  ( matrix ) => async dispatch => {
    try {
        dispatch(reset())
        const grid = JSON.parse(JSON.stringify(matrix))
        const height = grid.length;
        const width = grid[0].length;
        let healthy = 0;
        const changedIndex = [];
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (grid[i][j] === 2) changedIndex.push({x:i, y: j});
                if (grid[i][j] === 1) healthy++;
            }
        }
        let day = 0;
        while (changedIndex.length) {
            const arr = []
            for(let i =0 ; i< changedIndex.length; i++){
                arr.push(changedIndex[i])
            }
            const modifiedGrid = JSON.parse(JSON.stringify(grid))
            await new Promise(resolve => setTimeout(() =>{ 
                resolve()
                 dispatch({
                type: ADD_GRID,
                payload: { arr, modifiedGrid, day }
            })}, 1000))
            const size = changedIndex.length;
            for (let i = 0; i < size; i++) {
                const {x, y} = changedIndex.shift();
                if (x - 1 >= 0 && grid[x - 1][y] === 1) {
                    grid[x - 1][y] = 2;
                    healthy--;
                    changedIndex.push({x: x-1, y});
                }
                if (x + 1 < height && grid[x + 1][y] === 1) {
                    grid[x + 1][y] = 2;
                    healthy--;
                    changedIndex.push({x:x+1, y});
                }
                if (y - 1 >= 0 && grid[x][y - 1] === 1) {
                    grid[x][y - 1] = 2;
                    healthy--;
                    changedIndex.push({x, y: y-1});
                }
                if (y + 1 < width && grid[x][y + 1] === 1) {
                    grid[x][y + 1] = 2;
                    healthy--;
                    changedIndex.push({x, y:y+1});
                }
            }
            if (changedIndex.length > 0) day++;
        }
        dispatch({
            type: NO_DAYS,
            payload: healthy === 0 ? day : -1
        })
    } catch (error) {
        console.log(error)
    }
}

export const reset = () => dispatch => {
    dispatch({
        type: RESET
    })
}