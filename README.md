# react-native-tencentmap-geolocation

腾讯地图定位react-native组件

## 安装

```sh
npm install react-native-tencentmap-geolocation
```

## Usage

```js
import { addLocationListener,removeLocationListener,setRequestLevel,stop,requestSingleLocation } from 'react-native-tencentmap-geolocation';


// 设置定位级别
setRequestLevel(1)
// 添加监听函数
this.listen = addLocationListener((r)=>{
console.log('定位信息',r)
})
// 请求单次定位
requestSingleLocation(true);
```
## 注意
页面销毁时必须移除监听，否则会导致多次监听，有溢出风险
本模块基于react-native 0.61.5版本调试，其他版本未进行测试，如需使用请自行完善

## 感谢
本项目参考 qiuxiang/react-native-amap-geolocation 搭建，感谢大佬

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
