<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="5" :xl="5">
        <div class="run-day">
          <div style="font-size: 22px;color: #bae8ff;margin-left: 10px;margin-top: 15px;">运行天数</div>
          <div class="run-day-item">
            <div class="lable">已运行天数:</div>
            <div class="rect">666</div>
            <div class="day">天</div>
          </div>
          <div class="run-day-item">

            <div class="lable">已运行时间:</div>
            <div class="rect">666</div>
            <div class="day">时</div>
          </div>
        </div>
        <div class="equ-num">
          <div class="equ-num-title"><span style="float: left">正常设备</span> <span style="float: right">异常设备</span></div>
          <div class="num"><span style="float: left;width: 50%;text-align: center;display: block">10</span><span
            class="time">:</span><span style="float: right;text-align: center;display: block;width: 50%">12</span>
          </div>
          <div class="item-warp">
            <div class="item">
              <img src="/static/img/1_fullTrash.png" width="41px" height="41px" alt="">
              <spam>满溢设备：34</spam>
            </div>
            <div class="item">
              <img src="/static/img/2_kngTrash.png" width="41px" height="41px" alt="">
              <span>空余设备：12</span>
            </div>
          </div>
        </div>
        <div class="word-num">
          <div class="title">工作人员</div>
          <div ref="workNum" style="height: 220px;width: 200px;margin: 0px auto 0"></div>
          <div class="item-warp">
            <div class="item">
              <img src="/static/img/4_onlinePersonnel.png" alt="">
              <spam>在线人员：34</spam>
            </div>
            <div class="item">
              <img src="/static/img/5_offlinePersonnel.png" alt="">
              <span>离线人员：12</span>
            </div>
          </div>
        </div>
        <div class="other-num">
          <div ref="othernum1" style="height: 250px;width: 100%"></div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="10" :xl="10">
        <Amap></Amap>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="9" :xl="9">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-card bodyStyle="padding:0px;" class="bg">
              <div class="item-header">
                <span>满空状态一览</span>
              </div>
              <div ref="manView" style="height:290px"></div>
              <div class="item-header">
                <span>满溢统计（2小时）</span>
              </div>
              <div ref="yiman" style="height:300px"></div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-card bodyStyle="padding:0px;" class="bg">
              <div class="item-header">
                <span>设备异常状态一览</span>
              </div>
              <div ref="yichang" style="height:300px"></div>
            </el-card>
            <el-card bodyStyle="padding:0px;" class="bg">
              <div class="item-header">
                <span>成本节省（万元）</span>
              </div>
              <div ref="chengben" style="height:260px"></div>
            </el-card>
          </el-col>
        </el-row>
        <el-card bodyStyle="padding:0px;" class="bg">
          <div class="item-header">
            <span>减少碳排放量（kg）</span>
          </div>
          <div id="tan" ref="tan" style="height:230px"></div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>
<script>
  import echarts from 'echarts'
  import giftImageUrl from '../../static/img/worker.png'
  import Amap from './map'

  export default {
    data() {


      return {
        //成本节省
        chengbenOption: {
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
                color: "#87a0dc", //刻度线标签颜色
              },
              boundaryGap: false,
              axisLine: {
                symbol: ['none', 'none'],
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
                  type: 'solid',
                  color: ['#2a315a', '#2a315a']
                }
              },
              areaStyle: {
                color: '#ccc'
              },
              data: ['第一季度', '第二季度', '第三季度', '第四季度']
            }
          ],
          yAxis: [
            {
              type: 'value',
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
              axisLine: {
                symbol: ['none', 'none'],
                symbolSize: [10, 10],
                symbolOffset: [0, 0],
                lineStyle: {
                  color: '#2a315a'
                }
              },
            }
          ],
          series: [
            {
              type: 'line',
              stack: '总量',
              smooth: true,  //true 为平滑曲线，false为直线
              areaStyle: {
                normal: {
                  //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{

                    offset: 0,
                    color: '#2f263c'
                  }, {
                    offset: 1,
                    color: '#1e213e'
                  }])

                }
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
              data: [12, 13, 7, 13]
            },
          ]
        },
        //减少碳排放量
        tanOption: {
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
          xAxis: {
            type: 'category',
            axisLabel: {
              color: "#87a0dc" //刻度线标签颜色
            },
            boundaryGap: false,
            axisLine: {
              symbol: ['none', 'none'],
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
                type: 'solid',
                color: ['#2a315a', '#2a315a']
              }
            },
            areaStyle: {
              color: '#ccc'
            },
            data: ['第一季度', '第二季度', '第三季度', '第四季度']
          },
          yAxis: {
            type: 'value',
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
            axisLine: {
              symbol: ['none', 'none'],
              symbolSize: [10, 10],
              symbolOffset: [0, 0],
              lineStyle: {
                color: '#2a315a'
              }
            },
          },
          series: [
            {
              data: [8, 12, 7, 9, 12],
              type: 'line',
              symbol: 'none',
              smooth: 0.3,
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#6eecf1'
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
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#4a8fa4'
                  }, {
                    offset: 1,
                    color: '#242b53'
                  }])
                }
              },
            }]
        },
        //满溢统计
        yimanOption: {
          tooltip: {
            trigger: 'axis'
          },

          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              symbol: ['none', 'none'],
              symbolSize: [10, 10],
              symbolOffset: [0, 0],
              lineStyle: {
                color: '#2a315a'
              }
            },
            axisLabel: {
              color: "#87a0dc", //刻度线标签颜色
              interval: 0,
              rotate: 40
            },
            splitLine: {
              show: true,
              lineStyle: {
                // 使用深浅的间隔色
                type: 'solid',
                color: ['#2a315a', '#2a315a']
              }
            },
            data: ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12',]
          },
          yAxis: {
            type: 'value',
            axisLine: {
              symbol: ['none', 'none'],
              symbolSize: [10, 10],
              symbolOffset: [0, 0],
              lineStyle: {
                color: '#2a315a'
              }
            },
            axisLabel: {
              color: "#87a0dc", //刻度线标签颜色
            },
            splitLine: {
              show: true,
              lineStyle: {
                // 使用深浅的间隔色
                type: 'solid',
                color: ['#2a315a', '#2a315a']
              }
            },
          },
          series: [
            {
              name: '溢满设备',
              type: 'line',
              smooth: false,
              itemStyle: {
                normal: {
                  color:"#f85652",
                  lineStyle: {
                    width: 3,
                    color: '#f85652',
                    type: 'solid' //'dotted'虚线 'solid'实线
                  }
                }
              },
              data: [12, 45, 45, 45, 45, 45, 45, 45, 45, 46, 46, 46, 46,]
            },
            {
              name: '未满设备',
              type: 'line',
              smooth: false,
              itemStyle: {
                normal: {
                  color:"#17af7c",
                  lineStyle: {
                    width: 3,
                    color: '#17af7c',
                    type: 'solid' //'dotted'虚线 'solid'实线
                  }
                }
              },
              data: [0, 2, 4, 5, 6, 10, 12, 12, 12, 16, 17, 18, 20,]
            },
            {
              name: '2小时前溢满',
              type: 'line',
              stack: '',
              smooth: false,
              itemStyle: {
                normal: {
                  color:"#f85652",
                  lineStyle: {
                    width: 3,
                    color: '#f85652',
                    type: 'dotted' //'dotted'虚线 'solid'实线
                  }
                }
              },
              data: [16, 16, 16, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18]
            },
            {
              name: '2小时前未满',
              type: 'line',
              stack: '',
              smooth: false,
              itemStyle: {
                normal: {
                  color:"#17af7c",
                  lineStyle: {
                    width: 3,
                    color: '#17af7c',
                    type: 'dotted' //'dotted'虚线 'solid'实线
                  }
                }
              },
              data: [0, 1, 2, 3, 3, 4, 5, 7, 9, 10, 10, 11, 12]
            },
          ]
        },
        //设备异常状态一览
        yichangOption: {
          grid: [{ //控制显示位置的属性grid
            left: '',
            bottom: '10%',
            top: '10%',
            right: ''
          }],
          yAxis: {
            show: false
          },
          tooltip: {
            trigger: "item",
            axisPointer: {
              type: "shadow",
              crossStyle: {
                color: "#4e9bd6"
              }
            }
          },
          xAxis: {
            data: ['电量', '倾倒', '起火'],
            show: true,
            axisLabel: {
              verticalAlign: 'middle',
              color: '#4488bc',
              fontSize: '20'
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          series: [
            { // 蓝柱下面方块
              name: '',
              type: 'pictorialBar',
              symbol: 'roundRect',
              barWidth: '70%',
              symbolOffset: ['0%', '-33%'],
              itemStyle: {
                normal: {
                  color: '#373e67',
                  label: {
                    show: false,
                    position: 'top',	//在上方显示
                    textStyle: {	    //数值样式
                      color: '#93ace8',
                      fontSize: 16
                    }
                  },
                  labelLine: {
                    show: false
                  },
                  shadowColor: 'rgba(38, 111,148, 0,5)',
                  shadowBlur: 10,
                }
              },
              z: -11,
              symbolRepeat: true,
              symbolSize: ['100%', '10%'],
              data: [100, 100, 100],
              barGap: 50,
              barCategoryGap: 0,
              animationEasing: 'elasticOut',

            },


            { // 蓝柱
              name: '', // blue bar
              type: 'pictorialBar',
              symbol: 'roundRect',
              barWidth: '70%',
              symbolOffset: ['0%', '-33%'],
              itemStyle: {
                normal: {
                  barMaxWidth: '20%',
                  barBorderRadius: 100,
                  label: {
                    show: true,
                    position: 'top',	//在上方显示
                    textStyle: {	    //数值样式
                      color: '#93ace8',
                      fontSize: 16
                    }
                  },
                  color: function (params) {
                    let colorList = [
                      '#00b0ff', '#ffd75d', '#9c0000'
                    ];
                    return colorList[params.dataIndex]
                  },
                }
              },
              symbolRepeat: true,
              symbolSize: ['100%', '10%'],
              // symbolClip: true,
              data: [93, 30, 82],
            },

          ],

        },
        //满空状态一览
        manViewOption: {
          grid: {
            top: 20,    //距离容器上边界40像素
            left: 20,    //距离容器上边界40像素
            right: 20,    //距离容器上边界40像素
            bottom: 50   //距离容器下边界30像素
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b} : {d}%"
          },

          series: [
            {
              type: 'pie',
              clockwise: 'true',
              startAngle: '0',
              radius: '60%',
              center: ['50%', '50%'],
              data: [
                {
                  value: 70,
                  name: '溢满',
                  itemStyle: {
                    normal: {
                      color: '#fa8382',
                    }
                  },
                  label: {
                    normal: {
                      show: true,
                      formatter: '{d}%'
                    }
                  }
                },
                {
                  value: 20,
                  name: '未满',
                  itemStyle: {
                    normal: {
                      color: '#53d3a8',

                    }
                  },
                  label: {
                    normal: {
                      show: true,
                      formatter: '{d}%'
                    }
                  }
                }

              ],
            }
          ]
        },
        //工作人员
        workNumOption: {
          grid: {
            top: 0,    //距离容器上边界40像素
            bottom: 0   //距离容器下边界30像素
          },

          graphic: {
            elements: [{
              type: 'image',
              style: {
                image: giftImageUrl,
                width: 56,
                height: 49
              },
              left: 'center',
              top: 'center'
            }]
          },
          tooltip: {
            show: false,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: 'Line 0',
              type: 'pie',
              clockWise: false, //顺时加载
              hoverAnimation: false, //鼠标移入变大
              center: ['50%', '50%'],
              radius: ['50%', '56%'],
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  },
                }
              },
              data: [{
                value: 10,
                name: '正确',
                itemStyle: {
                  normal: {
                    // borderWidth: 10,
                    // borderColor: '#00eca8'
                    color: '#2881d4'
                  }
                },
              },
                {
                  value: 10,
                  name: '错误',
                  itemStyle: {
                    normal: {
                      // borderWidth: 2,
                      // borderColor: '#00eca8'
                      color: "none"
                    }
                  }
                },

              ]
            },
            //外层圆环
            {
              name: 'Line 2',
              type: 'pie',
              clockWise: false, //顺时加载
              hoverAnimation: false, //鼠标移入变大
              center: ['50%', '50%'],
              radius: ['60%', '60%'],
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  },
                }
              },
              data: [
                {
                  value: 16,
                  name: '通过',
                  itemStyle: {
                    normal: {
                      borderWidth: 7,
                      borderColor: "#4be3ef",
                    }
                  }
                },
                {
                  value: 10,
                  name: '未通过',
                  itemStyle: {
                    normal: {
                      borderWidth: 7,
                      borderColor: '#31365d',
                    }
                  }
                },

              ]
            }
          ],
        },
        //其他
        othernumption: {
          tooltip: {
            trigger: 'item',
            formatter: function (params, ticket, callback) {
              return params.percent + '%';
            }
          },
          grid: {
            bottom: '20%',
            left: '10%'
          },
          textStyle: {
            color: '#fff',
            size: 35,
          },

          title: [
            {
              text: '及时解决',
              left: '23%',
              top: '80%',
              textAlign: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 20
              },
            },
            {
              text: '超时解决',
              left: '74%',
              top: '80%',
              textAlign: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 20
              },
            }],

          yAxis: [{
            show: false
          }],

          series: [
            {
              name: '及时解决',
              type: 'pie',
              labelLine: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#305c90',
                }
              },
              center: ['25.0%', '50%'],
              radius: ['45%', '50%'],

              data: [
                {
                  value: 20,
                  name: '相似度',
                  label: {
                    normal: {
                      formatter: '{d} %',
                      position: 'center',
                      show: true,
                      textStyle: {
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#fff'
                      }
                    }
                  }
                },
                {
                  value: 80,
                  tooltip: {
                    show: false
                  },
                  itemStyle: {
                    normal: {
                      color: '#1f2341'
                    },
                    emphasis: {
                      color: '#1f2341'
                    }
                  },

                  hoverAnimation: false
                },
              ]
            },
            {
              name: '',
              type: 'pie',
              clockwise: false,
              silent: true,
              minAngle: 20, //最小的扇区角度（0 ~ 360）
              center: ['25%', '50%'], //饼图的中心（圆心）坐标
              radius: ['0%', '40%'],
              itemStyle: { //图形样式
                normal: {
                  color: '#1d3965',
                  borderWidth: 1.5,
                  opacity: 0.21,
                }
              },
              label: { //标签的位置
                normal: {
                  show: false,
                }
              },
              data: [{
                value: 1
              }]
            },
            {
              name: '超时解决',
              itemStyle: {
                normal: {
                  color: '#264e60'
                },
              },
              center: [
                '75.0%',
                '50%'
              ],
              radius: [
                '45%',
                '50%'
              ],
              type: 'pie',
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {
                  value: 120,
                  name: '相似度',
                  label: {
                    normal: {
                      formatter: '{d} %',
                      position: 'center',
                      show: true,
                      textStyle: {
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#fff',
                      }
                    }
                  }
                },
                {
                  value: 80,
                  tooltip: {
                    show: false
                  },
                  backgroundColor: '#f60',
                  itemStyle: {
                    normal: {
                      color: '#1f2341'
                    },
                    emphasis: {
                      color: '#1f2341',

                    }
                  },
                  hoverAnimation: false
                }]
            },
            {
              name: '',
              type: 'pie',
              clockwise: false,
              silent: true,
              minAngle: 20, //最小的扇区角度（0 ~ 360）
              center: [
                '75.0%',
                '50%'
              ],
              radius: ['0%', '40%'],
              itemStyle: { //图形样式
                normal: {
                  color: '#247e60',
                  borderWidth: 1.5,
                  opacity: 0.21,
                }
              },
              label: { //标签的位置
                normal: {
                  show: false,
                }
              },
              data: [{
                value: 1
              }]
            },

          ]

        },

      }
    },
    mounted() {
      let manView = this.$echarts.init(this.$refs.manView);
      manView.setOption(this.manViewOption);

      let chengben = this.$echarts.init(this.$refs.chengben);
      chengben.setOption(this.chengbenOption);

      let yiman = this.$echarts.init(this.$refs.yiman);
      yiman.setOption(this.yimanOption);

      let tan = this.$echarts.init(this.$refs.tan);
      tan.setOption(this.tanOption);

      let workNum = this.$echarts.init(this.$refs.workNum);
      workNum.setOption(this.workNumOption);

      let othernum1 = this.$echarts.init(this.$refs.othernum1);
      othernum1.setOption(this.othernumption);

      let yichang = this.$echarts.init(this.$refs.yichang);
      yichang.setOption(this.yichangOption);


      window.onresize = () => {//  根据窗口大小调整曲线大小
        manView.resize();
        chengben.resize();
        yiman.resize();
        tan.resize();
        workNum.resize();
        othernum1.resize();
        yichang.resize();
      }

    },
    methods: {},
    created() {

    },
    components: {
      Amap
    }
  }
</script>
<style scoped>
  .item-header {
    font-size: 22px;
    color: #7ffafe;
    height: 60px;
    line-height: 60px;
    padding: 0 15px;
  }

  .bg {
    background: rgba(36, 38, 67, 0.51) !important;
  }

  .el-card {
    margin-bottom: 20px;
    border: none;
    background: none;
  }

  .run-day {
    overflow: auto;
    position: relative;
    height: 241px;
    background-color: #34395a;
  }

  .equ-num {
    height: 256px;
    background-color: #2a2e4f;
    position: relative;
    overflow: auto;
  }

  .equ-num-title {
    width: 180px;
    margin: 15px auto 0;
    font-size: 18px;
    color: #ffffff;
    overflow: auto;
  }

  .num {
    overflow: auto;
    width: 190px;
    margin: 20px auto 0;
    font-size: 51px;
    color: #dafaff;
    position: relative;
  }

  .time {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .word-num {
    overflow: auto;
    height: 275px;
    background: #1f2341;
    position: relative;
  }

  .title {
    position: absolute;
    left: 10px;
    top: 15px;
    font-size: 22px;
    color: #bae8ff;
  }

  .item-warp {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 180px;
    font-size: 20px;
    color: #ffffff;

  }

  .item-warp .item {
    height: 31px;
    line-height: 31px;
    margin-top: 10px;
  }

  .item-warp img {
    width: 35px;
    height: 31px;
    float: left;
    margin-right: 20px;
  }

  .item-warp span {
    height: 31px;
    float: left;

  }

  .other-num {
    border-top: 1px solid #2a2e4f;
    height: 250px;
    background: #1f2341;
  }

  .tool-warp {
    position: absolute;
    width: 250px;
    height: 66px;
    left: 50%;
    transform: translateX(-50%);
    top: -10px;
  }

  .run-day-item {
    margin: 30px auto 0;
    width: 260px;
    height: 52px;
    line-height: 52px;
  }

  .lable {
    float: left;
    font-size: 18px;
    color: #39fcfb;
  }

  .day {
    float: left;
    font-size: 18px;
    color: #39fcfb;
  }

  .rect {
    float: left;
    width: 113px;
    height: 52px;
    line-height: 52px;
    margin-left: 20px;
    margin-right: 9px;
    color: #39fcfb;
    text-align: center;
    font-size: 34px;
    background: linear-gradient(to left, #39fcfb, #39fcfb) left top no-repeat,
    linear-gradient(to bottom, #39fcfb, #39fcfb) left top no-repeat,
    linear-gradient(to left, #39fcfb, #39fcfb) right top no-repeat,
    linear-gradient(to bottom, #39fcfb, #39fcfb) right top no-repeat,
    linear-gradient(to left, #39fcfb, #39fcfb) left bottom no-repeat,
    linear-gradient(to bottom, #39fcfb, #39fcfb) left bottom no-repeat,
    linear-gradient(to left, #39fcfb, #39fcfb) right bottom no-repeat,
    linear-gradient(to left, #39fcfb, #39fcfb) right bottom no-repeat;
    background-size: 1px 11px, 16px 1px, 1px 11px, 16px 1px;
  }
</style>
