const metaChest = window.game.items.metaData.chest;
const utilities = window.game.utils;
console.log(metaChest)
window.game.items.itemIndex = {
    chestRed: {
        src: 'http://localhost:3000/Items/chests.png',
        metaData: metaChest,
        animations: utilities.returnAnimationArray(metaChest, 1)
    },
    chestWood: {
        src: 'http://localhost:3000/Items/chests.png',
        metaData: metaChest,
        animations: utilities.returnAnimationArray(metaChest, 5)
    }
}