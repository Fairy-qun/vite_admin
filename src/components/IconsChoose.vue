<template>
  <div class="container">
    <el-icon v-if="modelValue" style="margin-right: 2px">
      <component :is="modelValue"></component>
    </el-icon>
    <el-select :modelValue="modelValue" class="m-2" placeholder="请选择图标" size="large" @change="handleChange" filterable>
      <el-option v-for="item in options" :key="item" :label="item" :value="item">
        <div class="main">
          <el-icon>
            <component :is="item"></component>
          </el-icon>
          <span>{{ item }}</span>
        </div>
      </el-option>
    </el-select>
  </div>
</template>

<script setup>
import * as IconsList from '@element-plus/icons-vue'
import { ref } from 'vue'
defineProps({
  modelValue: String
})
const options = ref(Object.keys(IconsList))

const emit = defineEmits(['update:modelValue'])
const handleChange = icon => {
  emit('update:modelValue', icon)
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
