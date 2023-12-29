import StringNumDict from '../../types/stringDict';
import linesToArray from '../../utils/linesToArray';

interface Game {
  id: number;
  sets: Set[];
}

interface Set {
  blocks: Block[];
}

interface Block {
  color: string;
  qty: number;
}

const parseGame = function (line: string): Game {
  const gameId = parseInt(line.match(/Game\s(\d+):/)[1]);
  const sets: Set[] = line
    .split(': ')[1]
    .split(';')
    .map((set) => {
      return {
        blocks: set.split(',').map((block) => {
          const blockDetails = block.trim().split(' ');
          // console.log(block);
          // console.log(blockDetails);

          return {
            qty: parseInt(blockDetails[0]),
            color: blockDetails[1],
          };
        }),
      };
    });
  // console.log(sets);
  return { id: gameId, sets: sets };
};

const first = (input: string) => {
  const max: StringNumDict = {
    red: 12,
    green: 13,
    blue: 14,
  };
  let result = 0;
  const lines = linesToArray(input);
  lines.forEach((line) => {
    let validGame = true;
    // console.log(parseGame(line));
    parseGame(line).sets.forEach((set) => {
      // console.log(set);

      set.blocks.forEach((block) => {
        if (block.qty > max[block.color]) {
          // console.log(block);
          validGame = false;
        }
      });
    });

    if (validGame) {
      // console.log(line);
      result += parseGame(line).id;
    }
  });
  return result;
};

const expectedFirstSolution = 2683;

const second = (input: string) => {
  let max: StringNumDict = {
    red: 0,
    green: 0,
    blue: 0,
  };
  let result = 0;
  const lines = linesToArray(input);
  lines.forEach((line) => {
    max = {
      red: 0,
      green: 0,
      blue: 0,
    };
    parseGame(line).sets.forEach((set) => {
      set.blocks.forEach((block) => {
        if (block.qty > max[block.color]) {
          max[block.color] = block.qty;
        }
      });
    });

    // max.log();
    result += max.red * max.green * max.blue;
  });
  return result;
};

const expectedSecondSolution = 49710;

export { first, expectedFirstSolution, second, expectedSecondSolution };
