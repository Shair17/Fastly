import create from 'zustand';
import {combine} from 'zustand/middleware';
import {
  miniGameMaxScore as maxScore,
  miniGameMaxScoreKey as maxScoreKey,
} from '../constants/minigame.constants';
import {storage} from '../storage';

type MinigameType = {
  keep: boolean;
  maxScore: number;
};

const getDefaultValues = (): MinigameType => {
  return {
    keep: false,
    maxScore: storage.getNumber(maxScoreKey) ?? maxScore,
  };
};

export const useMinigameStore = create(
  combine(getDefaultValues(), (set, get) => ({
    setMiniGameMaxScore: (maxScore: number) => {
      storage.set(maxScoreKey, maxScore);

      set({
        maxScore,
      });
    },
    setKeepMinigame: (keep: boolean) => {
      set({
        keep,
      });
    },
  })),
);
