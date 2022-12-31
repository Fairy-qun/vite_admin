<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="main">
          <div>订单统计</div>
          <div>
            <el-check-tag style="margin-right: 10px" v-for="(item, index) in options" key="index" :checked="current == item.value" @click="handleChoose(item.value)">{{ item.text }}</el-check-tag>
          </div>
        </div>
      </template>
      <!-- card body -->
      <div id="chart" ref="el"></div>
    </el-card>
  </div>
</template>

<script setup>
import { statistics3 } from '@/api/index.js'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { useResizeObserver } from '@vueuse/core'

const current = ref('week')
const options = [
  {
    text: '近1个月',
    value: 'month'
  },
  {
    text: '近1周',
    value: 'week'
  },
  {
    text: '近24小时',
    value: 'hour'
  }
]

const handleChoose = type => {
  current.value = type
  getData()
}

var myChart = null
onMounted(() => {
  var chartDom = document.getElementById('chart')
  myChart = echarts.init(chartDom)

  getData()
})

onBeforeUnmount(() => {
  if (myChart) echarts.dispose(myChart)
})

function getData() {
  let option = {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  }

  myChart.showLoading()
  statistics3(current.value)
    .then(res => {
      option.xAxis.data = res.x
      option.series[0].data = res.y

      myChart.setOption(option)
    })
    .finally(() => {
      myChart.hideLoading()
    })
}

const el = ref(null)
useResizeObserver(el, entries => myChart.resize())
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-between;
}
.el-tag {
  margin-right: 20px;
  cursor: pointer;
}
#chart {
  width: 100%;
  height: 300px;
}
</style>
