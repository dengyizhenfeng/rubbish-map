<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <el-card bodyStyle="padding:0px;" class="bg">

          <div class="item-header">
            <span><i class="el-icon-caret-right"></i>满溢频次热力图</span>
          </div>
          <div style="position: relative">
            <div class="map_con">
              <div class="hogcolor">
                <ul class="hot_title">
                  <li><span> 50</span></li>
                  <li><span> 110</span></li>
                  <li><span> 170</span></li>
                  <li><span> 240</span></li>
                  <li><span> 300</span></li>
                </ul>
              </div>
            </div>
            <div id="container" ref="hotPic" style="height:640px;width: 100%"></div>
          </div>
          <div class="hot-desc" style="height: 280px">
            "根据大量的历史数据，分别从时间、地域两个方面进行预测，其中：
            <div>1、时间方面首先从预测每一周每天产出的垃圾，预测垃圾产出时间的日期最高为周六，数值为229次，最低为周二，数值为118次其余时间基本持平。</div>
            <div> 2、其次从一天的时间段产出的数据来分析，预测14-17点等时间段产出数量最多，峰值为625次，最少则为10-14点等时间段的产量，峰值为23次。</div>
            <div> 3从地域来看，预测和平去等地区最高，最新数据为436次最低区域为南开区等，数值为181次。</div>
            建议：
            <div> 从这些预测数据中可以看出，预测垃圾产量较高的地区、时间段，建议增加投放设备数量，人力资源适量增加，在预测数据较低的区域，建议适当减少设备，人力的部署来减少不必要的资源浪费。</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <div class="tools">
          <span>全部设备</span>
          <div class="export-btn"><a href="Performance.vue" style="color: #fff;text-decoration:none;" >导出页面</a></div>
        </div>
        <el-card bodyStyle="padding:0px;" class="bg">
          <div class="item-header">
            <span><i class="el-icon-caret-right"></i>未来七天环卫预测</span>
          </div>
          <div>
            <div id="sevenTest" ref="sevenTest" style="height:240px"></div>
          </div>
        </el-card>
        <el-card bodyStyle="padding:0px;" class="bg">
          <div class="item-header">
            <span><i class="el-icon-caret-right"></i>垃圾产出时间预测</span>
          </div>
          <div>
            <div id="timeTest" ref="timeTest" style="height:240px"></div>
          </div>
        </el-card>
        <el-card bodyStyle="padding:0px;" class="bg">
          <div class="item-header">
            <span><i class="el-icon-caret-right"></i>清运负荷预测</span>
          </div>
          <div>
            <div id="clearTest" ref="clearTest" style="height:240px"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import AMap from 'AMap'
  import datas from '../../static/data.js'

  export default {
    name: "Home",
    data() {
      return {
        //未来七天环卫预测
        sevenTestOption: {
          grid: {
            top: 20,    //距离容器上边界40像素
            bottom: 50   //距离容器下边界30像素
          },

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          xAxis: [
            {
              type: 'category',
              axisLabel: {
                color: "#87a0dc" //刻度线标签颜色
              },
              boundaryGap: false,
              axisLine: {
                symbol: ['none', 'arrow'],
                symbolSize: [10, 10],
                symbolOffset: [0, 0],
                lineStyle: {
                  color: '#2a315a'
                }
              },

              areaStyle: {
                color: '#ccc'
              },
              data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                fontSize: 16,
                color: "#87a0dc" //刻度线标签颜色
              },
              axisLine: {
                symbol: ['none', 'arrow'],
                symbolSize: [10, 10],
                symbolOffset: [0, 0],
                lineStyle: {
                  color: '#2a315a'
                }
              },
              splitLine: {
                show: false,
              },
            }
          ],
          series: [
            {
              type: 'line',
              stack: '总量',
              smooth: true,  //true 为平滑曲线，false为直线
              areaStyle: {
                color: 'rgba(255,153,0,.18)'
              },
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#ff9900'
                  },
                  label: {
                    show: true,
                    fontSize: 17,
                    color: '#87a0dc',
                    position: 'top',
                    formatter: '{c}'
                  }
                }
              },
              data: [12, 13, 7, 13, 9, 20, 21, 0]
            },
          ]
        },
        //垃圾产出时间预测
        timeTestOption: {
          grid: {
            top: 20,    //距离容器上边界40像素
            bottom: 50   //距离容器下边界30像素
          },

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          xAxis: [
            {
              type: 'category',
              axisLabel: {
                color: "#87a0dc" //刻度线标签颜色
              },
              boundaryGap: false,
              axisLine: {
                symbol: ['none', 'arrow'],
                symbolSize: [10, 10],
                symbolOffset: [0, 0],
                lineStyle: {
                  color: '#2a315a'
                }
              },

              areaStyle: {
                color: '#ccc'
              },
              data: ['23-5点', '5-10点', '10-14点', '14-17点', '17-23点']
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                fontSize: 16,
                color: "#87a0dc" //刻度线标签颜色
              },
              axisLine: {
                symbol: ['none', 'arrow'],
                symbolSize: [10, 10],
                symbolOffset: [0, 0],
                lineStyle: {
                  color: '#2a315a'
                }
              },
              splitLine: {
                show: false,
              },
            }
          ],
          series: [
            {
              type: 'line',
              stack: '总量',
              areaStyle: {
                color: 'rgba(255,153,0,.18)'
              },
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#ff9900'
                  },
                  label: {
                    show: true,
                    fontSize: 17,
                    color: '#87a0dc',
                    position: 'top',
                    formatter: '{c}'
                  }
                }
              },
              data: [12, 13, 1, 13, 9, 20, 21, 0]
            },
          ]
        },
        //清运负荷预测
        clearTestOption: {
          grid: {
            top: 20,    //距离容器上边界40像素
            bottom: 30   //距离容器下边界30像素
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            axisLabel: {
              color: "#87a0dc" //刻度线标签颜色
            },
            axisLine: {
              symbol: ['none', 'arrow'],
              symbolSize: [10, 10],
              symbolOffset: [0, 0],
              lineStyle: {
                color: '#2a315a'
              }
            },
            data: ['和平区', '河西区', '河北区', '满开区', '滨海区']
          },
          yAxis: [
            {
              axisLabel: {
                fontSize: 16,
                color: "#87a0dc" //刻度线标签颜色
              },
              type: 'value',
              boundaryGap: true,
              axisLine: {
                symbol: ['none', 'arrow'],
                symbolSize: [10, 10],
                symbolOffset: [0, 0],
                lineStyle: {
                  color: '#2a315a'
                }
              },
              splitLine: {
                show: false,
              },
            }
          ],
          // splitLine: {show: true, lineStyle: {type: 'dashed'}},
          series: [
            {
              name: '数量',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: function (params) {
                    return new echarts.graphic.LinearGradient(0, 0, 0, 1,
                      [
                        {offset: 0, color: '#0282de'},
                        {offset: 1, color: '#3f28d0'}
                      ]);
                  },
                  barBorderRadius: [5, 5, 0, 0],
                  label: {
                    show: true,
                    color: '#87a0dc',
                    position: 'top',
                    formatter: '{c}'
                  }
                }
              },
              barWidth: 30,
              data: [28, 15, 9, 4, 22]
            }
          ]

        },

      };
    },
    mounted() {
      this.init()
      let sevenTests = this.$echarts.init(this.$refs.sevenTest);
      sevenTests.setOption(this.sevenTestOption);

      let timeTest = this.$echarts.init(this.$refs.timeTest);
      timeTest.setOption(this.timeTestOption);

      let clearTest = this.$echarts.init(this.$refs.clearTest);
      clearTest.setOption(this.clearTestOption);
    },
    methods: {
      init() {
        // 显示地图
        var map = new AMap.Map(this.$refs.hotPic, {
          resizeEnable: true,
          center: [116.418261, 39.921984], //中心点
          zoom: 11, //缩放比例
          scrollWheel: true, // 禁止鼠标滚轮缩放
          dragEnable: true, //禁止拖动
          // mapStyle: 'amap://styles/darkblue', //设置地图的显示样式
        });
        if (!isSupportCanvas()) {
          alert('热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~')
        }

        map.plugin(["AMap.Heatmap"], function () {
          var heatmap = new AMap.Heatmap(map, {
            radius: 25, //给定半径
            opacity: [0, 0.8]
          });
          heatmap.setDataSet({
            data: datas,
            max: 50
          });
        })

        //判断浏览区是否支持canvas
        function isSupportCanvas() {
          var elem = document.createElement('canvas');
          return !!(elem.getContext && elem.getContext('2d'));
        }
      }
    },
  };
</script>
<style scoped>
  .el-card {
    margin-bottom: 20px;
    border: none;
    background: none;
  }

  .bg {
    background: rgba(36, 38, 67, 0.51);
  }

  .item-header, .tools {
    font-size: 22px;
    color: #7ffafe;
    height: 60px;
    line-height: 60px;
    padding: 0 15px;
  }

  .tools {
    color: #bae8ff;
    font-size: 24px;

  }

  .hot-desc {
    padding: 0 25px;
    font-size: 16px;
    line-height: 30px;
    color: #8293aa;
    margin-top: 15px;
  }

  .hot-desc div {
    text-indent: 2em;
  }

  .export-btn {
    float: right;
    width: 117px;
    height: 38px;
    line-height: 38px;
    background-color: #3881c5;
    border-radius: 19px;
    text-align: center;
    color: #fff;
    font-size: 20px;

  }
  .map_con {
    position: absolute;
    left: 20px;
    top: 30px;
  }


  .hogcolor {
    position: absolute;
    width: 25px;
    height: 200px;
    top: 0;
    left: 0;
    z-index: 666;
    background-image: linear-gradient(to bottom, #1800ff, #f6fcff, #3cff36, #fff224, #ff0300)
  }
  .hogcolor:before {
    content: "";
    float: left;
    width: 100%;
    height: 100%;
    margin-bottom: -100%;
    background-color: rgba(0, 0, 0, .2)
  }

  .hot_title {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    position: relative
  }

  .hot_title li {
    list-style: none;
    width: 10%;
    position: absolute;
    top: 10%;
    /* left: 100%; */
    background-color: #fff;
    height: 1px;
    z-index: 777;
    font-size: 10px;
    color: #000;
    font-weight: 600
  }

  .hot_title li:nth-of-type(2) {
    top: 30%
  }

  .hot_title li:nth-of-type(3) {
    top: 50%
  }

  .hot_title li:nth-of-type(4) {
    top: 70%
  }

  .hot_title li:nth-of-type(5) {
    top: 90%
  }
</style>
