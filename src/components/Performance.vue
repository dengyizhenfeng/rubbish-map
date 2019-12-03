<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <el-card bodyStyle="padding:0px;" class="bg">
          <div class="item-header">
            <span><i class="el-icon-caret-right"></i>当日清理统计</span>
          </div>
          <div style="height:320px;position: relative">
            <div class="tool-warp">
              <div class="tool-left-item">
                <div class="tool-item-title">环卫工人</div>
                <div class="tool-item-num">958<span>桶</span></div>
              </div>
              <div class="tool-right-item">
                <div class="tool-item-title">清运司机</div>
                <div class="tool-item-num">958<span>桶</span></div>
              </div>
            </div>
            <div id="todayView" ref="todayView" style="height:320px"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <el-card bodyStyle="padding:0px;" class="bg">

          <div style="padding-bottom: 20px">
            <el-row>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="item-header">
                  <span>清运及时性</span>
                </div>
                <div id="pie1" ref="pie1" style="height:300px"></div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="item-header">
                  <span>任务负荷 </span>
                </div>
                <div id="pie2" ref="pie2" style="height:300px"></div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="item-header">
                  <span>车辆里程</span>
                </div>
                <div id="pie3" ref="pie3" style="height:300px"></div>
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
            <span><i class="el-icon-caret-right"></i>当日清理排行榜</span>
          </div>
          <div class="today-clear-warp">
            <div id="todayClear" ref="todayClear" style="height:170px"></div>
            <div class="today-clear-tool">
              <div class="today-clear-tool-item" v-for="(item,index) in seriesData">
                <span class="dot" :style="{'background':seriesColor[index]}"></span>
                <span class="num">{{item.value}}</span>
                <span class="line"></span>
                <span class="name">{{item.name}}</span>
              </div>
            </div>
          </div>
        </el-card>
        <el-card bodyStyle="padding:0px;" class="bg">
          <div class="item-header">
            <span><i class="el-icon-caret-right"></i>七天内清理记录</span>
          </div>
          <div class="record-item" v-for="item in recordList">
            <div class="record-item-lable">{{item.lable}}</div>
            <div class="record-item-progress">
              <el-progress :color="item.color" :text-inside="false" textInside="false" show-text="false"
                           :stroke-width="17"
                           :percentage="item.percentage"></el-progress>
            </div>
            <div class="record-item-num">{{item.num}}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <el-card bodyStyle="padding:0px;" class="bg">
          <div class="item-header">
            <span>全年清理记录</span>
          </div>
          <div>
            <div id="mainChart" ref="mainChart" style="height:540px"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import echarts from 'echarts'

  export default {
    name: "Home",
    data() {
      let seriesColor = ['#54bdee', '#92d32c', '#f37c13', '#c51010']
      return {
        //当日清理排行榜  右侧相关数据
        seriesData: [
          {value: 460, name: 'xxx'},
          {value: 154, name: 'ccc'},
          {value: 148, name: 'vvv'},
          {value: 118, name: 'bbb'}
        ],
        seriesColor: seriesColor,
        // 设备状态监控
        mainChartOption: {
          grid: {
            right: 50,
            left: 50,
            bottom: 50
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
            data: [{
              name: '清运工',
              icon: 'circle',
            }, {
              name: '环卫车',
              icon: 'circle',
            }],
            textStyle: {//图例文字的样式
              color: '#7287bc',
            },
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
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月",
              ],
              boundaryGap: true,
              axisPointer: {
                type: "shadow"
              }
            }
          ],
          yAxis: [
            {

              show: true,
              type: "value",
              boundaryGap: true,
              min: 0,
              max: 1000,
              interval: 100,
              axisLabel: {
                formatter: "{value}",
                fontSize: 16,
                color: "#87a0dc" //刻度线标签颜色
              },
              splitLine: {
                show: false,
              },
              axisLine: {
                symbol: ['none', 'arrow'],
                symbolSize: [10, 10],
                symbolOffset: [0, 0],
                lineStyle: {
                  color: '#2a315a'
                }
              },
              minInterval: 100,
              maxInterval: 100,
            }
          ],
          series: [
            {
              name: "环卫车",
              type: "bar",
              color: "#249cf9",
              data: [113, 214, 323, 113, 252, 123, 324, 126, 332, 112, 341, 121],
              barGap: '30%',
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#87a0dc'
                  },
                  formatter: function (params) {
                    console.log(params);
                    return params.data
                  }
                }
              },
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'insideTop', //在上方显示
                    textStyle: { //数值样式
                      color: '#ffffff',
                      fontSize: 16
                    }
                  }
                }
              },

            },

            {
              name: "清运工",
              type: "bar",
              color: "#f37c13",
              data: [213, 412, 213, 110, 126, 112, 331, 132, 223, 143, 211, 110],
              barGap: '0%',
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#87a0dc'
                  },
                  formatter: function (params) {
                    return '12'
                  }
                }
              },
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'insideTop', //在上方显示
                    textStyle: { //数值样式
                      color: '#fff',
                      fontSize: 16
                    }
                  }
                }
              }
            },
          ]
        },
        //当日清理统计
        todayViewOption: {
          grid: {
            right: 20,    //距离容器上边界40像素
            bottom: 50   //距离容器下边界30像素
          },
          legend: {
            align: 'left',
            right: 40,
            itemWidth: 20,
            itemHeight: 20,
            orient: 'vertical',
            x: 'right',

            data: [{
              name: '环卫工人',
              icon: 'circle',

            }, {
              name: '清运司机',
              icon: 'circle',
            }],
            textStyle: {//图例文字的样式
              color: '#7287bc',
            },
          },
          // 定义样式和数据
          tooltip: {
            trigger: 'axis'
          },
          calculable: true,
          xAxis: [
            {
              splitLine: {
                show: false,
              },
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
                color: "#87a0dc", //刻度线标签颜色
              },

              type: 'category',
              data: ['11:00', "12:00", "13:00", '23', '23', '23']
            }],
          yAxis: [
            {
              type: 'value',

              splitLine: {
                show: false,
              },
              boundaryGap: true,
              axisLine: {
                symbol: ['none', 'arrow'],
                symbolSize: [10, 10],
                symbolOffset: [0, 0],
                lineStyle: {
                  color: '#2a315a'
                },

              },
              axisLabel: {
                fontSize: 16,
                color: "#87a0dc" //刻度线标签颜色
              },
              minInterval: 200,
              maxInterval: 200,
            }],
          series: [{
            name: '环卫工人',
            type: 'line',
            symbol: 'none',
            smooth: 0.3,
            color: ['#ab67f1'],
            data: [800, 300, 500, 800, 300, 600, 500, 600],
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#ab67f1'
                }, {
                  offset: 1,
                  color: 'rgba(171,103,241,0.4)'
                }])
              }
            },
          }, {
            name: '清运司机',
            type: 'line',
            symbol: 'none',
            smooth: 0.3,
            color: ['#3d62f6'],
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#3d62f6'
                }, {
                  offset: 1,
                  color: 'rgba(61,98,246,0.4)'

                }])
              }
            },
            data: [600, 300, 400, 200, 300, 300, 200, 400]
          }]
        },
        //当日清理排行榜
        todayClearOption: {
          grid: {
            top: 0,
            right: 20,    //距离容器上边界40像素
            bottom: 0   //距离容器下边界30像素
          },
          title: {
            subtext: '200桶',
            left: '39%',
            top: '30%',
            textAlign: 'center',
            subtextStyle: {
              color: '#fff',
              align: 'center',
              fontSize: 20,
            },
          },
          legend: {
            show: false,
          },
          series: [
            {
              type: 'pie',
              radius: ['50%', '73%'],
              avoidLabelOverlap: false,
              center: ['40%', '45%'],
              label: {
                normal: {
                  show: false,
                },
                emphasis: {
                  show: true,
                  formatter: '{c}'

                }
              },
              data: [
                {value: 460, name: 'xxx'},
                {value: 154, name: 'ccc'},
                {value: 148, name: 'vvv'},
                {value: 80, name: 'bbb'}
              ],
              color: seriesColor
            }
          ]
        },
        //七天内清理记录
        recordList: [
          {
            lable: '星期一',
            color: '#67e0e3',
            percentage: 9990*0.01,
            num: 9990
          },
          {
            lable: '星期二',
            color: '#67e0e3',
            percentage: 9600*0.01,
            num: 9600
          },
          {
            lable: '星期三',
            color: '#67e0e3',
            percentage: 2640*0.01,
            num: 2640
          },
          {
            lable: '星期四',
            color: '#67e0e3',
            percentage: 3100*0.01,
            num: 3100
          },
          {
            lable: '星期五',
            color: '#67e0e3',
            percentage: 2400*0.01,
            num: 2400
          },
          {
            lable: '星期六',
            color: '#67e0e3',
            percentage: 8220*0.01,
            num: 8220
          },
          {
            lable: '星期日',
            color: '#67e0e3',
            percentage: 3240*0.01,
            num: 3240
          }
        ],
        // 3个饼状图
        pieOption: {
          legend: {
            align: 'left',
            itemWidth: 20,
            itemHeight: 20,
            orient: 'vertical',
            x: 'right',
            textStyle: {//图例文字的样式
              color: '#7287bc',
            },
            data: [
              {
                name: '0~1小时',
                icon: 'circle',
              }, {
                name: '1~2小时',
                icon: 'circle',
              }, {
                name: '2~3小时',
                icon: 'circle',
              }, {
                name: '3小时以上',
                icon: 'circle',
              }],
            itemStyle: {
              borderRadius: 50
            }
          },
          series: [
            {
              type: 'pie',
              radius: ['50%', '75%'],
              avoidLabelOverlap: false,
              center: ['40%', '55%'],
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  },
                  formatter: function (e) {
                    return e.data.value
                  }
                }


              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 335, name: '0~1小时',},
                {value: 154, name: '1~2小时',},
                {value: 148, name: '2~3小时',},
                {value: 118, name: '3小时以上',}
              ],
              itemStyle: {
                emphasis: {
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                  shadowBlur: 10
                }
              },
              color: ['#54bdee', '#92d32c', '#f37c13', '#c51010']
            }
          ]
        },

      };
    },
    mounted() {
      let percentage = Math.max.apply(Math, this.recordList.map(function (o) {
        return o.percentage
      }))
      console.log(percentage);
      this.recordList.map((item)=>{
            if(item.percentage===percentage){
                item.color= '#f37c13'
            }
            return item
        })
      let todayView = this.$echarts.init(this.$refs.todayView);
      todayView.setOption(this.todayViewOption);

      let mainChart = this.$echarts.init(this.$refs.mainChart);
      mainChart.setOption(this.mainChartOption);

      let todayClear = this.$echarts.init(this.$refs.todayClear);
      todayClear.setOption(this.todayClearOption);

      let pie1 = this.$echarts.init(this.$refs.pie1);
      pie1.setOption(this.pieOption);

      let pie2 = this.$echarts.init(this.$refs.pie2);
      this.pieOption.legend.data = [{
        name: '0~100次',
        icon: 'circle',
      }, {
        name: '100~200次',
        icon: 'circle',
      }, {
        name: '200次以上',
        icon: 'circle',
      },]
      this.pieOption.series[0].data = [
        {value: 335, name: '0~100次',},
        {value: 154, name: '100~200次',},
        {value: 148, name: '200次以上',},]
      pie2.setOption(this.pieOption);


      this.pieOption.legend.data = [{
        name: '0~10km',
        icon: 'circle',
      }, {
        name: '10~20km',
        icon: 'circle',
      }, {
        name: '20~30km',
        icon: 'circle',
      }, {
        name: '30km以上',
        icon: 'circle',
      },]
      this.pieOption.series[0].data = [
        {value: 335, name: '0~10km',},
        {value: 154, name: '10~20km',},
        {value: 148, name: '20~30km',},
        {value: 148, name: '30km以上',},
      ]
      let pie3 = this.$echarts.init(this.$refs.pie3);
      pie3.setOption(this.pieOption);


      window.onresize = () => {//  根据窗口大小调整曲线大小
        todayView.resize();
        mainChart.resize();
        todayClear.resize();
        pie1.resize();
        pie2.resize();
        pie3.resize();
      }

    },
    methods: {},
    created() {

    }
  };
</script>
<style>
  .el-progress-bar__innerText {
    display: none !important;
  }
</style>
<style scoped>
  .el-card {
    margin-bottom: 20px;
    border: none;
    background: none;
  }

  .tool-warp {
    position: absolute;
    width: 250px;
    height: 66px;
    left: 50%;
    transform: translateX(-50%);
    top: -10px;
  }

  .tool-left-item {
    float: left;
  }

  .tool-right-item {
    float: right;
  }

  .tool-right-item, .tool-left-item {
    box-sizing: border-box;
    padding-top: 5px;
    width: 120px;
    height: 66px;
    background-image: linear-gradient(90deg,
    #3f28d0 0%,
    #2155d7 50%,
    #0282de 100%);
    border-radius: 10px;
  }

  .tool-item-title {
    font-size: 14px;
    color: #ffffff;
    text-align: center;
  }

  .tool-item-num {
    text-align: center;

    font-size: 30px;
    color: #ffffff;
  }

  .tool-item-num span {
    font-size: 16px;
    color: #ffffff;
  }

  #todayClear, #mainChart {
    position: relative;
  }

  .item-header {
    font-size: 22px;
    color: #7ffafe;
    height: 60px;
    line-height: 60px;
    padding: 0 15px;
  }

  .today-clear-warp {
    position: relative;
  }

  .today-clear-tool {
    position: absolute;
    top: -45px;
    right: 20px;
    width: 110px;
    height: 100px;
  }

  .today-clear-tool-item {
    box-sizing: border-box;
    width: 100px;
    height: 33px;
    line-height: 33px;
    border-radius: 5px;
    border: solid 1px #4f5a98;
    padding: 0 5px;
    margin-bottom: 8px;
    position: relative;
  }

  .dot {
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    height: 15px;
    width: 15px;
    background: red;
    border-radius: 50%;
  }

  .num {
    float: left;
    display: inline-block;
    font-size: 16px;
    color: #7ffafe;
  }

  .line {
    float: left;
    display: inline-block;
    height: 30px;
    width: 1px;
    background: #4f5a98;
    margin: 0 5px;
  }

  .name {
    display: inline-block;
    float: left;

    font-size: 16px;
    color: #ffffff;
  }

  .record-item {
    display: flex;
    padding: 0 20px;
    font-size: 16px;
    color: #87a0dc;
    margin-bottom: 18.5px;
  }

  .record-item-lable {
    width: 60px;
  }

  .record-item-progress {
    flex: 1;
    margin: 0 10px;
  }

  .record-item-num {

  }

  #pie1, #pie2 {
    border-right: 1px solid #4f5a98;
  }

  .bg {
    background: rgba(36, 38, 67, 0.51);
  }
</style>
