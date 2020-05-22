const metaChest = window.game.items.metaData.chest;
const utilities = window.game.utils;

window.game.items.itemIndex = {
    chestRed: {
        type: 'chest',
        src: 'http://localhost:3000/Items/chests.png',
        metaData: metaChest,
        animations:{ open: utilities.returnAnimationArray(metaChest, 1)}
    },
    chestWood: {
        type: 'chest',
        src: 'http://localhost:3000/Items/chests.png',
        metaData: metaChest,
        animations:{ open: utilities.returnAnimationArray(metaChest, 5)}
    }
}