<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="main">
          <div>订单统计</div>
          <div>
            <el-check-tag style="margin-right: 10px" v-for="(item, index) in options" key="index" :checked="activeTag == item.value" @click="handleChoose(item.value)">{{ item.title }}</el-check-tag>
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
const activeTag = ref('week')
const options = [
  {
    title: '近1个月',
    value: 'month'
  },
  {
    title: '近1周',
    value: 'week'
  },
  {
    title: '近24小时',
    value: 'hour'
  }
]
const handleChoose = value => {
  activeTag.value = value
  getDataList()
}

var myChart = null
onMounted(() => {
  const chartDom = document.querySelector('#chart')
  if (chartDom) {
    myChart = echarts.init(chartDom)
    getDataList()
  }
})

// 销毁容器时，总要销毁图表实例，避免出现白屏现象
onBeforeUnmount(() => {
  if (myChart) echarts.dispose()
})

// 获取数据
const getDataList = () => {
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
  statistics3(activeTag.value)
    .then(res => {
      const { x, y } = res
      option.xAxis.data = res.x
      option.series[0].data = res.y
      myChart.setOption(option)
    })
    .finally(() => {
      myChart.hideLoading()
    })
}

const el = ref(null)
useResizeObserver(el, entries => {
  myChart.resize(entries)
})
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
