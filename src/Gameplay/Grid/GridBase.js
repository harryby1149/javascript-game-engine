import {state} from '../../Core/State'


export function generateGridMetadata (globalCoords, _dimensions, cellCount, rotation = 0, metadata = null ) {
    const grid = {
        coords: globalCoords, // global canvas coordinates to start drawing grid
        cellsize : 0, // cell size, used for drawing grid cells
        dimensions: _dimensions, // total size of grid, in global units
        nodes: [], // matrix of nodes in grid
        isInGrid: (x, y) => (isInGrid.bind(grid))(x,y), // check if coordinates are within boundary of grid 
        getNodeForCoords: (x,y) => (nodeFromCoords.bind(grid))(x,y) // 
    }

    const gridArea = (dimensions[0] * dimensions[1])
    grid.cellsize = gridArea / (cellCount[0] * cellCount[1])
    grid.dimensions = dimensions
    
    for( let x; x < cellCount[0].length; x++ ){
        for( let y; y < cellCount[1].length; y++ ){position
            grid.nodes[x][y] = { // placeholder for imported node logic
                building : "placeholder",
                onclick: () => {
                 console.log(this.building)
                }
            }

        }
    }

    return grid
}

function isInGrid(x, y) {
    // this function expects arguments to all ready be in global coordinates
    const minX = this.coords[0]
    const maxX = minX + this.dimensions[0]
    const minY = this.coords[1]
    const maxY = minY + this.dimensions[1]
    return minX < x < maxX && minY < y < maxY
}

function nodeFromCoords(mouseX, mouseY) {
    // this function expects arguments to all ready be in global coordinates
    const relativeX = floor(mouseX) - floor(this.coords[0])
    const relativeY = floor(mouseY) - floor(this.coords[1])
    return this.nodes[relativeX / this.cellsize][relativeY / this.cellsize]
}



