<template>
  <div style="position: relative">
    <div class="select" v-if="show">
      <el-select id="select" v-model="value2">
        <el-option
          v-for="item in option"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div style="height:900px">
      <div ref="dommap1" v-if="show1" style="height:900px"></div>
    </div>
    <div class="tab-warp">
      <div class="tab-item" @click="mapshow">地图显示</div>
      <div class="tab-item" @click="equShow">设备直显</div>
    </div>
    <div style="position: relative">
      <div class="item-btn-left" @click="sildeLeft">
        <i class="el-icon-arrow-left"></i>
      </div>

      <div class="item-btn-warp" ref="left">
        <div :style="{width:110*btnArr.length+'px'}" style="overflow: hidden">
          <div class="item-btn" v-for="item in btnArr" @click="selectItem">{{item}}</div>
        </div>
      </div>
      <div class="item-btn-right" @click="sildeRight">
        <i class="el-icon-arrow-right"></i>
      </div>

    </div>
  </div>
</template>

<script>
  import AMap from 'AMap'

  export default {
    name: "map",
    data() {
      return {
        value2: "",
        option: [
          {
            value: '0',
            label: '请选择',
            disabled: true
          }, {
            value: '1',
            label: '正常'

          }, {
            value: '2',
            label: '溢满'
          }, {
            value: '4',
            label: '倾倒'
          }, {
            value: '5',
            label: '起火'
          }, {
            value: '6',
            label: '低电量'
          }, {
            value: '3',
            label: '全部'
          }
        ],
        btnArr: ['1号', '2号', '3号', '4号', '5号', '6号'],
        show1: true,
        show: false,
      }
    },
    mounted() {
      this.map1()
    },
    methods: {
      equShow() {
        this.map2(this, {value: [118.087503, 28.910786]})
      },
      sildeLeft() {
        this.$refs['left'].scrollLeft = this.$refs['left'].scrollLeft - 10
      },
      sildeRight() {
        this.$refs['left'].scrollLeft = this.$refs['left'].scrollLeft + 10
      },
      mapshow() {
        this.$nextTick(() => {
          this.show1 = false
          setTimeout(() => {
            this.show1 = true
            this.map1()
          }, 400)
          setTimeout(() => {
            this.map1()
          }, 600)
        })
        // this.$refs.dommap1.location.reload()
        // window.location.reload()

      },
      selectItem() {
        this.map3(this.initMap({}), '1')
      },
      initMap(option) {
        this.show = false
        this.initChart().clear();
        return new AMap.Map(this.$refs.dommap1, option, true);
      },
      initChart() {
        this.show = false
        let dom = this.$refs['dommap1']
        return this.$echarts.init(dom);
      },
      map1() {
        let _this = this
        var myChart = this.initChart()
        myChart.showLoading();
        this.$axios.get('/static/beijing.json').then((geoJson) => {
          this.$echarts.registerMap('jiangxi', geoJson.data);
          myChart.hideLoading();
          var geoCoordMap = {
            '三清山': [118.087503, 28.910786],
            '篁岭': [118.129012, 29.329429],
            '集中营': [117.971185, 28.44442],
            '江湾': [118.055561, 29.371926],
            '鄱阳湖': [116.684921, 29.139641],
            '神龙宫': [117.262477, 28.713321],
            '鹅湖书院': [117.826036, 28.262454],
            '九仙湖': [118.29856, 28.240933],
            '圭峰': [117.410065, 28.317133],
            '葛源': [117.677279, 28.602355],
            '灵山': [117.840565, 28.556462],
          }
          var data = [
            {name: '三清山', value: 399},
            {name: '篁岭', value: 239},
            {name: '集中营', value: 152},
            {name: '江湾', value: 299},
            {name: '鄱阳湖', value: 289},
            {name: '神龙宫', value: 152},
            {name: '鹅湖书院', value: 99},
            {name: '九仙湖', value: 352},
            {name: '圭峰', value: 299},
            {name: '葛源', value: 139},
            {name: '灵山', value: 280},
          ];
          var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
              var geoCoord = geoCoordMap[data[i].name];
              if (geoCoord) {
                res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value)
                });
              }
            }
            return res;
          };
          let option = {
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (typeof(params.value) === "object") {
                  return params.name + ' : ' + params.value;
                } else {
                  return '';
                }
              }
            },

            visualMap: {
              show: false,
            },
            geo: {
              show: true,
              map: 'jiangxi',
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false,
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#094ea0',
                  borderColor: '#66a6ea',
                },
                emphasis: {
                  areaColor: '#2B91B7',
                }
              }
            },
            series: [
              {
                type: 'map',
                map: 'jiangxi',
                geoIndex: 0,
                aspectScale: 0.75, //长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                  },
                  emphasis: {
                    show: true
                  }
                },
                roam: true,
                itemStyle: {
                  normal: {
                    areaColor: '#031525',
                    borderColor: '#3B5077',
                  },
                  emphasis: {
                    areaColor: '#2B91B7'
                  }
                },
                animation: false,
                data: data
              },
              {
                name: '点',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'image://static/img/imgs.png',
                symbolSize: [23, 40],
                zlevel: 6,
                data: convertData(data),
              },

            ]
          };
          myChart.setOption(option, true);
        })
        myChart.on('click', function (params) {
          if (params.value) {
            _this.map2(_this, params)
            myChart.clear();
          }
        })
      },

      map2(_this, params) {
        let option = {
          resizeEnable: true,
          center: [118.087503, 28.910786],
          zoom: 4,
          zooms: [3, 20],
          scrollWheel: true, // 禁止鼠标滚轮缩放
          dragEnable: true, //禁止拖动
        }
        var marker, map = this.initMap(option);
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView'],
          function () {
            map.addControl(new AMap.Scale());
          });
        var Icon = new AMap.Icon({
          size: new AMap.Size(64, 64),
          image: '/static/img/laji.png',
          imageSize: new AMap.Size(64, 64),

        });

        marker = new AMap.Marker({
          icon: Icon,
          position: params.value,
          offset: new AMap.Pixel(-13, -30),
          label: {
            content: "<div class='icon_con'>2</div>",
            offset: new AMap.Pixel(25, 25)
          }
        });
        AMap.event.addListener(marker, 'click', function (e) {
          _this.show = true
          _this.map3(map, _this.value2)
          _this.$watch('value2', function (e) {
            _this.map3(map, _this.value2)
          })
        });
        marker.setMap(map);
      },
      map3(map, value2) {


        function icon(index) {
          if (index === '1') {
            return '/static/img/iconGreen.png'
          } else if (index === '2') {
            return '/static/img/iconYellow.png'
          } else if (index === '3') {
            return '/static/img/iconRed.png'
          } else if (index === '4') {
            return '/static/img/iconRed.png'
          } else if (index === '5') {
            return '/static/img/iconRed.png'
          } else if (index === '6') {
            return '/static/img/iconRed.png'
          } else {
            return '/static/img/iconRed.png'
          }
        }

        let statusIcon = new AMap.Icon({
          size: {width: 30, height: 30},
          imageOffset: {x: 0, y: 0},
          image: icon(value2),
          imageSize: {width: 30, height: 30}
        })
        map.clearMap();
        map.setZoomAndCenter(13, [116.43, 39.92]);
        var lnglats = [[116.39, 39.92], [116.41, 39.93], [116.43, 39.91], [116.46, 39.93]];
        var markers = [];
        //实例化信息窗体
        var content = [];
        content.push('<ul class="con"><li>名字：xxxx</li><li>所属：2323</li><li>点位：23</li><li>时间：444</li><li>imei：234</li></ul>\n');
        var infoWindow = new AMap.InfoWindow({
          isCustom: true,  //使用自定义窗体
          content: createInfoWindow('', content.join("<br/>")),
          offset: new AMap.Pixel(0, -45)
        });

        //构建自定义信息窗体
        function createInfoWindow(title, content) {
          var info = document.createElement("div");
          info.className = "custom-info input-card content-window-card";

          //可以通过下面的方式修改自定义窗体的宽高
          //info.style.width = "400px";
          // 定义顶部标题
          var top = document.createElement("div");
          var titleD = document.createElement("div");
          var closeX = document.createElement("img");
          top.className = "info-top";
          titleD.innerHTML = title;
          closeX.src = "https://webapi.amap.com/images/close2.gif";
          closeX.onclick = closeInfoWindow;

          top.appendChild(titleD);
          top.appendChild(closeX);
          info.appendChild(top);

          // 定义中部内容
          var middle = document.createElement("div");
          middle.className = "info-middle";
          middle.style.backgroundColor = 'white';
          middle.innerHTML = content;
          info.appendChild(middle);

          // 定义底部内容
          var bottom = document.createElement("div");
          bottom.className = "info-bottom";
          bottom.style.position = 'relative';
          bottom.style.top = '0px';
          bottom.style.margin = '0 auto';
          var sharp = document.createElement("img");
          sharp.src = /*"https://webapi.amap.com/images/sharp.png"*/ "/static/img/sharp.png";
          sharp.style.position = 'absolute';
          sharp.style.left = '50%';
          sharp.style.transform = 'translateX(-50%)';
          bottom.appendChild(sharp);
          info.appendChild(bottom);
          return info;
        }

        //关闭信息窗体
        function closeInfoWindow() {
          map.clearInfoWindow();
        }

        for (var i = 0; i < lnglats.length; i++) {
          var lnglat = lnglats[i];
          // 创建点实例
          var markersub = new AMap.Marker({
            position: new AMap.LngLat(lnglat[0], lnglat[1]),
            icon: statusIcon,
            extData: {
              id: i + 1
            },
            map: map,
          });
          markers.push(markersub);
          AMap.event.addListener(markersub, 'click', function (e) {
            console.log(e);
            infoWindow.open(map, [e.lnglat.lng, e.lnglat.lat]);
          })
        }
      }
    }

  }

</script>
<style>
  .amap-marker-label {
    border: none !important;
    background-color: unset !important;
    font-size: 20px !important;
  }

  ul.con {
    width: 250px;
    display: block;
    margin: 0;
    padding: 10px 15px;
    list-style: none;
  }

  ul.con li {
    height: 30px;
    line-height: 30px;
    white-space: nowrap;
  }

  .custom-info {
    position: relative;
  }

  .info-top {
    position: absolute;
    right: 10px;
    top: 10px;
  }
</style>
<style scoped>
  .tab-warp {
    min-width: 220px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 10px;
  }

  .item-btn-warp {
    padding:0 30px 30px;
    box-sizing: border-box;
    width: 95%;
    height: 70px;
    margin: 70px auto 0;
    position: relative;
    overflow-x: scroll;
    overflow-y: hidden;
    /*padding: 0 30px;*/
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  .item-btn-left {
    height: 50px;
    width: 20px;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 99;
    background: #fff;
  }

  .item-btn-left i, .item-btn-right i {
    color: #000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .item-btn-right {
    height: 50px;
    width: 20px;
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 99;
    background: #fff;

  }

  .item-btn {
    box-sizing: border-box;
    background: #1f2341;
    color: #fff;
    width: 100px;
    height: 50px;
    line-height: 50px;
    float: left;
    text-align: center;
    margin-right: 10px;
    border: 1px solid yellow;
  }

  .select {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 99999;
  }

  .tab-item {
    background: #1f2341;
    color: #fff;
    width: 100px;
    height: 40px;
    line-height: 40px;
    float: left;
    text-align: center;
  }

  .tab-warp :first-child {
    float: left;
    background: #068faa;
  }

  .tab-warp :last-child {
    float: right;
    background: #3e2efb;
  }
</style>

<style>
  /*滚动条样式*/
  .item-btn-warp::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  .item-btn-warp::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    background: transparent;
  }
  .item-btn-warp::-webkit-scrollbar-track {/*滚动条里面轨道*/
    border-radius: 0;
    background: transparent;
  }
</style>
