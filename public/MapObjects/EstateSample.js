 const chestRed = window.game.items.itemIndex.chestRed
 const chestWood = window.game.items.itemIndex.chestWood
 
 EstateSample = {
    id: 'EstateSample', 
    url:"http://localhost:3000/Maps/Estate-Map-Example.jpg",
    linkedMaps: [],
    mapDimensions: {width: 1200, height: 900},
    mapComponents:[
        {
        item: chestRed,
        status: 'closed',
        x: 80,
        y: 80
    },
    {
        item: chestWood,
        status: 'closed',
        x: 180,
        y: 180
    }
    ],
    mapBounds: [
        [260, 300, 300, 360]
    ]
}
window.game.maps = {};
window.game.maps.estateSample = EstateSample  