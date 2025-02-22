import { generateGridMetadata } from "../Gameplay/Grid/GridBase"
export const CitybuilderSample = {
    id: 'citybuilderSample', 
    url: false,
    mapDimensions: {width: 1200, height: 900},
    mapBounds: [
        [260, 300, 300, 360]
    ],
    grid: generateGridMetadata(
        [0, 0], 
        [600, 450],
        16
    ),
    mode: "grid" //placeholder
}