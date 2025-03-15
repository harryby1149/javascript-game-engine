import {state} from "../State"
import { clearExistingMap } from "./DrawPreRenderedMap"

export const drawGrid = () => {
    const currentScene = state.scene
    clearExistingMap(currentScene, state.scene.previousScene);
    const grid = currentScene.grid;
    const ctx = state.bgCtx;
    const{nodes, coords, cellsize} = grid;
    console.log("drawing grid")
    console.log(coords)
    console.log(cellsize)
    console.log(state.scene.display)
    console.log(nodes)
    ctx.beginPath();
    ctx.moveTo(coords[0], coords[1])
    for (let x = 0; x < nodes.length; x++) {
        for(let y = 0; y < nodes[x].length; y ++){
          ctx.rect(coords[0] + (x * cellsize), coords[1] + (y*cellsize), cellsize, cellsize)
        }
    }
    ctx.strokeStyle = "white";
    ctx.lineWidth = 8;
    console.log("calling stroke")
    ctx.stroke();
}
/**
 * 	draw_line(Vector2(0,0), Vector2(0, max_y_coord), Color.BLACK, 1)
	draw_line(Vector2(0,0), Vector2(max_x_coord, 0), Color.BLACK, 1)
	draw_line(Vector2(0,max_y_coord), Vector2(max_x_coord, max_y_coord), Color.BLACK, 1)
	draw_line(Vector2(max_x_coord, 0), Vector2(max_x_coord, max_y_coord), Color.BLACK, 1)

 */