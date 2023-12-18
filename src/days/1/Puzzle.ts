import linesToArray from '../../utils/linesToArray';
import '../../utils/replaceArray';

const text = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];
const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const first = (input: string) => {
  let lines = linesToArray(input);
  lines = lines.map((line) => {
    return line.match(/\d+/g).join('');
  });
  lines = lines.map((line) => {
    return line.substr(0, 1) + line.substr(-1, 1);
  });

  return lines.reduce((a, b) => Number(a) + Number(b), 0);
};

const expectedFirstSolution = 54338;

const second = (input: string) => {
  let lines = linesToArray(input);
  lines = lines.map((line) => {
    const reg =
      /(?=(one|two|three|four|five|six|seven|eight|nine|[123456789]))/g;
    const arr = [...line.matchAll(reg)].join().replaceAll(',', '');
    const numbers = arr.replaceArray(text, digits);
    return numbers.substr(0, 1) + numbers.substr(-1, 1);
  });

  return lines.reduce((a, b) => Number(a) + Number(b), 0);
};

const expectedSecondSolution = 53389;

export { first, expectedFirstSolution, second, expectedSecondSolution };
