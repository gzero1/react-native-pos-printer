// @ts-expect-error
import linewrap from 'linewrap';
import * as png from 'fast-png';

import Dither from './utils/image';
import jpeg from 'jpeg-js';
import CodepageEncoder from './utils/codepageEncoder';

export type BarCodeSymbology =
  | 'UPC'
  | 'UPCE'
  | 'EAN13'
  | 'EAN8'
  | 'CODE39'
  | 'ITF'
  | 'codabar'
  // | 'code93'
  | 'CODE128';
// | 'gs1-128'
// | 'gs1-databar-omni'
// | 'gs1-databar-truncated'
// | 'gs1-databar-limited'
// | 'gs1-databar-expanded'
// | 'code128-auto';

export type Codepage =
  | 'cp437'
  | 'cp720'
  | 'cp737'
  | 'cp775'
  | 'cp850'
  | 'cp851'
  | 'cp852'
  | 'cp853'
  | 'cp855'
  | 'cp857'
  | 'cp858'
  | 'cp860'
  | 'cp861'
  | 'cp862'
  | 'cp863'
  | 'cp864'
  | 'cp865'
  | 'cp866'
  | 'cp869'
  | 'cp874'
  | 'cp1098'
  | 'cp1118'
  | 'cp1119'
  | 'cp1125'
  | 'cp1162'
  | 'cp2001'
  | 'cp3001'
  | 'cp3002'
  | 'cp3011'
  | 'cp3012'
  | 'cp3021'
  | 'cp3041'
  | 'cp3840'
  | 'cp3841'
  | 'cp3843'
  | 'cp3844'
  | 'cp3845'
  | 'cp3846'
  | 'cp3847'
  | 'cp3848'
  | 'iso88591'
  | 'iso88592'
  | 'iso88597'
  | 'iso885915'
  | 'rk1048'
  | 'windows1250'
  | 'windows1251'
  | 'windows1252'
  | 'windows1253'
  | 'windows1254'
  | 'windows1255'
  | 'windows1256'
  | 'windows1257'
  | 'windows1258';

export type Printer = 'epson' | 'zjiang' | 'bixolon' | 'star' | 'legacy';

export const codepageMappings: Record<
  Printer,
  Partial<{ [key in Codepage]: number }>
> = {
  epson: {
    cp437: 0x00,
    cp850: 0x02,
    cp860: 0x03,
    cp863: 0x04,
    cp865: 0x05,
    cp851: 0x0b,
    cp853: 0x0c,
    cp857: 0x0d,
    cp737: 0x0e,
    iso88597: 0x0f,
    windows1252: 0x10,
    cp866: 0x11,
    cp852: 0x12,
    cp858: 0x13,
    cp720: 0x20,
    cp775: 0x21,
    cp855: 0x22,
    cp861: 0x23,
    cp862: 0x24,
    cp864: 0x25,
    cp869: 0x26,
    iso88592: 0x27,
    iso885915: 0x28,
    cp1098: 0x29,
    cp1118: 0x2a,
    cp1119: 0x2b,
    cp1125: 0x2c,
    windows1250: 0x2d,
    windows1251: 0x2e,
    windows1253: 0x2f,
    windows1254: 0x30,
    windows1255: 0x31,
    windows1256: 0x32,
    windows1257: 0x33,
    windows1258: 0x34,
    rk1048: 0x35,
  },

  zjiang: {
    cp437: 0x00,
    cp850: 0x02,
    cp860: 0x03,
    cp863: 0x04,
    cp865: 0x05,
    windows1252: 0x10,
    cp866: 0x11,
    cp852: 0x12,
    cp858: 0x13,
    windows1255: 0x20,
    cp861: 0x38,
    cp855: 0x3c,
    cp857: 0x3d,
    cp862: 0x3e,
    cp864: 0x3f,
    cp737: 0x40,
    cp851: 0x41,
    cp869: 0x42,
    cp1119: 0x44,
    cp1118: 0x45,
    windows1250: 0x48,
    windows1251: 0x49,
    cp3840: 0x4a,
    cp3843: 0x4c,
    cp3844: 0x4d,
    cp3845: 0x4e,
    cp3846: 0x4f,
    cp3847: 0x50,
    cp3848: 0x51,
    cp2001: 0x53,
    cp3001: 0x54,
    cp3002: 0x55,
    cp3011: 0x56,
    cp3012: 0x57,
    cp3021: 0x58,
    cp3041: 0x59,
    windows1253: 0x5a,
    windows1254: 0x5b,
    windows1256: 0x5c,
    cp720: 0x5d,
    windows1258: 0x5e,
    cp775: 0x5f,
  },

  bixolon: {
    cp437: 0x00,
    cp850: 0x02,
    cp860: 0x03,
    cp863: 0x04,
    cp865: 0x05,
    cp851: 0x0b,
    cp858: 0x13,
  },

  star: {
    cp437: 0x00,
    cp850: 0x02,
    cp860: 0x03,
    cp863: 0x04,
    cp865: 0x05,
    windows1252: 0x10,
    cp866: 0x11,
    cp852: 0x12,
    cp858: 0x13,
  },

  legacy: {
    cp437: 0x00,
    cp737: 0x40,
    cp850: 0x02,
    cp775: 0x5f,
    cp852: 0x12,
    cp855: 0x3c,
    cp857: 0x3d,
    cp858: 0x13,
    cp860: 0x03,
    cp861: 0x38,
    cp862: 0x3e,
    cp863: 0x04,
    cp864: 0x1c,
    cp865: 0x05,
    cp866: 0x11,
    cp869: 0x42,
    windows1250: 0x48,
    windows1251: 0x49,
    windows1252: 0x47,
    windows1253: 0x5a,
    windows1254: 0x5b,
    windows1255: 0x20,
    windows1256: 0x5c,
    windows1257: 0x19,
    windows1258: 0x5e,
  },
};

export interface EscPosOptions {
  width: number | null;
  embedded: boolean;
  wordWrap: boolean;
  defaultLFHeight: number;
  imageMode: 'column' | 'raster';
  codepageMapping: Printer;
  codepageCandidates: Codepage[];
}

export interface EscPosState {
  codepage: number;
  align: 'left' | 'right' | 'center';
  bold: boolean;
  italic: boolean;
  underline: boolean | number;
  invert: boolean;
  width: number;
  height: number;
  size: 'normal' | 'small';
}

export type EscPosEncoderType = typeof EscPosEncoder;

export default class EscPosEncoder {
  protected _options: EscPosOptions = {
    width: null,
    embedded: false,
    wordWrap: true,
    defaultLFHeight: 8,
    imageMode: 'raster',
    codepageMapping: 'zjiang',
    codepageCandidates: [
      'cp437',
      'cp858',
      'cp860',
      'cp861',
      'cp863',
      'cp865',
      'cp852',
      'cp857',
      'cp855',
      'cp866',
      'cp869',
    ],
  };
  protected _state: EscPosState = {
    codepage: 0,
    align: 'left',
    bold: false,
    italic: false,
    underline: false,
    invert: false,
    width: 1,
    height: 1,
    size: 'normal',
  };
  protected _embedded: boolean = false;
  protected _buffer: (number | number[] | Buffer | Uint8Array)[] = [];
  protected _queued: (number | number[] | Buffer | Uint8Array)[] = [];
  protected _cursor: number = 0;
  protected _codepage: Codepage | 'auto' | 'ascii' = 'ascii';
  protected _maxLineLength: number = 32;
  /**
   * Create a new object
   *
   * @param  {object}   options   Object containing configuration options
   */
  constructor(options?: Partial<EscPosOptions>) {
    this._reset(options);
  }

  /**
   * Reset the state of the object
   *
   * @param  {object}   options   Object containing configuration options
   */
  protected _reset(options?: Partial<EscPosOptions>) {
    this._options = {
      ...this._options,
      ...options,
    };

    this._embedded = !!this._options.width && this._options.embedded;

    this._buffer = [];
    this._queued = [];
    this._cursor = 0;
    this._codepage = 'ascii';

    this._state = {
      codepage: 0,
      align: 'left',
      bold: false,
      italic: false,
      underline: false,
      invert: false,
      width: 1,
      height: 1,
      size: 'normal',
    };
  }

  /**
   * Encode a string with the current code page
   *
   * @param value String to encode
   * @return Encoded string as a ArrayBuffer
   *
   */
  protected _encode(value: string): Uint8Array {
    if (this._codepage !== 'auto') {
      return CodepageEncoder.encode(value, this._codepage);
    }

    let codepages;

    if (typeof this._options.codepageMapping == 'string') {
      codepages = codepageMappings[this._options.codepageMapping];
    } else {
      codepages = this._options.codepageMapping;
    }

    const fragments = CodepageEncoder.autoEncode(
      value,
      this._options.codepageCandidates
    );

    let length = 0;
    for (let f = 0; f < fragments.length; f++) {
      length += 3 + fragments[f].bytes.byteLength;
    }

    const buffer = new Uint8Array(length);
    let i = 0;

    for (let f = 0; f < fragments.length; f++) {
      buffer.set([0x1b, 0x74, codepages[fragments[f].codepage] ?? 0], i);
      buffer.set(fragments[f].bytes, i + 3);
      i += 3 + fragments[f].bytes.byteLength;

      this._state.codepage = codepages[fragments[f].codepage] ?? 0;
    }

    return buffer;
  }

  /**
   * Add commands to the queue
   *
   * @param  {array}   value  Add array of numbers, arrays, buffers or Uint8Arrays to add to the buffer
   *
   */
  protected _queue(value: (number | Buffer | Uint8Array | Array<any>)[]) {
    value.forEach((item) => this._queued.push(item));
  }

  /**
   * Flush current queue to buffer
   */
  protected _flush() {
    this._buffer = this._buffer.concat(this._queued);

    this._queued = [];
    this._cursor = 0;
  }

  /**
   * Wrap the text while respecting the position of the cursor
   *
   * @param value String to wrap after the width of the paper has been reached
   * @param position Position on which to force a wrap
   * @return Array with each line
   */
  protected _wrap(value: string, position: number): string[] {
    if (position || (this._options.wordWrap && this._options.width)) {
      const indent = '-'.repeat(this._cursor);
      const w = linewrap(position || this._options.width, {
        lineBreak: '\n',
        whitespace: 'all',
      });
      const result = w(indent + value)
        .substring(this._cursor)
        .split('\n');

      return result;
    }

    return [value];
  }

  /**
   * Restore styles and codepages after drawing boxes or lines
   */
  protected _restoreState() {
    this.bold(this._state.bold);
    this.italic(this._state.italic);
    this.underline(this._state.underline);
    this.invert(this._state.invert);

    this._queue([0x1b, 0x74, this._state.codepage]);
  }

  /**
   * Get code page identifier for the specified code page and mapping
   *
   * @param codepage Required code page
   * @return Identifier for the current printer according to the specified mapping
   */
  protected _getCodepageIdentifier(codepage: Codepage): number {
    return codepageMappings[this._options.codepageMapping][codepage] ?? 0;
  }

  /**
   * Initialize the printer
   *
   * @return Return self, for easy chaining commands
   */
  initialize() {
    this._queue([0x1b, 0x40]);
    this._flush();
    this.newline();
    this.size('normal');
    this.width(1);
    this.height(1);
    this.bold(false);
    this.italic(false);
    this.underline(false);
    this.invert(false);
    this.align('left');

    return this;
  }

  /**
   * Change the code page
   *
   * @param codepage The codepage that we set the printer to
   * @return Return self, for easy chaining commands
   *
   */
  codepage(codepage: Codepage | 'auto' | 'ascii') {
    if (codepage === 'auto') {
      this._codepage = codepage;
      return this;
    }

    if (!CodepageEncoder.supports(codepage)) {
      throw new Error('Unknown codepage');
    }

    let codepages;

    if (typeof this._options.codepageMapping == 'string') {
      codepages = codepageMappings[this._options.codepageMapping];
    } else {
      codepages = this._options.codepageMapping;
    }

    if (codepage in codepages) {
      this._codepage = codepage;
      this._state.codepage = codepages[codepage as keyof typeof codepages] ?? 0;

      this._queue([
        0x1b,
        0x74,
        codepages[codepage as keyof typeof codepages] ?? 0,
      ]);
    } else {
      throw new Error('Codepage not supported by printer');
    }

    return this;
  }

  /**
   * Print text
   *
   * @param value Text that needs to be printed
   * @param wrap Wrap text after this many positions
   * @return Return self, for easy chaining commands
   *
   */
  text(value: string, wrap: number = this._maxLineLength) {
    value = value.normalize('NFD').replace(/\p{Diacritic}/gu, '');

    const lines = this._wrap(value, wrap);

    for (let l = 0; l < lines.length; l++) {
      const bytes = this._encode(lines[l]);

      this._queue([bytes]);

      this._cursor += lines[l].length * this._state.width;

      if (this._options.width && !this._embedded) {
        this._cursor = this._cursor % this._options.width;
      }

      if (l < lines.length - 1) {
        this.newline();
      }
    }

    return this;
  }

  /**
   * Print a newline
   *
   * @param size Size 0 - 255
   * @return Return self, for easy chaining commands
   */
  newline(size: number = this._options.defaultLFHeight) {
    this._flush();
    this._queue([0x1b, 0x33, size]);
    this._queue([0x0a, 0x0d]);
    this._queue([0x1b, 0x32]);

    if (this._embedded) {
      this._restoreState();
    }

    return this;
  }

  /**
   * Print text, followed by a newline
   *
   * @param  {string}   value  Text that needs to be printed
   * @param  {number}   wrap   Wrap text after this many positions
   * @return {object}          Return self, for easy chaining commands
   *
   */
  line(value: string, wrap: number = this._maxLineLength) {
    this.text(value, wrap);
    this.newline();

    return this;
  }

  /**
   * Print an array of lines
   *
   * @param value Text that needs to be printed
   * @return Return self, for easy chaining commands
   */
  lines(value: string[]) {
    value.forEach((line) => {
      this.line(line);
    });
    return this;
  }

  /**
   * Print a key and a value with spaces or dots filling in between
   *
   * @param key Left item
   * @param value Right item
   * @param style Style of the spaces in between
   * @returns Return self, for easy chaining commands
   */
  keyvalue(key: string, value: string, style: 'dots' | 'spaces' = 'spaces') {
    const separator = new Array(
      Math.round(
        this._maxLineLength / this._state.width - (key.length + value.length)
      )
    )
      .fill(style === 'spaces' ? ' ' : '.')
      .join('');

    const formatted = `${key}${separator}${value}`;
    this.line(formatted);
    return this;
  }
  /**
   * Underline text
   *
   * @param  {boolean|number}   value  `true` to turn on underline, `false` to turn off, or 2 for double underline
   * @return Return self, for easy chaining commands
   *
   */
  underline(value: boolean | number) {
    if (typeof value === 'undefined') {
      value = !this._state.underline;
    }

    this._state.underline = value;

    this._queue([0x1b, 0x2d, Number(value)]);

    return this;
  }

  /**
   * Italic text
   *
   * @param value `true` to turn on italic, `false` to turn off
   * @return Return self, for easy chaining commands
   */
  italic(value: boolean = !this._state.italic) {
    this._state.italic = value;

    this._queue([0x1b, 0x34, Number(value)]);

    return this;
  }

  /**
   * Bold text
   *
   * @param value `true` to turn on bold, `false` to turn off
   * @return Return self, for easy chaining commands
   */
  bold(value: boolean = !this._state.bold) {
    this._state.bold = value;

    this._queue([0x1b, 0x45, Number(value)]);

    return this;
  }

  /**
   * Change width of text
   *
   * @param width The width of the text, 1 - 3
   * @return Return self, for easy chaining commands
   */
  width(width: number = 1) {
    if (typeof width !== 'number') {
      throw new Error('Width must be a number');
    }

    if (width < 1 || width > 3) {
      throw new Error('Width must be between 1 and 2');
    }

    this._state.width = width;

    this._queue([
      0x1d,
      0x21,
      (this._state.height - 1) | ((this._state.width - 1) << 4),
    ]);

    return this;
  }

  /**
   * Change height of text
   *
   * @param height The height of the text, 1 - 3
   * @return Return self, for easy chaining commands
   */
  height(height: number = 1) {
    if (typeof height !== 'number') {
      throw new Error('Height must be a number');
    }

    if (height < 1 || height > 3) {
      throw new Error('Height must be between 1 and 8');
    }

    this._state.height = height;

    this._queue([
      0x1d,
      0x21,
      (this._state.height - 1) | ((this._state.width - 1) << 4),
    ]);

    return this;
  }

  /**
   * Invert text
   *
   * @param value `true` to turn on white text on black, `false` to turn off
   * @return Return self, for easy chaining commands
   */
  invert(value: boolean = !this._state.invert) {
    this._state.invert = value;

    this._queue([0x1d, 0x42, Number(value)]);

    return this;
  }

  /**
   * Change text size
   *
   * @param value `'small'` or `'normal'`
   * @return Return self, for easy chaining commands
   */
  size(value: 'small' | 'normal') {
    this._queue([0x1b, 0x4d, value === 'small' ? 0x01 : 0x00]);

    return this;
  }

  /**
   * Change text alignment
   *
   * @param value `'left'`, `'center'` or `'right'`, defaults to 'left'
   * @return Return self, for easy chaining commands
   */
  align(value: 'left' | 'center' | 'right') {
    const alignments = {
      left: 0x00,
      center: 0x01,
      right: 0x02,
    };

    if (value in alignments) {
      this._state.align = value;

      if (!this._embedded) {
        this._queue([0x1b, 0x61, alignments[value]]);
      }
    } else {
      throw new Error('Unknown alignment');
    }

    return this;
  }

  /**
   * Insert a horizontal rule
   *
   * @param width Defaults to max line length
   * @return Return self, for easy chaining commands
   */
  rule(width: number = this._maxLineLength) {
    this._queue([0x1b, 0x74, this._getCodepageIdentifier('cp437')]);
    this.line(
      new Array(Math.floor(width / this._state.width)).fill('_').join('')
    );
    this._queue([0x1b, 0x74, this._state.codepage]);
    this.newline();
    return this;
  }

  /**
   * Barcode
   *
   * @param value Barcode contents
   * @param symbology Barcode type
   * @param height Barcode height, defaults to `10`
   * @return Return self, for easy chaining commands
   */
  barcode(value: string, symbology: BarCodeSymbology, height: number) {
    if (this._embedded) {
      throw new Error('Barcodes are not supported in table cells or boxes');
    }

    const symbologies: { [key in BarCodeSymbology]: number } = {
      UPC: 0x00,
      UPCE: 0x01,
      EAN13: 0x02,
      EAN8: 0x03,
      CODE39: 0x04,
      ITF: 0x05,
      codabar: 0x06,
      CODE128: 0x49,
    };

    if (symbology in symbologies) {
      const bytes = CodepageEncoder.encode(value, 'ascii');

      if (this._cursor != 0) {
        this.newline();
      }

      this._queue([
        0x1d,
        0x68,
        height,
        0x1d,
        0x77,
        symbology === 'CODE39' ? 0x02 : 0x03,
      ]);

      if (symbology == 'CODE128' && bytes[0] !== 0x7b) {
        /* Not yet encodeded Code 128, assume data is Code B, which is similar to ASCII without control chars */

        this._queue([
          0x1d,
          0x6b,
          symbologies[symbology],
          bytes.length + 2,
          0x7b,
          0x42,
          bytes,
        ]);
      } else if (symbologies[symbology] > 0x40) {
        /* Function B symbologies */

        this._queue([0x1d, 0x6b, symbologies[symbology], bytes.length, bytes]);
      } else {
        /* Function A symbologies */

        this._queue([0x1d, 0x6b, symbologies[symbology], bytes, 0x00]);
      }
    } else {
      throw new Error('Symbology not supported by printer');
    }

    this._flush();

    return this;
  }

  /**
   * QR Code
   *
   * @param value QR Code contents
   * @param _ Model of the qrcode, either `1` or `2`
   * @param size Size of the qrcode, a value between `1` and `8`, defaults to `6`
   * @param errorlevel The amount of error correction used, either `'l'`, `'m'`, `'q'` or `'h'`
   * @return Return self, for easy chaining commands
   */
  qrcode(
    value: string,
    model: 1 | 2 = 2,
    size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 = 6,
    errorlevel: 'L' | 'M' | 'Q' | 'H' = 'M'
  ) {
    if (this._embedded) {
      throw new Error('QR codes are not supported in table cells or boxes');
    }

    /* Force printing the print buffer and moving to a new line */

    this._queue([0xd, 0x0a]);

    /* Model */

    const models = {
      1: 0x31,
      2: 0x32,
    };

    if (model in models) {
      this._queue([
        0x1d,
        0x28,
        0x6b,
        0x04,
        0x00,
        0x31,
        0x41,
        models[model],
        0x00,
      ]);
    } else {
      throw new Error('Model must be 1 or 2');
    }

    /* Size */

    if (typeof size !== 'number') {
      throw new Error('Size must be a number');
    }

    if (size < 1 || size > 8) {
      throw new Error('Size must be between 1 and 8');
    }

    this._queue([0x1d, 0x28, 0x6b, 0x03, 0x00, 0x31, 0x43, size]);

    /* Error level */

    const errorlevels = {
      L: 0x30,
      M: 0x31,
      Q: 0x32,
      H: 0x33,
    };

    if (errorlevel in errorlevels) {
      this._queue([
        0x1d,
        0x28,
        0x6b,
        0x03,
        0x00,
        0x31,
        0x45,
        errorlevels[errorlevel],
      ]);
    } else {
      throw new Error('Error level must be l, m, q or h');
    }

    /* Data */

    const bytes = CodepageEncoder.encode(value, 'cp437');
    const length = bytes.length + 3;

    this._queue([
      0x1d,
      0x28,
      0x6b,
      length % 0xff,
      length / 0xff,
      0x31,
      0x50,
      0x30,
      bytes,
    ]);

    /* Print QR code */

    this._queue([0x1d, 0x28, 0x6b, 0x03, 0x00, 0x31, 0x51, 0x30]);

    this._flush();

    return this;
  }

  /**
   * Prints image, supports PNG and JPEG
   *
   * @param base64 png base64
   * @param algorithm The dithering algorithm for making the image black and white
   * @param threshold Threshold for the dithering algorithm
   * @return Return self, for easy chaining commands
   */
  image(
    base64: string,
    algorithm:
      | 'threshold'
      | 'bayer'
      | 'floydsteinberg'
      | 'atkinson' = 'atkinson',
    threshold: number = 128
  ) {
    if (!base64.includes('base64')) {
      throw new Error(
        'Image must be a valid base64 string. Are you forgetting the "data:image/png;base64," header?'
      );
    }

    const bufferFromB64 = Buffer.from(base64.split(',')[1], 'base64');

    let image: png.ImageData | jpeg.ImageData;

    try {
      image = png.decode(bufferFromB64);
    } catch {
      image = jpeg.decode(bufferFromB64);
    }

    const { width, height } = image;

    const pixelCount = width * height;

    if (image.data.length / pixelCount === 3) {
      let newData: png.PngDataArray = new Uint16Array(4 * pixelCount);

      for (let i = 0; i < image.data.length; i += 3) {
        newData.fill(image.data[i], i, i + 1); // R
        newData.fill(image.data[i + 1], i + 1, i + 2); // G
        newData.fill(image.data[i + 2], i + 2, i + 3); // B
        newData.fill(255, i + 3, i + 4); // A
      }
    }

    if (width > 400) {
      throw new Error('Image is too big');
    }

    image = Dither.grayscale(image);

    switch (algorithm) {
      case 'threshold':
        image = Dither.threshold(image, threshold);
        break;
      case 'bayer':
        image = Dither.bayer(image, threshold);
        break;
      case 'floydsteinberg':
        image = Dither.floydsteinberg(image);
        break;
      case 'atkinson':
        image = Dither.atkinson(image);
        break;
    }
    const getPixel = (x: number, y: number) =>
      x < width && y < height
        ? image.data[(width * y + x) * 4] > 0
          ? 0
          : 1
        : 0;

    const getColumnData = (width: number, height: number) => {
      const data = [];

      for (let s = 0; s < Math.ceil(height / 24); s++) {
        const bytes = new Uint8Array(width * 4);

        for (let x = 0; x < width; x++) {
          for (let c = 0; c < 3; c++) {
            for (let b = 0; b < 16; b++) {
              bytes[x * 3 + c] |= getPixel(x, s * 24 + b + 8 * c) << (7 - b);
            }
          }
        }

        data.push(bytes);
      }

      return data;
    };

    const getRowData = (width: number, height: number) => {
      const bytes = new Uint8Array((width * height) >> 3);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x = x + 8) {
          for (let b = 0; b < 8; b++) {
            bytes[y * (width >> 3) + (x >> 3)] |= getPixel(x + b, y) << (7 - b);
          }
        }
      }

      return bytes;
    };

    if (this._cursor != 0) {
      this.newline();
    }

    /* Encode images with ESC * */

    if (this._options.imageMode == 'column') {
      this._queue([0x1b, 0x33, 0x24]);

      getColumnData(width, height).forEach((bytes) => {
        this._queue([
          0x1b,
          0x2a,
          0x21,
          width & 0xff,
          (width >> 8) & 0xff,
          bytes,
          0x1b,
          0x33,
          0x01,
          0x0a,
        ]);
      });

      this._queue([0x1b, 0x32]);
    }

    /* Encode images with GS v */

    if (this._options.imageMode == 'raster') {
      this._queue([
        0x1d,
        0x76,
        0x30,
        0x00,
        (width >> 3) & 0xff,
        ((width >> 3) >> 8) & 0xff,
        height & 0xff,
        (height >> 8) & 0xff,
        getRowData(width, height),
      ]);
    }

    this._flush();

    return this;
  }

  /**
   * Cut paper
   *
   * @param value Full or partial. When not specified a full cut will be assumed
   * @return Return self, for easy chaining commands
   *
   */
  cut(value: 'full' | 'partial') {
    if (this._embedded) {
      throw new Error('Cut is not supported in table cells or boxes');
    }

    let data = 0x00;

    if (value == 'partial') {
      data = 0x01;
    }

    this._queue([0x1d, 0x56, data]);

    return this;
  }

  /**
   * Pulse
   *
   * @param  {number}          device  0 or 1 for on which pin the device is connected, default of 0
   * @param  {number}          on      Time the pulse is on in milliseconds, default of 100
   * @param  {number}          off     Time the pulse is off in milliseconds, default of 500
   * @return Return self, for easy chaining commands
   *
   */
  pulse(device: 0 | 1 = 0, on: number = 100, off: number = 500) {
    if (this._embedded) {
      throw new Error('Pulse is not supported in table cells or boxes');
    }

    on = Math.min(500, Math.round(on / 2));
    off = Math.min(500, Math.round(off / 2));

    this._queue([0x1b, 0x70, device ? 1 : 0, on & 0xff, off & 0xff]);

    return this;
  }

  /**
   * Add raw printer commands
   *
   * @param  {array}           data   raw bytes to be included
   * @return {object}          Return self, for easy chaining commands
   *
   */
  raw(data: (number | any[] | Uint8Array | Buffer)[]) {
    this._queue(data);

    return this;
  }

  /**
   * Encode all previous commands
   *
   * @return {Uint8Array}         Return the encoded bytes
   *
   */
  encode() {
    this._flush();

    let length = 0;

    this._buffer.forEach((item) => {
      if (typeof item === 'number') {
        length++;
      } else {
        length += item.length;
      }
    });

    const result = new Uint8Array(length);

    let index = 0;

    this._buffer.forEach((item) => {
      if (typeof item === 'number') {
        result[index] = item;
        index++;
      } else {
        result.set(item, index);
        index += item.length;
      }
    });

    this._reset();

    return result;
  }
}
