import { NativeModules, NativeEventEmitter, Platform } from "react-native";
import { Location, LocationMode,  RequestLevel } from "./types";

const TMapGeolocation = NativeModules.TMapGeolocation;
const eventEmitter = new NativeEventEmitter(TMapGeolocation);



/**
 * 添加定位监听函数
 *
 * @param listener
 */
export function addLocationListener(listener: (location: Location) => void) {
  return eventEmitter.addListener("TMapGeolocation", listener);
}
/**
 * 移除定位监听函数
 *
 * @param listener
 */
export function removeLocationListener(listen) {
  return eventEmitter.removeSubscription(listen);
}

/**
 * 开始持续定位
 */
export function start() {
  TMapGeolocation.start();
}

/**
 * 停止持续定位
 */
export function stop() {
  TMapGeolocation.stop();
}


/**
 * 设置发起定位请求的时间间隔（毫秒），默认 2000，最小值为 1000
 *
 * @default 2000
 * @platform android
 */
export function setInterval(interval: number) {
  if (Platform.OS === "android") {
    TMapGeolocation.setInterval(interval);
  }
}

/**
 * 调用单次定位 调用后进行监听结果
 *
 * @default false
 * @platform android
 */
export function requestSingleLocation(isOnceLocation: boolean) {
  if (Platform.OS === "android") {
    TMapGeolocation.requestSingleLocation(isOnceLocation);
  }
}



/**
 * 设置是否使用设备传感器
 *
 * @default false
 * @platform android
 */
export function setSensorEnable(enable: boolean) {
  if (Platform.OS === "android") {
    TMapGeolocation.setSensorEnable(enable);
  }
}



/**
 * 设置是否允许模拟位置
 *
 * @default true
 * @platform android
 */
export function setMockEnable(enable: boolean) {
  if (Platform.OS === "android") {
    TMapGeolocation.setMockEnable(enable);
  }
}



/**
 * 设置联网超时时间（毫秒）
 *
 * @default 30000
 * @platform android
 */
export function setHttpTimeout(timeout: number) {
  if (Platform.OS === "android") {
    TMapGeolocation.setHttpTimeout(timeout);
  }
}

/**
 * 设置优先返回卫星定位信息时等待卫星定位结果的超时时间（毫秒）
 *
 * 只有在 `setGpsFirst(true)` 时才有效。
 *
 * @platform android
 */
export function setGpsFirstTimeout(timeout: number) {
  if (Platform.OS === "android") {
    TMapGeolocation.setGpsFirstTimeout(timeout);
  }
}

/**
 * 设置首次定位是否等待卫星定位结果
 *
 * 只有在单次定位高精度定位模式下有效，设置为 `true` 时，会等待卫星定位结果返回，
 * 最多等待 30 秒，若 30 秒后仍无卫星定位结果返回，返回网络定位结果。
 * 等待卫星定位结果返回的时间可以通过 [[setGpsFirstTimeout]] 进行设置。
 *
 * @default false
 * @platform android
 */
export function setGpsFirst(isGpsFirst: boolean) {
  if (Platform.OS === "android") {
    TMapGeolocation.setGpsFirst(isGpsFirst);
  }
}

/**
 * 设置定位模式
 *
 * @platform android
 */
export function setLocMode(mode: LocationMode) {
  if (Platform.OS === "android") {
    TMapGeolocation.setLocMode(mode);
  }
}

/**
 * 设置地理信息返回级别
 *
 * @platform android
 */
export function setRequestLevel(level: RequestLevel) {
  if (Platform.OS === "android") {
    TMapGeolocation.setRequestLevel(level);
  }
}


/**
 * 指定单次定位超时时间（秒）
 *
 * 最小值是 2s。注意在单次定位请求前设置。
 *
 * 注意: 单次定位超时时间从确定了定位权限（非 `kCLAuthorizationStatusNotDetermined` 状态）后开始计算。
 *
 * @default 10
 * @platform ios
 */
export function setLocationTimeout(timeout: number) {
  if (Platform.OS === "ios") {
    TMapGeolocation.setLocationTimeout(timeout);
  }
}

/**
 * 指定单次定位逆地理超时时间（秒）
 *
 * 最小值是 2s。注意在单次定位请求前设置。
 *
 * @default 5
 * @platform ios
 */
export function setReGeocodeTimeout(timeout: number) {
  if (Platform.OS === "ios") {
    TMapGeolocation.setReGeocodeTimeout(timeout);
  }
}

interface Options {
  locatingWithReGeocode?: boolean
}

export const _options: Options = {};

/**
 * 连续定位是否返回逆地理编码
 *
 * @default false
 * @platform ios
 */
export function setLocatingWithReGeocode(withReGeocode: boolean) {
  _options.locatingWithReGeocode = withReGeocode;
  if (Platform.OS === "ios") {
    TMapGeolocation.setLocatingWithReGeocode(withReGeocode);
  }
}

export * from "./types";
export * from "./geolocation";
export { default as Geolocation } from "./geolocation";
