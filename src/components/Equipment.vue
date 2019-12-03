<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <el-card bodyStyle="padding:0px;" class="bg">
          <div class="item-header">
            <span><i class="el-icon-caret-right"></i>今日报修设备一览</span>
          </div>
          <div id="todayView" ref="todayView" style="height:290px"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <el-card class="bg" bodyStyle="padding:0px; padding-bottom: 20px;">
          <div>
            <el-row>
              <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <div class="item-header">
                  <span>在线设备</span>
                  <div class="edpt-num" v-if="selectIndex===1">{{selectValues}}</div>
                </div>
                <div id="pie1" ref="pie1" class="pie" style="height:270px"></div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <div class="item-header">
                  <span>异常设备</span>
                  <div class="edpt-num" v-if="selectIndex===2">{{selectValues}}</div>
                </div>
                <div id="pie2" ref="pie2" class="pie" style="height:270px"></div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <div class="item-header">
                  <span>满溢设备</span>
                  <div class="edpt-num" v-if="selectIndex===3">{{selectValues}}</div>
                </div>
                <div id="pie3" ref="pie3" style="height:270px"></div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <div class="item-header">
                  <span>未满设备</span>
                  <div class="edpt-num" v-if="selectIndex===4">{{selectValues}}</div>
                </div>
                <div id="pie4" ref="pie4" style="height:270px"></div>
              </el-col>
            </el-row>

          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <el-card bodyStyle="padding:0px;" class="bg">
          <div class="item-header">
            <span><i class="el-icon-caret-right"></i>每时报修统计</span>
          </div>
          <div>
            <div id="statistical" ref="statistical" style="height:420px"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <el-card bodyStyle="padding:0px;" class="bg">
          <div class="item-header">
            <span><i class="el-icon-caret-right"></i>设备状态监控</span>
          </div>
          <div>
            <div id="mainChart" ref="mainChart" style="height:420px"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: "Home",
    data() {
      return {
        selectIndex: 0,
        selectValues: 0,
        // 设备状态监控
        mainChartOption: {
          grid: {
            bottom: 50   //距离容器下边界30像素
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#4e9bd6"
              }
            }
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
          },
          legend: {
            align: 'right',
            right: 40,
            itemWidth: 21,
            itemHeight: 18,
            itemGap: 20,
            textStyle: {//图例文字的样式
              color: '#7287bc',
              fontSize: 20
            },
            data: ["满溢", "未满", '起火', '倾倒', '低电量']
          },
          xAxis: [
            {
              type: "category",
              axisLine: {
                symbol: ['none', 'arrow'],
                symbolSize: [10, 10],
                symbolOffset: [0, 0],
                lineStyle: {
                  color: '#2a315a'
                }
              },

              axisLabel: {
                fontSize: 16,
                color: "#87a0dc" //刻度线标签颜色
              },
              data: [
                "12:00",
                "12:30",
                "13:00",
                "13:30",
                "14:00",
                "14:30",
              ],
              axisPointer: {
                type: "shadow"
              }
            }
          ],
          yAxis: [

            {
              type: "value",
              interval: 10,
              axisLine: {
                symbol: ['none', 'arrow'],
                symbolSize: [10, 10],
                symbolOffset: [0, 0],
                lineStyle: {
                  color: '#2a315a'
                }
              },
              axisLabel: {
                fontSize: 16,
                color: "#87a0dc" //刻度线标签颜色
              },
              splitLine: {
                show: true,
                lineStyle: {
                  // 使用深浅的间隔色
                  type: 'solid',
                  color: ['#2a315a', '#2a315a']
                }
              },
            }
          ],
          series: [
            {
              name: "满溢",
              type: "bar",
              color: "#bd0000",
              data: [50, 23, 21, 44, 55, 2]
            },
            {
              name: "未满",
              type: "bar",
              color: "#07bd2b",
              //line //yAxisIndex: 1,
              data: [21, 3, 1, 14, 25, 12]

            },
            {
              name: "起火",
              type: "bar",
              color: "#ff9900",
              //line //yAxisIndex: 1,
              data: [12, 13, 1, 4, 5, 21]

            },
            {
              name: "倾倒",
              type: "bar",
              color: "#ffcc66",
              //line //yAxisIndex: 1,
              data: [13, 3, 10, 4, 5, 20]

            },
            {
              name: "低电量",
              type: "bar",
              color: "#999999",
              //line //yAxisIndex: 1,
              data: [2, 2, 11, 4, 5, 2]

            }
          ]
        },
        //今日报修设备一览
        todayViewOption: {
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
            splitLine: {
              show: true,
              lineStyle: {
                // 使用深浅的间隔色
                type: 'dashed',
                color: ['#2a315a', '#2a315a']
              }
            },

            data: ['起火设备', '低电量设备', '倾倒设备', '人为损坏']
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
                show: true,
                lineStyle: {
                  type: 'dashed',
                  color: ['#2a315a', '#2a315a']
                }
              },
              minInterval: 5,
              maxInterval: 5,
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
                    var colorList = [
                      '#b50101', '#999999', '#ff9900', '#ffcc66'
                    ];
                    return colorList[params.dataIndex]
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
              data: [28, 15, 36, 4]
            }
          ]

        },
        //每时报修统计
        statisticalOption: {
          grid: {
            top: 20,    //距离容器上边界40像素
            bottom: 50   //距离容器下边界30像素
          },
          formatter: function (params) {

            var res = '<div style="padding: 0 5px">' +
              '<div>' + params[0].name + '</div>' +
              '<div>' +
              '<i class="item-dot" style=" display: inline-block;width: 10px;height: 10px;background: #bd0000;border-radius: 50%;margin-right: 10px"></i>' +
              '紧急情况 <span>11</span></div>' +
              '<div>' +
              '<i class="item-dot" style=" display: inline-block;width: 10px;height: 10px;background: #07bd2b;border-radius: 50%;margin-right: 10px"></i>' +
              '设备起火 <span>11</span></div>' +
              '<div>' +
              '<i class="item-dot" style=" display: inline-block;width: 10px;height: 10px;background: #ff9900;border-radius: 50%;margin-right: 10px"></i>' +
              '设备倾倒 <span>11</span></div>' +
              '<div>' +
              '<i class="item-dot" style=" display: inline-block;width: 10px;height: 10px;background: #ffcc66;border-radius: 50%;margin-right: 10px"></i>' +
              '人为损坏 <span>5</span></div>' +
              '</div>'
            return res;
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
              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed',
                  color: ['#2a315a', '#2a315a']
                }
              },
              areaStyle: {
                color: '#ccc'
              },
              data: ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00']
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
                show: true,
                lineStyle: {
                  type: 'dashed',
                  color: ['#2a315a', '#2a315a']
                }
              },
              minInterval: 3,
              maxInterval: 3,
              min: 0
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
              data: [12, 13, 3, 13, 9, 20, 19, 4]
            },
          ]
        },
        //四个饼状图
        pieOption: {
          title: {
            text: "84%",
            x: 'center',
            y: 'center',
            textStyle: {
              color: "#fff",
              fontSize: 30,
              fontWeight: 'normal'
            },
          },
          series: [
            {
              type: 'pie',
              radius: ['45%', '85%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center',
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold',
                    color: '#ccc'
                  }
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 335},
                {value: 1548}
              ],
              color: ['#44aada', '#2b3461'],
              itemStyle: {
                emphasis: {
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                  shadowBlur: 10
                }
              }
            }
          ]
        }
      };
    },
    mounted() {
      let _this = this
      //今日报修设备一览
      let todayView = this.$echarts.init(this.$refs.todayView);
      todayView.setOption(this.todayViewOption);
      //每时报修统计
      let statistical = this.$echarts.init(this.$refs.statistical);
      statistical.setOption(this.statisticalOption);
      //设备状态监控
      let mainChart = this.$echarts.init(this.$refs.mainChart);
      mainChart.setOption(this.mainChartOption);

      let pie1 = this.$echarts.init(this.$refs.pie1)
      this.pieOption.title.text = '86%'
      this.pieOption.series[0].data = [{value: 86}, {value: 14}]
      pie1.setOption(this.pieOption);
      pie1.on('mouseover', function (params) {
        _this.$nextTick(() => {
          _this.selectIndex = 1
        })
        _this.selectValues = params.value
      })
      pie1.on('mouseout', function (params) {
        _this.selectIndex = 0
        _this.selectValues = ''
      })

      let pie2 = this.$echarts.init(this.$refs.pie2);
      this.pieOption.series[0].color = ['#d18500', '#2b3461']
      this.pieOption.title.text = '14%'
      this.pieOption.series[0].data = [{value: 14}, {value: 86}]
      pie2.setOption(this.pieOption);
      pie2.on('mouseover', function (params) {
        _this.selectIndex = 2
        _this.selectValues = params.value
      })
      pie2.on('mouseout', function (params) {
        _this.selectIndex = 0
        _this.selectValues = ''
      })

      let pie3 = this.$echarts.init(this.$refs.pie3);
      this.pieOption.series[0].color = ['#b00000', '#2b3461']
      this.pieOption.title.text = '79%'
      this.pieOption.series[0].data = [{value: 79}, {value: 21}]
      pie3.setOption(this.pieOption);
      pie3.on('mouseover', function (params) {
        _this.selectIndex = 3
        _this.selectValues = params.value
      })
      pie3.on('mouseout', function (params) {
        _this.selectIndex = 0
        _this.selectValues = ''
      })


      let pie4 = this.$echarts.init(this.$refs.pie4);
      this.pieOption.title.text = '21%'
      this.pieOption.series[0].data = [{value: 21}, {value: 79}]
      this.pieOption.series[0].color = ['#5c861a', '#2b3461']
      pie4.setOption(this.pieOption);
      pie4.on('mouseover', function (params) {
        _this.selectIndex = 4
        _this.selectValues = params.value
      })
      pie4.on('mouseout', function (params) {
        _this.selectIndex = 0
        _this.selectValues = ''
      })
    },
    methods: {},
    created() {

    }
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

  .item-header {
    font-size: 22px;
    color: #7ffafe;
    height: 60px;
    line-height: 60px;
    padding: 0 15px;
  }

  .edpt-num {
    margin-top: 15px;
    font-size: 16px;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    float: right;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 10px;
  }

  .item-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: red;
    border-radius: 50%;
  }

  #pie1, #pie2, #pie3 {
    border-right: 1px solid #4f5a98;
  }
</style>
