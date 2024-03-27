type Intervals = { [key: string]: [number, number][] };

export default function freeAreasCounter(
  n: number,
  m: number,
  k: number,
  track: [number, number, number][]
) {
  const bigN = BigInt(n);
  const bigM = BigInt(m);
  const intervals: Intervals = {};

  for (let i = 0; i < k; ++i) {
    const [, min, max] = track[i];
    const key = `${track[i][0]}`;

    if (!intervals[key]) {
      intervals[key] = [[min, max]];
      continue;
    }

    const toJoinIndex = intervals[key].findIndex(
      ([iMin, iMax]) => min <= iMax && max >= iMin
    );

    if (~toJoinIndex)
      intervals[key][toJoinIndex] = [
        Math.min(intervals[key][toJoinIndex][0], min),
        Math.max(intervals[key][toJoinIndex][1], max),
      ];
    else intervals[key].push([min, max]);
  }

  const values = Object.values(intervals);

  return parseInt((
    values.reduce((prev, tracks) => {
      let reduceNumber = BigInt(0);
      tracks.forEach(
        (t) => (reduceNumber += BigInt(t[1]) - BigInt(t[0]) + BigInt(1))
      );
      return prev + bigM - reduceNumber;
    }, BigInt(0)) +
    (bigN - BigInt(values.length)) * bigM
  ).toString());
}
