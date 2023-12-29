import StringNumDict from '../../types/stringDict';
import linesToArray from '../../utils/linesToArray';

const findSymbols = /[^.\d]/g;
const findGear = /[*]/g;
const findDigits = /\d+/g;

let charArray: string[][];

function hasSymbol(
  index: number,
  length: number,
  lineNumber: number,
  findSymbol: RegExp
): { result: boolean; symbolIndex?: { i: number; j: number } } {
  // Loop through above and below
  for (let i = lineNumber - 1; i < lineNumber + 2; i++) {
    // i.log();
    if (i < 0 || i > charArray.length - 1) {
      continue;
    }

    for (let j = index - 1; j < index + length + 1; j++) {
      // charArray[i][j] ? charArray[i][j].log() : null;
      if (charArray[i][j] && charArray[i][j].match(findSymbol)) {
        return { result: true, symbolIndex: { i: i, j: j } };
      }
    }
  }
  // console.log(`index: ${index}, length: ${length}, lineNum: ${lineNumber}`);

  return { result: false };
}

const first = (input: string) => {
  let result = 0;
  const lines = linesToArray(input);
  charArray = lines.map((line) => line.split(''));

  lines.forEach((line, index) => {
    // line.log();
    const digits = [...line.matchAll(findDigits)];
    if (!digits) {
      return;
    }
    digits.forEach((digit) => {
      // digit.log();
      if (hasSymbol(digit.index, digit[0].length, index, findSymbols).result) {
        result += parseInt(digit[0]);
      }
    });
  });
  return result;
};

const expectedFirstSolution = 554003;

const second = (input: string) => {
  let result = 0;
  let gearRatios: StringNumDict[] = {};
  const lines = linesToArray(input);
  charArray = lines.map((line) => line.split(''));

  lines.forEach((line, index) => {
    // line.log();
    const digits = [...line.matchAll(findDigits)];
    if (!digits) {
      return;
    }
    digits.forEach((digit) => {
      // digit.log();
      const sym = hasSymbol(digit.index, digit[0].length, index, findGear);
      if (sym.result) {
        // sym.log();

        const symIndex: string = `${sym.symbolIndex.i}|${sym.symbolIndex.j}`;
        // symIndex.log();
        if (typeof gearRatios[symIndex] == 'undefined') {
          gearRatios[symIndex] = { val: parseInt(digit[0]), cnt: 1 };
        } else {
          gearRatios[symIndex] = {
            val: gearRatios[symIndex].val * parseInt(digit[0]),
            cnt: gearRatios[symIndex].cnt + 1,
          };
        }
        // result += parseInt(digit[0]);
      }
    });
  });

  Object.entries(gearRatios).forEach(([key, value]) => {
    if (value.cnt == 2) {
      // value.log();
      result += value.val;
    }
  });

  // gearRatios.log();
  return result;
};

const expectedSecondSolution = 87263515;

export { first, expectedFirstSolution, second, expectedSecondSolution };
