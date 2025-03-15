import {state} from "../State";
import { drawPrerenderedMap } from "./DrawPreRenderedMap";
import { drawSprites } from "./DrawSprites";
import { drawGrid } from "./DrawGrid";

export const draw = {
    scale: 1,
    drawPlayerLayer: () => {
        state.pCtx.clearRect(state.previousPX -5, state.previousPY -5, state.scaledPW + 10, state.scaledPH + 10);   
        state.pCtx.beginPath();
        state.pCtx.rect(state.pX, state.pY , state.scaledPW, state.scaledPH);
        state.pCtx.fillStyle = "red";
        state.pCtx.fill();
        state.pCtx.closePath();
    },
    drawItemLayer: () => {
        drawSprites.calcItemAnimations();
        drawSprites.drawItems();  
    },
    drawMapLayer: () => {
      if(state.scene.mapType === 1){
        // for now we draw all grid related things from this function
        drawGrid()
      } else {
        drawPrerenderedMap()
      }
    },
    
}

