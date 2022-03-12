import {
    chestRed,
    chestWood,
    chestYellow
} from "../Items/ItemIndex"

import {exploration} from "../Gameplay/Exploration/ExplorationControls"

export const skullSpaceSuit = {
   id: 'skullSpaceSuit', 
   url:"http://localhost:3000/Maps/skullSpaceSuit.jpg",
   transitionPoints: 
    [ 
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
               y: 380
           },
           'chest4' : {
               item: chestWood,
               start: 'open',
               status: 0,
               x: 580,
               y: 580
           },
           'chest5' : {
               item: chestYellow,
               start: 'open',
               status: 0,
               x: 1600,
               y: 1600
           }
       },
       mode: exploration
}