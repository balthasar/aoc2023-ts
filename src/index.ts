import type Puzzle from './types/Puzzle';
import readFile from './utils/readFile';
import './utils/log';

const args = process.argv.slice(2);
const dayToSolve = args[0];

if (!dayToSolve) {
  console.error('No day specified run with npm run dev {day}');
  process.exit(1);
}
console.log(`Solving Day #${args[0]}`);
(async () => {
  let input = '';
  let test1 = '';
  let test2 = '';
  const puzzleName = args[0];
  try {
    const puzzlePath = `src/days/${puzzleName}`;
    test1 = await readFile(`${puzzlePath}/test-1.txt`);
    test2 = await readFile(`${puzzlePath}/test-2.txt`);
    input = await readFile(`${puzzlePath}/input.txt`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  const { first, second }: Puzzle = await import(`./days/${puzzleName}/Puzzle`);

  if (args[1] == '-t') {
    console.log(first(test1));
    console.log(second(test2));
    return;
  }

  console.log(first(input));
  console.log(second(input));
})();
