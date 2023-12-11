import { start, stop, addLocationListener, Location, _options } from ".";
import { EmitterSubscription } from "react-native";




/**
 * 定位错误信息
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/PositionError
 */
export class PositionError {
  static PERMISSION_DENIED: 1;
  static POSITION_UNAVAILABLE: 2;
  static TIMEOUT: 3;

  code: number;
  message: string;
  location: Location;

  constructor(code: number, message: string, location: Location) {
    this.code = code;
    this.message = message;
    this.location = location;
  }
}

/**
 * 定位选项
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/PositionOptions
 */
export interface PositionOptions {
  timeout?: number;
  maximumAge?: number;
  enableHighAccuracy?: boolean;

  /**
   * @see [[setDistanceFilter]]
   */
  distanceFilter?: number;
}