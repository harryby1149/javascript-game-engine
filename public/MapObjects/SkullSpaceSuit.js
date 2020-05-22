SkullSpaceSuit = {
   id: 'SkullSpaceSuit', 
   url:"http://localhost:3000/Maps/skullSpaceSuit.jpg",
   transitionPoints: [ 
      { transitionTo: 'estateSample',
        x: 1200,
        y: 600
        }
    ],
   mapDimensions: {width: 2000, height: 2000},
   mapComponents:
       {
          'chest1': {
               item: window.game.items.itemIndex.chestRed,
               start: 0,
               x: 80,
               y: 80
           },
          'chest2': {
               item: window.game.items.itemIndex.chestWood,
               start: 0,
               x: 180,
               y: 180
          },
           'chest3': {
               item: window.game.items.itemIndex.chestWood,
               start: 0,
               x: 380,
               y: 180
           },
           'chest4' : {
               item: window.game.items.itemIndex.chestWood,
               start: 0,
               x: 580,
               y: 180
           }
       }
}
window.game.maps.skullSpaceSuit = SkullSpaceSuit  