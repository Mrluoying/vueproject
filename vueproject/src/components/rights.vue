<template>
  <el-card>
    <breadNav :levelOne="levelOne" :levelTwo="levelTwo" />
    <el-table class="myTable" :data="rightsList"  border style="width: 100%">
      <el-table-column align="center" type="index"></el-table-column>
      <el-table-column align="center" prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column align="center" prop="path" label="路径" width="180"></el-table-column>
      <el-table-column align="center" label="层级">
        <template slot-scope="scope">
          {{scope.row.level ==='0' ? '一级':scope.row.level ==='1'?'二级':'三级'}}  
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import breadNav from "@/components/layout/breadNav.vue";

export default {
  components: {
    breadNav
  },
  data() {
    return {
      levelOne: "权限管理",
      levelTwo: "权限列表",
      rightsList:[]
    };
  },
  methods:{
    getRightList(){
      this.$http({
        url:'rights/list'
      }).then(res=>{
        console.log(res);
        const {data,meta} = res.data
        if(meta.status === 200){
          this.rightsList = data
        }
        
      })
    }
  },
  mounted(){
    this.getRightList()
  }
};
</script>

<style scoped>
.myTable{
  margin-top: 15px;
  width: 800px !important;
}
</style>
