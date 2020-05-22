window.game.utils = {
    returnAnimationArray: (itemMetaData, setNumber) => {
        const animationArray = [];
        const unitWidth = itemMetaData.unitWidth;
        const unitHeight = itemMetaData.unitHeight ;
        const spriteCount = itemMetaData.sPerAPerRow * itemMetaData.sPerAPerColumn;
        const numberOfSets = ((itemMetaData.rows / itemMetaData.sPerAPerColumn) * (itemMetaData.columns / itemMetaData.sPerAPerRow));
        const rowsOfSets = (itemMetaData.rows / itemMetaData.sPerAPerColumn);
        const columnsOfSets = (itemMetaData.columns / itemMetaData.sPerAPerRow);
        const setRow = Math.ceil( (setNumber / numberOfSets) * rowsOfSets); 
        const setColumn = setNumber - (columnsOfSets * (setRow -1));

        for (let i = 0; i < spriteCount; i++) {
            const spriteAnimation = [];
            const startX = unitWidth * (((setColumn - 1) * itemMetaData.sPerAPerRow) + (Math.floor(i/ itemMetaData.sPerAPerColumn)));
            const startY = unitHeight * (((setRow -1) * itemMetaData.sPerAPerColumn) + (Math.floor(i / itemMetaData.sPerAPerRow)));
            spriteAnimation.push(startX, startY, unitWidth, unitHeight);
            animationArray.push(spriteAnimation);
        }
        return animationArray;
    },
    arrayToFlatMap: (array) => {
        const itemMap = {}
        array.forEach( element => {
            itemMap[element.id] = element;
        })
        return itemMap;
    } 
};