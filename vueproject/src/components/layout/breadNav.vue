<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{levelOne}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{levelTwo}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  props:['levelOne','levelTwo']
};
</script>

<style>
</style>
