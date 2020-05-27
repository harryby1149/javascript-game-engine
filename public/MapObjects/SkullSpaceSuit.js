SkullSpaceSuit = {
   id: 'SkullSpaceSuit', 
   url:"http://localhost:3000/Maps/skullSpaceSuit.jpg",
   transitionPoints: [ 
      { transitionTo: 'estateSample',
        x: 900,
        y: 600,
        startAtX: 0,
        startAtY: 0
        }
    ],
   mapDimensions: {width: 2000, height: 2000},
   startingCoordinates: {},
   mapComponents:
       {
          'chest1': {
               item: chestRed,
               start: 0,
               x: 80,
               y: 80
           },
          'chest2': {
               item: chestWood,
               start: 0,
               x: 180,
               y: 180
          },
           'chest3': {
               item: chestWood,
               start: 0,
               x: 380,
               y: 180
           },
           'chest4' : {
               item: chestWood,
               start: 0,
               x: 580,
               y: 180
           },
           'chest5' : {
               item: chestYellow,
               start: 0,
               x: 2000,
               y: 2000
           }
       }
}
window.game.maps.skullSpaceSuit = SkullSpaceSuit  