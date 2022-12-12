import Keyv from 'keyv';

export const db = new Keyv();

export interface GameData {
  player1: string;
  player2: string;
  player1Score: number;
  player2Score: number;
}

export const getGame = async (id: string): Promise<GameData> => {
  const rawData = await db.get(id);
  if (!rawData) {
    return undefined;
  }
  return JSON.parse(rawData);
};

export const initGame = async (
  id: string,
  player1: string,
  player2: string
): Promise<void> => {
  const gameData: GameData = {
    player1,
    player2,
    player1Score: 0,
    player2Score: 0
  };
  await db.set(id, JSON.stringify(gameData));
};

export const updateGame = async (
  id: string,
  increasePlayer1Score: boolean,
  increasePlayer2Score: boolean
): Promise<void> => {
  const gameData = await getGame(id);
  if (increasePlayer1Score) {
    gameData.player1Score++;
  }
  if (increasePlayer2Score) {
    gameData.player2Score++;
  }
  await db.set(id, JSON.stringify(gameData));
};
