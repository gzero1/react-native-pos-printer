import QRCode from 'qrcode';

const genMatrix = (
  value: string,
  errorCorrectionLevel:
    | 'L'
    | 'low'
    | 'medium'
    | 'quartile'
    | 'high'
    | 'M'
    | 'Q'
    | 'H'
): number[][] => {
  const arr = Array.prototype.slice.call(
    QRCode.create(value, { errorCorrectionLevel }).modules.data,
    0
  );
  console.log(arr);
  const sqrt = Math.sqrt(arr.length);
  return arr.reduce(
    (rows, key, index) =>
      (index % sqrt === 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows,
    [] as any[]
  );
};

export default genMatrix;
