import { generateGridMetadata, isInGrid, nodeFromCoords } from "../Gameplay/Grid/GridBase.js"

"use strict"
export const CitybuilderSample = {
    id: 'citybuilderSample', 
    url: false,
    mapDimensions: {width: 1200, height: 900},
    mapBounds: [
        [260, 300, 300, 360]
    ],
    grid: generateGridMetadata(
        [0, 0], 
        [100, 200],
        [6, 12]
    ),
    mapType: 1,
    mode: {
        id: "grid", 
        inputs:{ 
            setInput: () =>{
                console.log("setting grid inputs"),
                document.addEventListener("click", (e) => {
                    if(isInGrid(CitybuilderSample.grid, e.clientX, e.clientY)) {
                        nodeFromCoords(CitybuilderSample.grid,e.clientX, e.clientY).onClick()
                    }
                }, false);
            },
            clearInput: () => {console.log("clearing inputs")}
        },
        calcChanges: () => {}
    } //placeholder
}