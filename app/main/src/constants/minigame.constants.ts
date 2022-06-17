import {Dimensions} from 'react-native';

export const miniGameMaxScore = 0;
export const miniGameMaxScoreKey = '@fastly/minigame-max-score';

export const MAX_WIDTH = Dimensions.get('screen').width;
export const MAX_HEIGHT = Dimensions.get('screen').height;
export const GAP_SIZE = 320;
export const PIPE_WIDTH = 100;
export const BIRD_WIDTH = 50;
export const BIRD_HEIGHT = 41;

export const miniGameImages = {
  background: require('../assets/images/minigame/background.png'),
  floor: require('../assets/images/minigame/floor.png'),
  pipeCore: require('../assets/images/minigame/pipe_core.png'),
  pipeTop: require('../assets/images/minigame/pipe_top.png'),
  bird1: require('../assets/images/minigame/bird1.png'),
  bird2: require('../assets/images/minigame/bird2.png'),
  bird3: require('../assets/images/minigame/bird3.png'),
};
