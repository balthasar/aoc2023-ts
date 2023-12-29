import linesToArray from '../../utils/linesToArray';

interface Card {
  id: number;
  win: number[];
  nums: number[];
  score?: number;
  copies: number;
}

const parseCard = function (line: string): Card {
  const gameId = parseInt(line.match(/Card\s+(\d+):/)[1]);
  const numbers: string = line.split(':')[1];
  const win: number[] = numbers
    .split('|')[0]
    .trim()
    .split(' ')
    .map((num) => parseInt(num))
    .sort((a, b) => a - b);
  const nums: number[] = numbers
    .split('|')[1]
    .trim()
    .split(' ')
    .filter((num) => num !== '')
    .map((num) => parseInt(num))
    .sort((a, b) => a - b);
  return { id: gameId, win: win, nums: nums, score: 0, copies: 1 };
};

const first = (input: string) => {
  let result = 0;
  const lines = linesToArray(input);
  let cards: Card[] = [];
  lines.forEach((line) => {
    cards.push(parseCard(line));
  });

  cards.forEach((card) => {
    for (let i = 0; i < card.win.length; i++) {
      const win = card.win[i];
      for (let j = 0; j < card.nums.length; j++) {
        const num = card.nums[j];

        if (win == num) {
          card.score = card.score ? card.score * 2 : 1;
        }
      }
    }

    result += card.score;
  });

  // cards.log();

  return result;
};

const expectedFirstSolution = 33950;

const second = (input: string) => {
  let result = 0;
  const lines = linesToArray(input);
  let cards: Card[] = [];
  lines.forEach((line) => {
    cards.push(parseCard(line));
  });

  cards.forEach((card, _, cardsArr) => {
    for (let i = 0; i < card.win.length; i++) {
      const win = card.win[i];
      for (let j = 0; j < card.nums.length; j++) {
        const num = card.nums[j];

        if (win == num) {
          card.score = card.score ? card.score + 1 : 1;
        }
      }
    }

    for (let j = 0; j < card.copies; j++) {
      for (let i = 0; i < card.score; i++) {
        // console.log(`card.id:${card.id}, new index:${card.id + i}`);
        cardsArr[card.id + i].copies++;
      }
    }
  });

  // cards.log();

  return cards.reduce((a, b) => {
    return a + b.copies;
  }, 0);
};

const expectedSecondSolution = 14814534;

export { first, expectedFirstSolution, second, expectedSecondSolution };
