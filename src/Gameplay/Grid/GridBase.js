"use strict";

export function generateGridMetadata (globalCoords, _dimensions, cellCount, rotation = 0, metadata = null ) {
    const grid = {
        coords: globalCoords, // global canvas coordinates to start drawing grid
        cellsize : 0, // cell size, used for drawing grid cells
        dimensions: _dimensions, // total size of grid, in global units
        nodes: [], // matrix of nodes in grid
        isInGrid: (x, y) => isInGrid(this,x,y), // check if coordinates are within boundary of grid 
        getNodeForCoords: (x,y) => nodeFromCoords(this,x,y) // 
    }
    const buildingNames = ["house", "farm", "doghouse","lumbermill", "other lumbermill", "whaterwheel", "windmill", "tanner","poleturner","carpenter"]
    const gridArea = (_dimensions[0] * _dimensions[1])
    grid.cellsize = Math.floor((gridArea / (cellCount[0] * cellCount[1])) /4) //assuming square cells
    for( let x = 0; x < cellCount[0]; x++ ){
        grid.nodes[x] = [];
        for( let y = 0; y < cellCount[1]; y++ ){
            grid.nodes[x][y] = { // placeholder for imported node logic
            
                building : buildingNames[Math.floor(Math.random()*10)],
                onClick: () => {
                    console.log("in the on click function")
                    console.log(grid.nodes[x][y].building)
                }
            }

        }
    }

    return grid
}

export function isInGrid(grid, x, y) {
    // this function expects arguments to all ready be in global coordinates
    const minX = grid.coords[0]
    const maxX = minX + grid.dimensions[0]
    const minY = grid.coords[1]
    const maxY = minY + grid.dimensions[1]
    return minX < x < maxX && minY < y < maxY
}

export function nodeFromCoords(grid,mouseX, mouseY) {
    // this function expects arguments to all ready be in global coordinates
    const relativeX = Math.floor(mouseX) - Math.floor(grid.coords[0])
    const relativeY = Math.floor(mouseY) - Math.floor(grid.coords[1])
    console.log(relativeX /grid.cellsize + ", " + relativeY / grid.cellsize);
    console.log(grid.cellsize)
    return grid.nodes[Math.floor(relativeX / grid.cellsize)][Math.floor(relativeY / grid.cellsize)]
}



