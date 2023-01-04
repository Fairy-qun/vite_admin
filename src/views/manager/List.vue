<template>
  <div>
    <el-card shadow="never">
      <el-row :gutter="20">
        <!-- 新增 -->
        <el-col :span="2" :offset="0">
          <!-- 新增 -->
          <el-button type="primary" size="small" style="margin: 10px" @click="handleCreate">新增</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table :data="tableData" border stripe>
        <el-table-column label="管理员">
          <template #default="{ row }">
            <div class="manager">
              <!-- 头像 -->
              <div>
                <el-avatar :size="60" :src="row.avatar">
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                </el-avatar>
              </div>
              <!-- 名称与id -->
              <div class="manager-item">
                <p>{{ row.username }}</p>
                <p>{{ row.id }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="所属角色">
          <template #default="{ row }">
            <div>
              {{ row.role?.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="{ row }">
            <div>
              <el-switch v-model="row.status" :active-value="1" :inactive-value="0" @change="handleUpdateManagerStatus($event, row)" :disabled="row.super == 1" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <span v-if="scope.row.super == 1">暂无其他操作</span>
            <div v-else>
              <el-button type="primary" size="small" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="warning" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager ,next" :total="total" :current-page="current_page" :page-size="limit" @current-change="handleChange" style="padding: 10px" />
    </el-card>

    <!-- 增加抽屉 -->
    <FormDrawer title="增加" ref="createRef" @submit="handleChangeSubmit">
      <el-form :model="form" ref="formRef" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="用户头像">
          <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-select v-model="form.role_id" placeholder="请选择用户角色" clearable filterable>
            <el-option v-for="item in role" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>
</template>

<script setup>
import FormDrawer from '../../components/FormDrawer.vue'
import { getManagerList, removeManager, updateManager, createManager, updateManagerStatus } from '@/api/manager.js'
import { onMounted, ref, reactive } from 'vue'
import { Message, Confirm } from '@/utils.js'

const current_page = ref(1)
const tableData = ref([])
const total = ref(0)
const limit = ref(10)
const form = reactive({
  username: '',
  password: '',
  role_id: '',
  status: 1,
  avatar: ''
})
const role = ref([])
const getData = (p = null) => {
  if (typeof p == 'number') {
    current_page.value = p
  }
  getManagerList(current_page.value).then(res => {
    console.log(res)
    tableData.value = res.list
    total.value = res.totalCount
    role.value = res.roles
  })
}

onMounted(() => {
  getData()
})
const handleChange = e => {
  // console.log(e)
  current_page.value = e
  getData(current_page)
}

// 删除管理员
const handleDelete = item => {
  Confirm('是否删除管理员?').then(res => {
    removeManager(item.id).then(res => {
      Message('成功删除管理员')
    })
  })
}

// 增加
const createRef = ref(null)
const handleCreate = () => {
  createRef.value.open()
}
const handleChangeSubmit = () => {
  createManager(form).then(res => {
    Message('增加用户角色成功')
    getData()
    createRef.value.close()
  })
}
</script>

<style lang="scss" scoped>
.el-avatar {
  width: 30px;
  height: 30px;
}
.manager {
  display: flex;
  justify-content: center;
  align-items: center;
  .manager-item {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 10px;
  }
}
</style>
