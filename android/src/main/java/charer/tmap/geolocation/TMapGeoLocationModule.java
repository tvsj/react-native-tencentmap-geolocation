package charer.tmap.geolocation;



import static com.facebook.imagepipeline.nativecode.NativeJpegTranscoder.TAG;

import android.content.Context;
import android.os.Looper;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.tencent.map.geolocation.TencentLocation;
import com.tencent.map.geolocation.TencentLocationListener;
import com.tencent.map.geolocation.TencentLocationManager;
import com.tencent.map.geolocation.TencentLocationRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

@SuppressWarnings("unused")
public class TMapGeoLocationModule extends ReactContextBaseJavaModule implements TencentLocationListener {
  private ReactApplicationContext reactContext;
  private DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter;
  private TencentLocationRequest request;
  private TencentLocationManager mLocationManager;
  private int requestLevel;


  TMapGeoLocationModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;

    TencentLocationManager.setUserAgreePrivacy(true);
    request = TencentLocationRequest.create();
    mLocationManager = TencentLocationManager.getInstance(reactContext);
    String deviceId = mLocationManager.getOaid();
    mLocationManager.setDeviceID(reactContext, deviceId);

  }

  @Override
  public void onLocationChanged(TencentLocation location, int error, String reason) {
    Log.d(TAG, "onLocationChanged: " + toJSON(location));
    if (reactContext != null) {
      eventEmitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
      if (eventEmitter != null) {
        if (error == 0) {
          eventEmitter.emit("TMapGeolocation", toJSON(location));
        }
      }
    }

  }

  @Override
  public void onStatusUpdate(String name, int status, String desc) {
    // do your work
  }

  @Override
  public String getName() {
    return "TMapGeolocation";
  }

  @ReactMethod
  public void start() {
    mLocationManager.requestLocationUpdates(request, this);
  }

  @ReactMethod
  public void stop() {
    mLocationManager.removeUpdates(this);
  }

  @ReactMethod
  public void getLastKnownLocation(Promise promise) {
    promise.resolve(toJSON(mLocationManager.getLastKnownLocation()));
  }


  @ReactMethod
  public void setAllowGPS(boolean value) {
    request.setAllowGPS(value);
  }

  @ReactMethod
  public void setInterval(long s) {
    request.setInterval(s);
  }

  @ReactMethod
  public void setRequestLevel(int value) {
    requestLevel = value;
    request.setRequestLevel(value);
  }

  //    请求单次定位
  @ReactMethod
  public void requestSingleLocation(boolean value) {
    Log.d(TAG, "requestSingleLocation: 请求单次定位");
    mLocationManager.requestSingleFreshLocation(request, this, Looper.getMainLooper());
  }

  @ReactMethod
  public void setMockEnable(boolean value) {
//        mLocationManager.setMockEnable(value);
  }


  @ReactMethod
  public void setGpsFirst(boolean value) {
//        request.setGpsFirst(value);
  }

  @ReactMethod
  public void setLocMode(int value) {
//    request.setLocMode(value);
  }


  private ReadableMap toJSON(TencentLocation location) {
    if (location == null) {
      return null;
    }

    WritableMap map = Arguments.createMap();
    map.putDouble("timestamp", location.getTime());
    map.putDouble("latitude", location.getLatitude());
    map.putDouble("longitude", location.getLongitude());
    map.putDouble("altitude", location.getAltitude());
    map.putDouble("accuracy", location.getAccuracy());
    map.putDouble("speed", location.getSpeed());
    if (requestLevel >= TencentLocationRequest.REQUEST_LEVEL_NAME) {
      map.putString("address", location.getAddress());
      map.putString("name", location.getName());
    }
    if (requestLevel >= TencentLocationRequest.REQUEST_LEVEL_ADMIN_AREA) {
      map.putString("nation", location.getNation());
      map.putString("province", location.getProvince());
      map.putString("city", location.getCity());
      map.putString("cityCode", location.getCityCode());
      map.putString("district", location.getDistrict());
      map.putString("town", location.getTown());
      map.putString("village", location.getVillage());
      map.putString("street", location.getStreet());
      map.putString("streetNo", location.getStreetNo());
    }
    if (requestLevel == TencentLocationRequest.REQUEST_LEVEL_POI) {
      try {

        JSONArray jsonArray = new JSONArray(location.getPoiList());
        ArrayList<JSONObject> poiObjects = new ArrayList<>();

        // 遍历 JSONArray，并将每个 JSONObject 添加到 ArrayList 中
        for (int i = 0; i < jsonArray.length(); i++) {
          poiObjects.add(jsonArray.getJSONObject(i));
        }
        // 使用 Arguments.fromArray() 将 ArrayList 转换为 ReadableArray
        ReadableArray readableArray = Arguments.fromArray(poiObjects.toArray());
        map.putArray("poiList", readableArray);
      } catch (JSONException e) {
        throw new RuntimeException(e);
      }

    }

    return map;
  }
}
