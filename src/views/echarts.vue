<template>
  <div class="zl-echarts" style="min-width: auto;">
    <div id="echarts" style="height: 500px;"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import "echarts-gl";
export default {
  name: "echarts",
  data() {
    return {};
  },
  mounted() {
    var option = {
      title: {
        text: "近六个月的访问量"
      },
      xAxis3D: {
        type: "category",
        data: ["1月", "12月", "3月", "4月", "5月", "6月"],
        axisLine: {
          lineStyle: {
            color: "#313695",
            width: 1
          }
        },
        axisLabel: {
          interval: 0,
          rotate: 45,
          textStyle: {
            color: "#313695",
            fontSize: 12
          }
        }
      },
      yAxis3D: {
        type: "category",
        data: [""],

        axisLine: {
          lineStyle: {
            color: "#313695",
            width: 1
          }
        }
      },
      zAxis3D: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#313695",
            width: 1
          }
        }
      },
      grid3D: {
        boxWidth: 200,
        boxDepth: 20,
        axisPointer: {
          show: false
        },
        light: {
          main: {
            intensity: 1.2
          },
          ambient: {
            intensity: 0.3
          }
        },
        viewControl: {
          alpha: 50,
          beta: 0,
          autoRotate: true,
          zoomSensitivity: 0,
          autoRotateAfterStill: 15,
          distance: 250
        }
      },
      series: [
        {
          type: "bar3D",
          name: "1",
          barSize: 15,
          itemStyle: {
            normal: {
              color: function(params) {
                var colorList = [
                  "#313695",
                  "#4575b4",
                  "#74add1",
                  "#abd9e9",
                  "#e0f3f8",
                  "#ffffbf",
                  "#fee090",
                  "#fdae61",
                  "#f46d43",
                  "#d73027",
                  "#a50026"
                ];
                return colorList[params.dataIndex];
              }
            }
          },
          data: [
            [0, 20, 125],
            [1, 0, 200],
            [2, 0, 361],
            [3, 0, 170],
            [4, 0, 784],
            [5, 0, 548]
          ],
          stack: "stack",
          shading: "lambert",
          emphasis: {
            label: {
              show: true
            }
          }
        }
      ]
    };
    var myChart = echarts.init(document.getElementById("echarts"));
    // 绘制图表
    myChart.setOption(option);
    window.onresize = function() {
      myChart.resize();
    };
  }
};
</script>

<style lang="scss">
.zl-echarts {
  height: 100%;
  padding: 25px;
  .el-card__body {
    padding: 0;
  }
}
</style>
