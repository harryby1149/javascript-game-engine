window.game.combat = {
    inputs: {}
};
window.game.state.party = [];

const goodGuy = {
    strength: 1,
    atk: 5,
    def: 2,
    health: 15,
    acc: 80
};

const badGuy = {
    difficulty: 1,
    atk: 7,
    def: 4,
    health: 10,
    acc: 65
}

window.game.combat.test =() => {
    const unitCount = Math.floor(Math.random() * 3);
    const partyObj = [];
    for( let i = 0; i < unitCount; i++){
        partyObj[i] = goodGuy
    }
    window.game.state.party = partyObj;
    window.game.combat.generateEncounter(getPartyStrength());
}

window.game.combat.generateEncounter =(partyStrength) => {
    window.game.combat.encounter = {
        isActive : true,
    };
     
}

window.game.combat.attack = (source, target) => {

}

const getPartyStrength = () => {
    let difficultyRating;
    window.game.state.party.forEach(member=> {
      difficultyRating += member.difficulty;
    })
    return difficultyRating;
}
