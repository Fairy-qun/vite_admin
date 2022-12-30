<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="3" :offset="0" v-for="(item, index) in indexNavs" :key="index">
        <el-card shadow="hover" @click="$router.push(item.path)">
          <div>
            <div>
              <component :is="item.icon" :color="item.color" size="small"></component>
            </div>
            <div style="margin-top: 5px">{{ item.title }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
const indexNavs = [
  {
    icon: 'User',
    color: '#2471A3',
    title: '用户',
    path: '/user/list'
  },
  {
    icon: 'ShoppingCart',
    color: '#2874A6',
    title: '商品',
    path: '/goods/list'
  },
  {
    icon: 'Tickets',
    color: '#186A3B',
    title: '订单',
    path: '/order/list'
  },
  {
    icon: 'ChatDotRound',
    color: '#BA4A00',
    title: '评价',
    path: '/comment/list'
  },
  {
    icon: 'Picture',
    color: '#A93226',
    title: '图库',
    path: '/image/list'
  },
  {
    icon: 'BellFilled',
    color: '#5B2C6F',
    title: '公告',
    path: '/notice/list'
  },
  {
    icon: 'Setting',
    color: '#117864',
    title: '配置',
    path: '/setting/base'
  },
  {
    icon: 'Document',
    color: '#B7950B',
    title: '优惠券',
    path: '/coupon/list'
  }
]
</script>

<style lang="scss" scoped>
.el-card {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 120px;
  height: 120px;
  cursor: pointer;
}
</style>
