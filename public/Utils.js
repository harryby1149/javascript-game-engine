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
        const map = {}
        array.forEach( element => {
            map[element.id] = element;
        })
        return map;
    }, 

    getViewPortDimensions: () => {
        return document.getElementById('viewport').getBoundingClientRect();
    },

    transitionToExplorationMode: (entryPoint) => {
        let state = window.game.state;
        if(state.mode !== "exploration") {
            state.mode = "exploration";
            window.game.exploration.inputs.setInput();
        }
        cancelAnimationFrame(state.animationFrame);
            state.transition = true;
            state.currentTransition = entryPoint;
            state.map.previousMap = state.map.currentMap;
            state.map.currentMap = window.game.maps[point.transitionTo];
            state.map.image.src = state.map.currentMap.url;
            updateCollisionVals();
    },

    transitionToCombatMode: () => {
        let state = window.game.state;
        if(state.mode !== "combat") {
            state.mode = "combat";
            window.game.combat.inputs.setInput();
        }
        cancelAnimationFrame(state.animationFrame);
        state.transition = true;
        state.currentTransition = 0;
    }
};