import {state} from '../../Core/State'

const GRID_SHAPES = {
    square: 1,
    rectangle: 2,
    triangle: 3
}

function generateGridMetadata (globalPosition, dimensions, rotation = 0, shape = square , metadata = null ) {
    const grid = {
        positon: globalPosition,
        cellsize : 0,
        dimensions: [],
        nodes: {}
    }
}

func