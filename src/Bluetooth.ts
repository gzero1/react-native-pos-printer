import BleManager, { Peripheral, StartOptions } from 'react-native-ble-manager';
export type { Peripheral, StartOptions } from 'react-native-ble-manager';

const PRINTER_CHARACTERISTIC_UUID = '49535343-8841-43f4-a8d4-ecbe34729bb3';

export default class BluetoothManager {
  private _connectedPrinter: Peripheral | null = null;
  private _pairedPrinters: Peripheral[] = [];
  private _characteristic: string = '';
  private _service: string = '';

  /**
   * Call once, starts BleManager
   *
   * @param options Starting options for the Bluetooth printer
   */
  public async start(options?: StartOptions): Promise<void> {
    await BleManager.start(options ?? { showAlert: false });
  }

  /**
   * Returns all paired devices
   *
   * TODO: Currently cannot differentiate between printers and regular bluetooth devices
   * @returns List of devices
   */
  public async getPairedDevices(): Promise<Peripheral[]> {
    this._pairedPrinters = await BleManager.getBondedPeripherals();
    return this._pairedPrinters;
  }

  /**
   * Connects to paired device
   *
   * @param peripheralId Peripheral's MAC address
   */
  public async connect(peripheralId: string): Promise<void> {
    await BleManager.connect(peripheralId);

    const peripheral = this._pairedPrinters.find(
      (printer) => printer.id === peripheralId
    )!;

    const services = await BleManager.retrieveServices(peripheral.id);
    const characteristic = services.characteristics?.find(
      (item) => (item.characteristic?.length ?? []) > 5
    );

    if (characteristic) {
      this._service = characteristic.service;
      this._characteristic = characteristic.characteristic;
    }
    this._connectedPrinter = peripheral;
  }

  /**
   * Disonnect connected device
   *
   * @param peripheralId Peripheral's MAC address
   */
  public async disconnect(peripheralId: string): Promise<void> {
    await BleManager.disconnect(peripheralId);

    this._connectedPrinter = null;
  }

  /**
   * Check connection to printer
   *
   * @returns If the previously connected printer is still connected
   */
  public async isConnected(): Promise<boolean> {
    if (this._connectedPrinter) {
      return await BleManager.isPeripheralConnected(this._connectedPrinter.id, [
        this._characteristic,
      ]);
    }

    return false;
  }

  public async sendEscPosCommands(commands: Uint8Array): Promise<void> {
    if (!this._connectedPrinter) {
      throw Error('No printer connected');
    }
    try {
      if (!(await this.isConnected())) {
        await this.connect(this._connectedPrinter.id);
      }
    } catch (e: any) {
      if (e instanceof Error) {
        console.error(e.message);
        await this.connect(this._connectedPrinter.id);
      }
    } finally {
      await BleManager.writeWithoutResponse(
        this._connectedPrinter?.id,
        this._service,
        PRINTER_CHARACTERISTIC_UUID,
        [...commands]
      );
    }
  }
}
