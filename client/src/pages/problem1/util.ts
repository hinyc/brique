export const lineCalculator = (data: string[]) => {
  //최소값
  //최대값
  //합계
  //평균
  //표준편차
  //중간값

  //틀린 값 배열
  const error: string[] = [];

  const line: number[] = data.map((item) => {
    //Number이 NaN을 전체 함수를 종료함
    const number = Number(item);

    if (isNaN(number)) {
      error.push(item.replace(/"/g, ''));
      return NaN;
    }

    return number;
  });

  //숫자가아닌값이 존재할경우 error 배열 return
  if (line.includes(NaN)) {
    return { error };
  }

  //모두 소수점 첫째자리까지 표시

  const min = round(Math.min(...line));
  const max = round(Math.max(...line));

  const sumNumber = line.reduce((acc, cur) => acc + cur, 0);
  const sum = round(sumNumber);

  const avgNumber = sumNumber / line.length;

  const avg = round(avgNumber);
  //표준편차
  const std = Math.sqrt(line.reduce((acc, cur) => acc + Math.pow(cur - avgNumber, 2), 0) / line.length);

  //중간값, 총 10개의 값중 5,6번째 값의 평균
  const sorted = line.sort((a, b) => a - b);
  const median = round((sorted[4] + sorted[5]) / 2);

  return {
    min,
    max,
    sum,
    avg,
    std,
    median,
  };
};

//소수점 첫째자리 최소 0표기
export const round = (num: number) => {
  if (!String(num).split('.')[1]) {
    return String(num) + '.0';
  }
  return num;
};
