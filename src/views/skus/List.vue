<template>
  <el-card shadow="never">
    <el-button type="primary" size="small" @click="handleOpen">新增</el-button>
    <el-button type="danger" size="small" @click="handleDeleteAll">批量删除</el-button>

    <!-- 表格 -->
    <el-table :data="list" border stripe style="margin-top: 10px" @selection-change="handleChenck">
      <el-table-column type="selection" width="55" />
      <el-table-column label="规格名称" prop="name"></el-table-column>
      <el-table-column label="规格值" prop="default"></el-table-column>
      <el-table-column label="排序" prop="order"></el-table-column>
      <el-table-column label="状态">
        <template #default="{ row }">
          <el-switch v-model="row.status" :active-value="1" :inactive-value="0" @change="updateStatus(row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" size="small" text @click="handleUpdate(row)">修改</el-button>
          <el-button type="primary" size="small" text @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <!-- 分页 -->
  <el-pagination background layout="prev, pager ,next" :total="total" :current-page="current_page" :page-size="limit" @current-change="handleChange" style="padding: 10px" />

  <!-- 抽屉 -->
  <FormDrawer :title="title" ref="DrwerRef" @submit="handleSubmit" @cancel="cancel">
    <el-form :model="form" ref="formRef" label-width="80px">
      <el-form-item label="规格名称">
        <el-input v-model="form.name" placeholder="规格名称"></el-input>
      </el-form-item>
      <el-form-item label="规格值">
        <el-input v-model="form.default" placeholder="规格值"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="0"> </el-switch>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="form.order" :min="0" :max="10000" />
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<script setup>
import { getSkusList, createSkus, updateSkus, updateSkusStatus, deleteSkus_all } from '@/api/skus.js'
import FormDrawer from '../../components/FormDrawer.vue'
import { Message, Confirm } from '@/utils.js'
import { onMounted, ref, reactive } from 'vue'

const list = ref([])
const total = ref(0)
const current_page = ref(1)
const limit = ref(10)
const title = ref(null)
// 获取数据
const getData = () => {
  getSkusList(current_page.value).then(res => {
    console.log(res)
    list.value = res.list
    total.value = res.totalCount
  })
}

onMounted(() => {
  getData()
})
// 分页
const handleChange = p => {
  current_page.value = p
  getData()
}

// 增加
const form = reactive({
  name: '',
  default: '',
  status: 1,
  order: 50
})
const DrwerRef = ref(null)
const handleOpen = () => {
  title.value = '增加'
  DrwerRef.value.open()
}
const addSkus = () => {
  createSkus(form)
    .then(res => {
      Message('增加成功')
      getData()
    })
    .finally(() => {
      DrwerRef.value.close()
    })
}

// 修改
const skusid = ref(0)
const handleUpdate = row => {
  title.value = '修改'
  DrwerRef.value.open()
  skusid.value = row.id
  form.name = row.name
  form.default = row.default
  form.status = row.status
  form.order = row.order
}
const updateData = () => {
  updateSkus(skusid.value, form)
    .then(res => {
      Message('修改成功')
      getData()
    })
    .finally(() => {
      DrwerRef.value.close()
    })
}
// 处理程序
const handleSubmit = () => {
  if (title.value === '增加') {
    addSkus()
  }
  if (title.value === '修改') {
    updateData()
  }
}

// 修改状态
const updateStatus = row => {
  // console.log(row.id)
  updateSkusStatus(row.id, row.status).then(res => {
    Message('修改状态成功')
    getData()
  })
}

// 删除
const ids = ref([])
const handleChenck = data => {
  // console.log(data)
  ids.value = data.map(o => o.id)
}

const handleDeleteAll = () => {
  Confirm('确认删除所选规格?')
    .then(res => {
      deleteSkus_all(ids.value).then(res => {
        Message('删除成功')
        getData()
      })
    })
    .catch(() => {
      Message('取消删除', 'info')
    })
}
const handleDelete = row => {
  ids.value.push(row.id)
  handleDeleteAll()
}
const cancel = () => {
  DrwerRef.value.close()
}
</script>

<style lang="scss" scoped></style>
