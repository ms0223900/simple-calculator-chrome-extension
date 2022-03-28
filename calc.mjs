const regex = {
  checkIncludeNotDigiOrOperator: /[^(\d|\+|\-|\*|\/)]+/g,
  operator: /\+|\-|\*|\//g,
}

const calc = (input = '10*10 - 2 + 20 * 3', prevRes = undefined) => {
  const defaultRes = prevRes || 0
  if (!input) return defaultRes;
  if (input.match(regex.checkIncludeNotDigiOrOperator)) return defaultRes;
  // let res = 0;
  const operators = input.split(/\s*\d\s*/g).filter(Boolean);
  let nums = input
    .split(/\+|\-|\/|\*/g)
    .filter(Boolean)
    .map(str => Number(str));

  if (nums.length === 1 && !operators.length) {
    return Number(input);
  }

  nums = (input[0].match(regex.operator)) ? [prevRes, ...nums] : nums;
  while (operators.length) {
    // console.log(nums);
    // console.log(operators)

    const multiOrDevideIdx = operators.findIndex(op => op === '*' || op === '/');
    let current = 0;
    if (multiOrDevideIdx !== -1) {
      const i = multiOrDevideIdx
      const op = operators[multiOrDevideIdx];
      switch (op) {
        case '*':
          current = nums[i] * nums[i + 1];
          break;
        case '/':
          current = nums[i] / nums[i + 1];
          break;
        default:
          break;
      }

      operators.splice(multiOrDevideIdx, 1);
      nums.splice(multiOrDevideIdx, 2, current);
    } else {
      operators.forEach((op, i) => {
        switch (op) {
          case '-':
            current = nums[i] - nums[i + 1];
            break;

          case '+':
            current = nums[i] + nums[i + 1];
            break;

          default:
            break;
        }

        operators.splice(i, 1);
        nums.splice(i, 2, current);
      })
    }
  }

  return nums[0];
}

export default calc;