<template>
  <el-aside>
    <div class="top" v-loading="loading">
      <div class="top-body" v-for="(item, index) in list" :key="index" :active="activeId == item.id">
        <span>{{ item.name }}</span>
        <span>
          <el-button type="primary" size="small" text>
            <el-icon><Edit /></el-icon>
          </el-button>
          <el-button type="primary" size="small" text class="buttom1">
            <el-icon><Close /></el-icon>
          </el-button>
        </span>
      </div>
    </div>
    <div class="buttom">
      <el-pagination background layout="prev, next" :total="total" :current-page="current_page" :page-size="limit" @current-change="getDataList" />
    </div>
  </el-aside>
  <FormDrawer title="新增" ref="FormDrawerRef" @submit="handleSubmit">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
      <el-form-item label="图库名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.order"></el-input>
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<script setup>
import FormDrawer from '@/components/FormDrawer.vue'
import { getImageClassList, addImageClass } from '@/api/image_class.js'
import { ref, reactive } from 'vue'
import { Message } from '@/utils.js'
const list = ref([])
const total = ref(0)
const activeId = ref(0)

// 分页
const limit = ref(10)
const current_page = ref(1)

const loading = ref(false)
const getDataList = (p = null) => {
  if (typeof p == 'number') {
    current_page.value = p
  }
  loading.value = true
  getImageClassList(current_page.value)
    .then(res => {
      list.value = res.list
      total.value = res.totalCount
    })
    .finally(() => {
      loading.value = false
    })
}
getDataList()

const FormDrawerRef = ref(null)
const handleCreate = () => {
  FormDrawerRef.value.open()
}

const form = reactive({
  name: '',
  order: 50
})
const rules = reactive({
  name: [{ required: true, message: '图库名称不能为空', trigger: 'blur' }]
})

const formRef = ref(null)
const handleSubmit = () => {
  formRef.value.validate(valid => {
    if (!valid) return
    FormDrawerRef.value.showLoading()
    addImageClass(form)
      .then(res => {
        // console.log(res)
        Message('新增成功')
        // 关闭抽屉
        FormDrawerRef.value.close()
        // 获取数据
        getDataList()
      })
      .finally(() => {
        FormDrawerRef.value.closeLoading()
      })
  })
}
defineExpose({
  handleCreate
})
</script>

<style lang="scss" scoped>
.el-aside {
  position: relative;
  width: 200px;
  height: 100%;
  border-right: 1px solid #ccc;
  .top {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 50px;
    right: 0;
    overflow-y: auto;
  }
  .buttom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    border-top: 1px solid #ccc;
    width: 100%;
    height: 50px;
  }
}

.top-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.195);
  .active {
    background-color: rgba(255, 255, 255, 0.516);
  }
  .buttom1 {
    margin: 0;
  }
}
.top-body:hover {
  background-color: rgba(62, 50, 195, 0.225);
}
</style>
