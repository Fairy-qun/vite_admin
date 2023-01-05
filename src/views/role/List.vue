<template>
  <el-card shadow="never">
    <ListHeader @refresh="getData" @create="handleCreate" />
    <el-table :data="list" border stripe>
      <el-table-column label="角色名称" prop="name"></el-table-column>
      <el-table-column label="角色描述" prop="desc"></el-table-column>
      <el-table-column label="状态">
        <template #default="{ row }">
          <el-switch v-model="row.status" :disabled="row.name == '超级管理员'" :active-value="1" :inactive-value="0" @change="changeSubmit(row)"> </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px">
        <template #default="{ row }">
          <el-button type="primary" size="small" text @click="handleUpdate(row)">修改</el-button>
          <el-button type="primary" size="small" text @click="handleSettingRule(row)">配置权限</el-button>
          <el-button type="primary" size="small" text @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-pagination background layout="prev, pager ,next" :total="total" :current-page="current_page" :page-size="limit" @current-change="handleChange" style="padding: 10px" />

  <!-- 抽屉 -->
  <FormDrawer :title="title" ref="DrawerRef" @submit="handleSubmit">
    <el-form :model="form" ref="formRef" label-width="80px" :inline="false" size="normal">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="desc">
        <el-input v-model="form.desc" placeholder="角色描述"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="0"> </el-switch>
      </el-form-item>
    </el-form>
  </FormDrawer>

  <!-- 分配权限 -->
  <FormDrawer title="分配权限" ref="settingRuleRef" @submit="onSettingRuleSubmit" @cancel="cancel">
    <el-tree-v2 :check-strictly="checkStrictly" @check="setCheck" ref="treeRef" :node-key="id" :default-expanded-keys="defaultExpandedKeys" :data="ruleList" :props="{ label: 'name', children: 'child' }" show-checkbox :height="treeHeight">
      <template #default="{ node, data }">
        <div style="display: flex">
          <el-tag :type="data.menu ? '' : 'info'" size="small">{{ data.menu ? '菜单' : '权限' }}</el-tag>
          <span style="margin-left: 2px">{{ data.name }}</span>
        </div>
      </template>
    </el-tree-v2>
  </FormDrawer>
</template>
<script setup>
import { getRoleList, createRole, updateRole, deleteRole, updateRoleStatus, settingRole } from '@/api/role.js'
import { getRuleList } from '@/api/rule.js'
import ListHeader from '../../components/ListHeader.vue'
import FormDrawer from '../../components/FormDrawer.vue'
import { onMounted, ref, reactive } from 'vue'
import { Message, Confirm } from '@/utils.js'

const list = ref([])
const current_page = ref(1)
const total = ref(0)
const limit = ref(10)
const title = ref(null)

const form = reactive({
  name: '',
  desc: '',
  status: 1
})
// 获取数据
onMounted(() => {
  getData()
})
const getData = () => {
  getRoleList(current_page.value).then(res => {
    // console.log(res)
    list.value = res.list
    total.value = res.totalCount
  })
}

const DrawerRef = ref(null)
// 增
const handleCreate = () => {
  title.value = '增加'
  DrawerRef.value.open()
}
const addRole = () => {
  createRole(form).then(res => {
    Message('增加成功')
    getData()
    DrawerRef.value.close()
  })
}

// 修改
const id = ref(0)
const handleUpdate = row => {
  // console.log(id)
  id.value = row.id
  form.name = row.name
  form.desc = row.desc
  title.value = '修改'
  DrawerRef.value.open()
}

const updateRoles = () => {
  updateRole(id.value, form).then(res => {
    Message('修改成功')
    getData()
    DrawerRef.value.close()
  })
}

// 删除
const handleDelete = row => {
  Confirm('确认删除?')
    .then(res => {
      deleteRole(row.id).then(res => {
        Message('删除成功')
        getData()
      })
    })
    .catch(() => {
      Message('取消删除', 'info')
    })
}

// 修改状态
const changeSubmit = row => {
  updateRoleStatus(row.id, row.status).then(res => {
    Message('修改状态成功')
    getData()
  })
}

// 处理程序
const handleSubmit = () => {
  if (title.value === '增加') {
    addRole()
  }
  if (title.value === '修改') {
    updateRoles()
  }
}

// 分页
const handleChange = p => {
  // console.log(p)
  current_page.value = p
  getData()
}

// 分配权限
const settingRuleRef = ref(null)
const ruleList = ref([])
const treeHeight = ref(0)
const ruleId = ref(0)
const defaultExpandedKeys = ref([])

// 当前角色拥有的权限id
const rolesId = ref(0)
const treeRef = ref(null)
const checkStrictly = ref(false)
const handleSettingRule = row => {
  treeHeight.value = window.innerHeight - 170
  checkStrictly.value = true
  ruleId.value = row.id
  getRuleList().then(res => {
    defaultExpandedKeys.value = res.list.map(o => o.id)
    ruleList.value = res.list
    settingRuleRef.value.open()

    // 当前角色拥有的权限id
    rolesId.value = row.rules.map(o => o.id)
    setTimeout(() => {
      treeRef.value.setCheckedKeys(rolesId.value)
      checkStrictly.value = false
    }, 150)
  })
}
const onSettingRuleSubmit = () => {
  settingRuleRef.value.showLoading()
  settingRole(ruleId.value, rolesId.value)
    .then(res => {
      Message('分配权限成功')
      getData()
      settingRuleRef.value.close()
    })
    .finally(() => {
      settingRuleRef.value.closeLoading()
    })
}

const setCheck = (...e) => {
  // console.log(e)
  const { checkedKeys, halfCheckedKeys } = e[1]
  rolesId.value = [...checkedKeys, ...halfCheckedKeys]
}

const cancel = () => {
  settingRuleRef.value.close()
}
</script>

<style lang="scss" scoped></style>
