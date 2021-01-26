<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
    <template v-for="(item, index) in $route.matched">
      <el-breadcrumb-item v-if="item.meta.title" :key="index">
        {{item.meta.title}}
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb'
}
</script>
