import { chest } from "./ItemMetaData";
import {utils} from '../Core/Utils'


export const chestRed = {
        type: 'chest',
        src: 'http://localhost:3000/Items/chests.png',
        metaData: chest,
        animations:{ open: utils.returnAnimationArray(chest, 1)}
    };
export const chestWood = {
        type: 'chest',
        src: 'http://localhost:3000/Items/chests.png',
        metaData: chest,
        animations:{ open: utils.returnAnimationArray(chest, 5)}
    };
export const chestYellow = {
        type: 'chest',
        src: 'http://localhost:3000/Items/chests.png',
        metaData: chest,
        animations: { open: utils.returnAnimationArray(chest, 2)}
    }