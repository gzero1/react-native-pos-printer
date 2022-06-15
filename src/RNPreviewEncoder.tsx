import React from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
  ScaleTransform,
  ScaleXTransform,
  ScaleYTransform,
  Image,
} from 'react-native';
import * as png from 'fast-png';
import jpeg from 'jpeg-js';
import { Buffer } from 'buffer';
import Dither from './utils/image';

// @ts-ignore
import barcodes from 'jsbarcode/src/barcodes';

import type {
  BarCodeSymbology,
  Codepage,
  EscPosOptions,
  EscPosState,
} from './Encoder';
// import QRCode from 'react-native-qrcode-generator';
import AdjustableText from './AdjustableText';
import genMatrix from './utils/qrcode';
export default class PreviewEncoder {
  protected _paperColor = '#fff9c2';
  protected _textColor = '#000';
  protected _options: EscPosOptions = {
    width: null,
    embedded: false,
    wordWrap: true,
    defaultLFHeight: 32 / 3,
    imageMode: 'column',
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

  protected _styles = StyleSheet.create<{
    text: TextStyle;
    image: ImageStyle;
    view: ViewStyle;
  }>({
    text: {
      fontFamily: 'monospace',
      fontWeight: 'normal',
      color: this._textColor,
      transform: [],
      // width: '100%',

      backgroundColor: 'transparent',
    },
    image: {},
    view: {
      width: '100%',
    },
  });

  protected _embedded: boolean = false;
  protected _buffer: JSX.Element[] = [];
  protected _queued: JSX.Element[] = [];
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
      defaultLFHeight: (options?.defaultLFHeight ?? 32) / 3,
    };

    this._paperColor;

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
   * Add commands to the queue
   *
   * @param  {array}   value  Add array of numbers, arrays, buffers or Uint8Arrays to add to the buffer
   *
   */
  protected _queue(value: JSX.Element[]) {
    value.forEach((item) => this._queued.push(item));
  }

  /**
   * Flush current queue to buffer
   */
  protected _flush() {
    this._buffer = [...this._buffer, ...this._queued];
    this._queued = [];
    this._cursor = 0;
  }

  /**
   * Restore styles and codepages after drawing boxes or lines
   */
  protected _restoreState() {
    this.bold(this._state.bold);
    this.italic(this._state.italic);
    this.underline(this._state.underline);
    this.invert(this._state.invert);
  }

  /**
   * Initialize the printer
   *
   * @return Return self, for easy chaining commands
   */
  public initialize() {
    this._flush();

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
   * @param _ The codepage that we set the printer to
   * @return Return self, for easy chaining commands
   */
  public codepage(_: Codepage | 'auto' | 'ascii') {
    return this;
  }

  /**
   * Print text
   *
   * @param value Text that needs to be printed
   * @param wrap Wrap text after this many positions
   * @return Return self, for easy chaining commands
   */
  public text(value: string, wrap: number = this._maxLineLength) {
    value = value.normalize('NFD').replace(/\p{Diacritic}/gu, '');

    const lineArray = value.match(new RegExp(`.{1,${wrap}}`, 'g'))!;

    const previousTransforms = (
      this._styles.text.transform as (
        | ScaleYTransform
        | ScaleXTransform
        | ScaleTransform
      )[]
    ).filter(
      (transform) => !('scaleX' in transform || 'translateX' in transform)
    );

    const translateMultiplier =
      this._state.align === 'left' ? 1 : this._state.align === 'right' ? -1 : 0;

    const transform = [
      ...previousTransforms,
      {
        translateX:
          this._state.width !== 1
            ? this._state.width * 50 * translateMultiplier
            : 0,
      },
      { scaleX: this._state.width !== 1 ? this._state.width : 1 },
    ];

    this._queue(
      lineArray.map((line, index) => (
        <View
          key={`text_${
            this._buffer.length + this._queued.length
          }_line_${index}`}
          style={this._styles.view}
        >
          <AdjustableText
            fontSize={this._state.size === 'small' ? 12 : 18}
            style={{ ...this._styles.text, transform }}
          >
            {line}
          </AdjustableText>
        </View>
      ))
    );

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
    this._queue([
      <View
        key={`newline_${this._buffer.length + this._queued.length}`}
        style={{ marginVertical: size / 3 }}
      />,
    ]);

    return this;
  }

  /**
   * Print text, followed by a newline
   *
   * @param value Text that needs to be printed
   * @param wrap Wrap text after this many positions
   * @return Return self, for easy chaining commands
   */
  line(value: string, wrap: number = this._maxLineLength) {
    this.text(value, wrap);

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

    this.line(formatted, 999);
    return this;
  }

  /**
   * Underline text
   *
   * @param value `true` to turn on underline, `false` to turn off, or 2 for double underline
   * @returnReturn self, for easy chaining commands
   */
  underline(value: boolean | number = !this._state.underline) {
    this._state.underline = value;

    this._styles = StyleSheet.create({
      ...this._styles,
      text: {
        ...this._styles.text,
        textDecorationLine: value ? 'underline' : undefined,
      },
    });

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

    this._styles = StyleSheet.create({
      ...this._styles,
      text: { ...this._styles.text, fontStyle: value ? 'italic' : 'normal' },
    });

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

    this._styles = StyleSheet.create({
      ...this._styles,
      text: { ...this._styles.text, fontWeight: value ? 'bold' : 'normal' },
    });

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
      throw new Error('Width must be between 1 and 3');
    }

    this._state.width = width;

    // const previousTransforms = (
    //   this._styles.text.transform as (
    //     | ScaleYTransform
    //     | ScaleXTransform
    //     | ScaleTransform
    //   )[]
    // ).filter((transform) => !('scaleX' in transform));

    // this._styles = StyleSheet.create({
    //   ...this._styles,
    //   text: {
    //     ...this._styles.text,
    //     transform: [...previousTransforms, { scaleX: width !== 1 ? width : 1 }],
    //   },
    // });

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
      throw new Error('Height must be between 1 and 3');
    }

    this._state.height = height;

    const previousTransforms = (
      this._styles.text.transform as (
        | ScaleYTransform
        | ScaleXTransform
        | ScaleTransform
      )[]
    ).filter((transform) => !('scaleY' in transform));

    this._styles = StyleSheet.create({
      ...this._styles,
      text: {
        ...this._styles.text,
        transform: [
          ...previousTransforms,
          { scaleY: height !== 1 ? height * 1 : 1 },
        ],
      },
    });

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

    this._styles = StyleSheet.create({
      ...this._styles,
      text: {
        ...this._styles.text,
        backgroundColor: value ? this._textColor : this._paperColor,
        color: value ? this._paperColor : this._textColor,
      },
    });

    return this;
  }

  /**
   * Change text size
   *
   * @param value `'small'` or `'normal'`
   * @return Return self, for easy chaining commands
   */
  size(
    value: 'small' | 'normal' = this._state.size === 'normal'
      ? 'small'
      : 'normal'
  ) {
    this._state.size = value;

    // const previousTransforms = (
    //   this._styles.text.transform as (
    //     | ScaleYTransform
    //     | ScaleXTransform
    //     | ScaleTransform
    //   )[]
    // ).filter((transform) => !('scale' in transform));

    // this._styles = StyleSheet.create({
    //   ...this._styles,
    //   text: {
    //     ...this._styles.text,
    //     transform: [
    //       ...previousTransforms,
    //       { scale: value === 'small' ? 0.5 : 1 },
    //     ],
    //     marginVertical: value === 'small' ? -7 : 0,
    //   },
    // });

    return this;
  }

  /**
   * Change text alignment
   *
   * @param value `'left'`, `'center'` or `'right'`, defaults to 'left'
   * @return Return self, for easy chaining commands
   */
  align(value: 'left' | 'center' | 'right' = 'left') {
    const alignments = {
      left: 0x00,
      center: 0x01,
      right: 0x02,
    };

    if (value in alignments) {
      this._state.align = value;

      this._styles = StyleSheet.create({
        ...this._styles,
        text: {
          ...this._styles.text,
          textAlign: value,
        },
        view: {
          ...this._styles.text,
          width: '100%',
          alignItems:
            value === 'right'
              ? 'flex-end'
              : value === 'left'
              ? 'flex-start'
              : value,
        },
      });
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
    const newWidth = (width * 100) / this._maxLineLength;

    this._queue([
      <View
        key={`rule_${this._buffer.length + this._queued.length}`}
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth * 3,
          width: `${newWidth}%`,
          marginVertical: 10,
        }}
      />,
    ]);
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
  barcode(value: string, symbology: BarCodeSymbology, height: number = 10) {
    const BAR_WIDTH = 3;
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

    if (typeof value !== 'string' || value.length === 0) {
      throw new Error('Barcode value must be a non-empty string');
    }

    const encoder = new barcodes[symbology](value, {
      width: BAR_WIDTH,
      format: symbology,
      height: height,
      lineColor: this._textColor,
      background: this._paperColor,
      flat: true,
    });

    if (!encoder.valid()) {
      throw new Error('Invalid barcode for selected format.');
    }

    const barcode: { data: string; value: string } = encoder.encode();

    const width = barcode.data.length * BAR_WIDTH;

    /**
     * Scales vertically to specified height,
     * scales horizontally by 4
     */
    const matrix = [barcode.data.split('')]
      .map((row) =>
        row.flatMap((item) => new Array(BAR_WIDTH).fill(parseInt(item, 10)))
      )
      .flatMap((row) => new Array(height).fill(row));

    const imageData = {
      data: Uint8Array.from(
        matrix
          .flat()
          .flatMap((pixel) =>
            pixel === 1 ? [0, 0, 0, 255] : [255, 255, 255, 0]
          )
      ),
      height,
      width,
    };

    if (symbology in symbologies) {
      this._queue([
        <Image
          resizeMode="contain"
          resizeMethod="scale"
          style={{ ...this._styles.image, height, width }}
          source={{
            uri:
              'data:image/png;base64,' +
              Buffer.from(png.encode(imageData)).toString('base64'),
          }}
        />,
      ]);
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
   * @param size The amount of error correction used, either `'l'`, `'m'`, `'q'` or `'h'`
   * @return Return self, for easy chaining commands
   */
  qrcode(
    value: string,
    _model: 1 | 2 = 2,
    size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 = 6,
    errorLevel: 'L' | 'M' | 'Q' | 'H' = 'M'
  ) {
    const PIXEL_DENSITY = size * 2;

    if (this._embedded) {
      throw new Error('QR codes are not supported in table cells or boxes');
    }

    if (typeof size !== 'number') {
      throw new Error('Size must be a number');
    }

    if (size < 1 || size > 8) {
      throw new Error('Size must be between 1 and 8');
    }

    const matrix = genMatrix(value, errorLevel)
      .map((row) =>
        row.flatMap((item) => new Array<number>(PIXEL_DENSITY).fill(item))
      )
      .flatMap((row) => new Array<number[]>(PIXEL_DENSITY).fill(row));

    const [height, width] = [matrix.length, matrix.length];

    const imageData = {
      data: Uint8Array.from(
        matrix
          .flat()
          .flatMap((pixel) =>
            pixel === 1 ? [0, 0, 0, 255] : [255, 255, 255, 0]
          )
      ),
      height,
      width,
    };

    this._queue([
      <View
        key={`qrcode_${this._buffer.length + this._queued.length}`}
        style={this._styles.view}
      >
        <Image
          resizeMode="cover"
          resizeMethod="scale"
          style={{
            ...this._styles.image,
            height: size * 30,
            width: size * 30,
          }}
          source={{
            uri:
              'data:image/png;base64,' +
              Buffer.from(png.encode(imageData)).toString('base64'),
          }}
        />
      </View>,
    ]);

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
        'Image must be a valid base64 string. Are you forgetting the "data:image/png;base64" header?'
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

    // console.log(image.data);
    const parsedImage = Buffer.from(png.encode(image)).toString('base64');
    // const parsedImage = Buffer.from(png.encode(image)).toString('base64');

    this._queue([
      <View
        key={`image_${this._buffer.length + this._queued.length}`}
        style={{ ...this._styles.view }}
      >
        <Image
          resizeMode="contain"
          source={{ uri: 'data:image/png;base64,' + parsedImage }}
          style={{ ...this._styles.image, width, height }}
        />
      </View>,
    ]);

    this._flush();

    return this;
  }

  /**
   * Cut paper
   *
   * Polyfill
   * @return Return self, for easy chaining commands
   */
  cut(..._args: any[]) {
    return this;
  }

  /**
   * Pulse
   *
   * Polyfill
   * @return Return self, for easy chaining commands
   */
  pulse(..._args: any[]) {
    if (this._embedded) {
      throw new Error('Pulse is not supported in table cells or boxes');
    }

    return this;
  }

  /**
   * Add raw printer commands
   *
   * !TODO: Finish this
   * @param  {array}           data   raw bytes to be included
   * @return {object}          Return self, for easy chaining commands
   */
  raw(data: (number | any[] | Uint8Array | Buffer)[]) {
    if (data) {
      console.warn('Sorry! Preview .raw() is a WIP');
    }
    return this;
  }

  /**
   * Encode all previous commands
   *
   * @return Return the encoded bytes
   */
  encode(): JSX.Element[] {
    this._flush();

    const result = this._buffer;

    this._reset();

    return result;
  }
}
