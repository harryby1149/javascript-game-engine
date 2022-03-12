import {state} from './Core/State';
import {utils} from './Core/Utils';
console.log('loaded utils, next loading exploration')
import {exploration} from './Gameplay/Exploration/ExplorationControls';
console.log('loaded item index, now loading Scenes')
import { scenes } from './Scenes';
console.log('loaded scenes, node loading draw functions')
import {draw} from './Core/Draw';
console.log('loaded draw functions, now loading gameplay loop')
import {game} from './Core/Game';
console.log('all files loaded, initializing game')
import  { init } from './Init';

init();