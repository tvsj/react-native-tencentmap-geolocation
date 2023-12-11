import { Double } from "react-native/Libraries/Types/CodegenTypes";

/**
 * 定位结果类型
 *
 * @platform android
 */
export enum LocationType {
  /**
   * 卫星定位结果
   *
   * 通过设备卫星定位模块返回的定位结果
   */
  GPS = 1,

  /**
   * 前次定位结果
   *
   * 网络定位请求低于1秒、或两次定位之间设备位置变化非常小时返回，设备位移通过传感器感知
   */
  SAME_REQ,

  /**
   * @deprecated
   */
  FAST,

  /**
   * 缓存定位结果
   *
   * 返回一段时间前设备在相同的环境中缓存下来的网络定位结果，节省无必要的设备定位消耗
   */
  FIX_CACHE,

  /**
   * Wifi定位结果
   *
   * 属于网络定位，定位精度相对基站定位会更好
   */
  WIFI,

  /**
   * 基站定位结果
   *
   * 属于网络定位
   */
  CELL,

  AMAP,

  /**
   * 离线定位结果
   */
  OFFLINE,

  /**
   * 最后位置缓存
   */
  LAST_LOCATION_CACHE
}

/**
 * iOS 错误代码
 *
 * @platform ios
 */
export enum ErrorCodeIOS { }

/**
 * Android 错误代码
 *
 * @platform android
 */
export enum ErrorCodeAndroid {
  /**
   * 定位成功
   */
  LOCATION_SUCCESS,

  /**
   * 一些重要参数为空，可以通过 [[Location.locationDetail]] 获取详细信息
   */
  INVALID_PARAMETER,

  /**
   * 定位失败，由于设备仅扫描到单个 wifi，不能精准的计算出位置信息
   */
  FAILURE_WIFI_INFO,

  /**
   * 获取到的请求参数为空，可能获取过程中出现异常，可以通过 [[Location.locationDetail]] 获取详细信息
   */
  FAILURE_LOCATION_PARAMETER,

  /**
   * 网络连接异常，可以通过 [[Location.locationDetail]] 获取详细信息
   */
  FAILURE_CONNECTION,

  /**
   * 解析 XML 出错，可以通过 [[Location.locationDetail]] 获取详细信息
   */
  FAILURE_PARSER,

  /**
   * 定位结果错误，可以通过 [[Location.locationDetail]] 获取详细信息
   */
  FAILURE_LOCATION,

  /**
   * Key 错误，可以通过 [[Location.locationDetail]] 获取详细信息来跟注册的 Key 信息进行对照
   */
  FAILURE_AUTH,

  /**
   * 其他错误，可以通过 [[Location.locationDetail]] 获取详细信息
   */
  UNKNOWN,

  /**
   * 初始化异常，可以通过 [[Location.locationDetail]] 获取详细信息
   */
  FAILURE_INIT,

  /**
   * 定位服务启动失败，请检查是否配置 service 并且 manifest 中 service 标签是否配置在 application 标签内
   */
  SERVICE_FAIL,

  /**
   * 错误的基站信息，请检查是否安装 sim 卡
   */
  FAILURE_CELL,

  /**
   * 缺少定位权限，请检查是否配置定位权限，并在安全软件和设置中给应用打开定位权限
   */
  FAILURE_LOCATION_PERMISSION,

  /**
   * 网络定位失败，请检查设备是否插入 sim 卡、开启移动网络或开启了 wifi 模块
   */
  FAILURE_NOWIFIANDAP,

  /**
   * 卫星定位失败，可用卫星数不足
   */
  FAILURE_NOENOUGHSATELLITES,

  /**
   * 定位位置可能被模拟
   */
  FAILURE_SIMULATION_LOCATION,

  /**
   * 定位失败，飞行模式下关闭了 wifi 开关，请关闭飞行模式或者打开 wifi 开关
   */
  AIRPLANEMODE_WIFIOFF = 18,

  /**
   * 定位失败，没有检查到 sim 卡，并且关闭了 wifi 开关，请打开 wifi 开关或者插入 sim 卡
   */
  NOCGI_WIFIOFF
}

export type ErrorCode = ErrorCodeAndroid | ErrorCodeIOS;


/**
 * 地理信息返回级别
 *
 * @platform android
 */
export enum RequestLevel {
  /**
   * 包含经纬度
   */
  REQUEST_LEVEL_GEO = 0,

  /**
   * 包含经纬度, 位置名称, 位置地址
   */
  REQUEST_LEVEL_NAME = 1,

  /**
   * 包含经纬度，位置所处的中国大陆行政区划
   */
  REQUEST_LEVEL_ADMIN_AREA = 3,
  /**
   * 包含经纬度，位置所处的中国大陆行政区划及周边POI列表
   */
  REQUEST_LEVEL_POI = 4
}
/**
 * 定位模式，目前支持三种定位模式
 *
 * @platform android
 */
export enum LocationMode {
  /**
   * 低功耗模式，在这种模式下，将只使用高德网络定位。
   */
  Battery_Saving = "Battery_Saving",

  /**
   * 仅设备模式，只使用卫星定位，不支持室内环境的定位
   */
  Device_Sensors = "Device_Sensors",

  /**
   * 高精度模式，在这种定位模式下，将同时使用高德网络定位和卫星定位，优先返回精度高的定位
   */
  Hight_Accuracy = "Hight_Accuracy"
}


/**
 * 卫星信号强度
 *
 * @platform android
 */
export enum GpsAccuracy {
  UNKNOWN,
  BAD,
  GOOD
}


/**
 * 定位信息
 */
export interface Location {
  // 纬度
  latitude?:Double,
  // 经度
  longitude?:Double,
  // 海拔
  altitude?:Double,
  // 精度
  accuracy?:Double,
  // 国家
  nation?:string,
  // 省
  province?:string,
  // 市
  city?:string,
  // 区
  district?:string,
  // 镇
  town?:string,
  // 村
  village?:string,
  // 街道
  street?:string,
  // 门号
  streetNo?:string,
  // POI 列表
  poiList?:Array
}
