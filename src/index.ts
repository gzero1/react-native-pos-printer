import EscPosEncoder, { EscPosOptions } from './Encoder';
import Bluetooth, { StartOptions } from './Bluetooth';
import RNPreviewEncoder from './RNPreviewEncoder';

/**
 * Creates an instance of EscPosEcnoder with Buffer polyfills
 *
 * @param options Starting options, see: {@link EscPosOptions}
 * @returns Instance of EscPosEcnoder
 */
export const createEscPosEncoder = (
  options: Partial<EscPosOptions>,
  bufferPolyfill: boolean = true
) => {
  // Polyfill for libraries
  if (bufferPolyfill) {
    global.Buffer = global.Buffer || require('buffer').Buffer;
  }

  return new EscPosEncoder(options);
};

/**
 * Creates an instance of RNPreviewEncoder with Buffer polyfills
 *
 * Same parameters as {@link createEscPosEncoder}
 * @returns Instance of RNPreviewEncoder
 */
export const createRNPreviewEncoder = (
  options: Partial<EscPosOptions>,
  bufferPolyfill: boolean = true
) => {
  // Polyfill for libraries
  if (bufferPolyfill) {
    global.Buffer = global.Buffer || require('buffer').Buffer;
  }

  return new RNPreviewEncoder(options);
};

/**
 * Creates an instance of BluetoothManager with Buffer polyfills
 *
 * @returns Instance of BluetoothManager
 */
export const createBluetoothManager = (options: StartOptions) => {
  const instance = new Bluetooth();
  instance.start(options);
  return instance;
};

const POS = {
  Bluetooth,
  RNPreviewEncoder,
  createBluetoothManager,
  createEscPosEncoder,
  createRNPreviewEncoder,
};

export type { Peripheral, StartOptions } from './Bluetooth';
export { VirtualPaper } from './VirtualPaper';
export { isPOSCommandArray, isJSXArray } from './utils/types';

export default POS;
