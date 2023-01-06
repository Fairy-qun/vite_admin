<template>
  <div>
    <el-card shadow="never">
      <ListHeader @create="handleCreate" />
      <el-table :data="list">
        <el-table-column label="优惠券名称" width="300">
          <template #default="{ row }">
            <el-tag :type="format(row) === '领取中' ? 'danger' : 'info'" size="large">
              <h5>{{ row.name }}</h5>
              <small>{{ row.start_time }} ~ {{ row.end_time }}</small>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="{ row }">
            {{ format(row) }}
          </template>
        </el-table-column>
        <el-table-column label="优惠">
          <template #default="{ row }"> {{ row.type == 0 ? '满减' : '折扣' }} {{ row.type == 0 ? '￥' + row.value : row.value }} </template>
        </el-table-column>
        <el-table-column label="发放数量" prop="total"></el-table-column>
        <el-table-column label="已使用" prop="used"></el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button type="primary" size="small" v-if="format(row) == '未开始'" text @click="handleUpdate(row)">修改</el-button>
            <el-button type="primary" size="small" v-if="(format(row) == '已结束') | (format(row) == '未开始')" text @click="handleDelete(row)">删除</el-button>
            <el-button type="danger" size="small" v-if="format(row) == '领取中'" @click="handleStatus(row)">失效</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination background layout="prev, pager ,next" :total="total" :current-page="current_page" :page-size="limit" @current-change="handleChange" style="padding: 10px" />

    <!-- 抽屉 -->
    <FormDrawer :title="title" ref="DrwerRef" @cancel="cancel" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" label-width="80px">
        <el-form-item label="优惠券名称" prop="name">
          <el-input v-model="form.name" placeholder="优惠券名称" style="width: 280px"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio :label="0" size="large">满减</el-radio>
            <el-radio :label="1" size="large">折扣</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="面值" prop="value">
          <el-input v-model="form.value" placeholder="面值" style="width: 280px">
            <template #append>{{ form.type ? '折扣' : '元' }}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="发行量" prop="total">
          <el-input-number v-model="form.total" :min="0" :max="1000" />
        </el-form-item>
        <el-form-item label="最低使用价格" prop="min_price">
          <el-input v-model="form.min_price" placeholder="最低使用价格" style="width: 280px"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="form.order" :min="0" :max="1000" />
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker v-model="timeRange" value-format="YYYY-MM-DD HH:mm:ss" type="datetimerange" range-separator="To" start-placeholder="开始时间" end-placeholder="结束时间" />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="form.desc" type="textarea"></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>
</template>

<script setup>
import { getCouponList, createCoupon, updateCoupon, deleteCoupon, disactiveCoupon } from '@/api/coupon.js'
import ListHeader from '../../components/ListHeader.vue'
import FormDrawer from '../../components/FormDrawer.vue'
import { Message, Confirm } from '@/utils.js'
import { ref, reactive, onMounted, computed } from 'vue'

const list = ref([])
const limit = ref(10)
const total = ref(0)
const current_page = ref(1)
// 获取数据
const getData = () => {
  getCouponList(current_page.value).then(res => {
    // console.log(res)
    list.value = res.list
    total.value = res.totalCount
  })
}
onMounted(() => {
  getData()
})
const format = row => {
  // console.log(row)
  let s = '领取中'
  let start_time = new Date(row.start_time).getTime()
  let now = new Date().getTime()
  let end_time = new Date(row.end_time).getTime()
  if (start_time > now) {
    s = '未开始'
  } else if (end_time < now) {
    s = '已结束'
  } else if (row.status == 0) {
    s = '已失效'
  }
  return s
}

// 增加
const form = reactive({
  name: '',
  type: 0,
  value: 20,
  total: 100,
  min_price: 100,
  start_time: null,
  end_time: null,
  order: 50,
  desc: ''
})
const title = ref(null)
const DrwerRef = ref(null)
const handleCreate = () => {
  title.value = '增加'
  DrwerRef.value.open()
}
const cancel = () => {
  DrwerRef.value.close()
}
const handleChange = p => {
  current_page.value = p
  getData()
}

const timeRange = computed({
  get() {
    return form.start_time && form.end_time ? [form.start_time, form.end_time] : []
  },
  set(value) {
    form.start_time = value[0]
    form.end_time = value[1]
  }
})

// 增
const addCoupon = () => {
  createCoupon(form).then(res => {
    Message('增加成功')
    getData()
    DrwerRef.value.close()
  })
}

// 修改
const id = ref(0)
const handleUpdate = row => {
  form.name = row.name
  form.desc = row.desc
  form.min_price = row.min_price
  form.type = row.type
  form.order = row.order
  form.start_time = row.start_time
  form.end_time = row.end_time
  form.value = row.value
  form.total = row.total
  // console.log(row)
  id.value = row.id
  title.value = '修改'
  DrwerRef.value.open()
}

const updateSetCoupon = () => {
  updateCoupon(id.value, form).then(res => {
    Message('修改成功')
    getData()
    DrwerRef.value.close()
  })
}
// 处理程序
const handleSubmit = () => {
  form.start_time = new Date(form.start_time).getTime()
  form.end_time = new Date(form.end_time).getTime()
  if (title.value === '增加') {
    addCoupon()
  }
  if (title.value === '修改') {
    updateSetCoupon()
  }
}

// 删除
const handleDelete = row => {
  id.value = row.id
  Confirm('确认删除?')
    .then(res => {
      deleteCoupon(id.value).then(res => {
        Message('删除成功')
        getData()
      })
    })
    .catch(() => {
      Message('取消删除', 'info')
    })
}

// 失效
const handleStatus = row => {
  disactiveCoupon(row.id).then(res => {
    Message('更改状态成功')
    getData()
  })
}
</script>

<style lang="scss" scoped></style>
