 const chestRed = window.game.items.itemIndex.chestRed
 const chestWood = window.game.items.itemIndex.chestWood
 const chestYellow = window.game.items.itemIndex.chestYellow
 
 EstateSample = {
    id: 'EstateSample', 
    url:"http://localhost:3000/Maps/Estate-Map-Example.jpg",
    transitionPoints: [
        {
            transitionTo: "skullSpaceSuit",
            x: 0,
            y: 600,
            startAtX: 0,
            startAtY: 600
        }
    ],
    mapDimensions: {width: 1200, height: 900},
    mapComponents:
        {
           'chest1': {
                item: chestRed,
                start: 'open',
                status: 0,
                x: 80,
                y: 80
            },
           'chest2': {
                item: chestWood,
                start: 'open',
                status: 0,
                x: 180,
                y: 180
           },
            'chest3': {
                item: chestWood,
                start: 'open',
                status: 0,
                x: 380,
                y: 180
            },
            'chest4' : {
                item: chestWood,
                start: 'open',
                status: 0,
                x: 580,
                y: 180
            }
        },
    mapBounds: [
        [260, 300, 300, 360]
    ]
}
window.game.maps.estateSample = EstateSample  