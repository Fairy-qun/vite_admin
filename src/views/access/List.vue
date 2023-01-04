<template>
  <el-card shadow="never">
    <ListHeader @create="handleOpen" />
    <el-tree :data="list" :props="{ label: 'name', children: 'child' }" node-key="id" :default-expanded-keys="defaultExpandedKeys">
      <template #default="{ node, data }">
        <div class="main">
          <div>
            <el-tag :type="data.menu ? '' : 'info'">{{ data.menu ? '菜单' : '权限' }}</el-tag>
            <el-icon v-if="data.icon">
              <component :is="data.icon"></component>
            </el-icon>
            <span>{{ data.name }}</span>
          </div>
          <div>
            <el-switch v-model="data.status" :active-value="1" :inactive-value="0" @change="handleChange(data)"> </el-switch>
            <el-button type="primary" size="small" text @click.stop="handleupdate(data)">修改</el-button>
            <el-button type="primary" size="small" text @click.stop="handleAdd(data.id)">增加</el-button>
            <el-button type="primary" size="small" text @click.stop="handleDelete(data)">删除</el-button>
          </div>
        </div>
      </template>
    </el-tree>

    <!-- 新增 -->
    <FormDrawer :title="title" ref="FormDrawerRef" @submit="handleCreate" @cancel="handleCancel">
      <el-form :model="createForm" ref="formRef" label-width="80px">
        <el-form-item label="上级菜单" prop="rule_id"> <el-cascader v-model="createForm.rule_id" :options="options" :props="{ value: 'id', label: 'name', children: 'child', checkStrictly: true, emitPath: false }" placeholder="请选择上级菜单" /> </el-form-item>
        <el-form-item label="菜单/规则" prop="menu">
          <el-radio-group v-model="createForm.menu">
            <el-radio label="1" border>菜单</el-radio>
            <el-radio label="0" border>规则</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="createForm.name" style="width: 30%" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon" v-if="createForm.menu == 1">
          <IconsChoose v-model="createForm.icon" />
        </el-form-item>
        <el-form-item label="前端路由" prop="frontpath" v-if="createForm.menu == 1 && createForm.rule_id > 0">
          <el-input v-model="createForm.frontpath" placeholder="前端路由"></el-input>
        </el-form-item>
        <el-form-item label="后端规则" prop="condition" v-if="createForm.menu == 0">
          <el-input v-model="createForm.condition" placeholder="后端规则"></el-input>
        </el-form-item>
        <el-form-item label="请求方式" prop="method" v-if="createForm.menu == 0">
          <el-select v-model="createForm.method" class="m-2" placeholder="请选择请求方式" size="large">
            <el-option v-for="item in ['GET', 'POST', 'PUT', 'DELETE']" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="createForm.order" :min="0" :max="1000" />
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>

<script setup>
import { getRuleList, createRule, updateRule, deleteRule, updateStatus } from '@/api/rule.js'
import ListHeader from '../../components/ListHeader.vue'
import FormDrawer from '../../components/FormDrawer.vue'
import IconsChoose from '@/components/IconsChoose.vue'
import { Message, Confirm } from '@/utils.js'
import { onMounted, ref, reactive } from 'vue'

const title = ref('')
const list = ref([])
const options = ref([])
const defaultExpandedKeys = ref([])
const getData = () => {
  getRuleList().then(res => {
    console.log(res)
    list.value = res.list
    options.value = res.rules
    defaultExpandedKeys.value = res.list.map(o => o.id)
  })
}
onMounted(() => {
  getData()
})

const FormDrawerRef = ref(null)
const createForm = reactive({
  rule_id: 0,
  menu: 0,
  name: '',
  condition: '',
  method: 'GET',
  status: 1,
  order: 50,
  icon: '',
  frontpath: ''
})

// 新增
const id = ref(0)
const handleOpen = () => {
  title.value = '新增'
  FormDrawerRef.value.open()
}
const addRules = () => {
  createRule(createForm).then(res => {
    Message('新增成功')
    getData()
    FormDrawerRef.value.close()
  })
}
const updateRules = () => {
  updateRule(id.value, createForm).then(res => {
    Message('修改成功')
    getData()
    FormDrawerRef.value.close()
  })
}
const handleCancel = () => {
  FormDrawerRef.value.close()
}

// 修改
const handleupdate = data => {
  title.value = '修改'
  // console.log(data)
  id.value = data.id
  FormDrawerRef.value.open()
}

const handleCreate = () => {
  if (title.value === '新增') {
    // console.log('add')
    addRules()
  }
  if (title.value === '修改') {
    // console.log('update')
    updateRules()
  }
}

// 删除
const handleDelete = data => {
  // console.log('delete')
  Confirm('确认删除该角色?')
    .then(res => {
      deleteRule(data.id).then(res => {
        Message('删除成功')
        getData()
      })
    })
    .catch(() => {
      Message('取消删除', 'info')
    })
}

// 修改状态
const handleChange = data => {
  updateStatus(data.id, !data.status).then(res => {
    Message('修改状态成功')
  })
}

const handleAdd = id => {
  createForm.rule_id = id
  handleOpen()
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
}
:deep(.el-tree-node__content) {
  padding: 20px 0;
}
.el-switch {
  margin-left: 250px;
}
</style>
