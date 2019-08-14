<template>
  <el-card>
    <breadNav :levelOne="levelOne" :levelTwo="levelTwo" />
    <div class="seachAdd">
      <el-input class="searchInput" placeholder="请输入内容" @keyup.native="emptySearch" @keyup.native.enter="search" v-model="searchVal">
        <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success">添加商品</el-button>
    </div>

    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column align="center" type="index" width="80"></el-table-column>
      <el-table-column align="center" prop="goods_name" label="商品名称" width="380"></el-table-column>
      <el-table-column align="center" prop="goods_price" label="商品价格" width="180"></el-table-column>
      <el-table-column align="center" prop="goods_weight" label="商品重量" width="180"></el-table-column>
      <el-table-column align="center" prop="goods_number" label="商品数量" width="180"></el-table-column>
      <el-table-column align="center" label="添加时间" width="280">
        <template slot-scope="scoped">
          {{scoped.row.add_time|timeFormData}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <el-button type="primary" icon="el-icon-edit" size="small" plain></el-button>
        <el-button type="danger" icon="el-icon-delete" size="small" plain></el-button>
      </el-table-column>
    </el-table>

    <el-pagination
      class="fenye"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 15, 20, 25]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
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
      levelOne: "商品管理",
      levelTwo: "商品列表",
      searchVal: "",
      goodsList:[],
      pagenum:1,
      pagesize:10,
      total:0

    };
  },
  methods: {
    search() {
      this.pagenum = 1
      this.getGoodsList()
    },
    emptySearch(){
      console.log(1);
      
      if(this.searchVal == ''){
        console.log(2);
        
        this.getGoodsList()
      }
    },
    getGoodsList(){
      this.$http({
        url:`/goods?query=${this.searchVal}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      }).then(res=>{
        console.log(res);
        const {meta,data} = res.data
        if (meta.status === 200) {
          this.goodsList = data.goods
          this.total = data.total

        }
        
      })
    },
    handleSizeChange(val){
      this.pagesize = val
      this.pagenum = 1
      this.getGoodsList()
    },
    handleCurrentChange(val){
      this.pagenum = val
      this.getGoodsList()
    }
  },
  mounted(){
    this.getGoodsList()
  }
};
</script>

<style scoped>
.seachAdd {
  margin-top: 15px;
  margin-bottom: 15px;
}
.searchInput {
  width: 380px;
}
.fenye{
  margin-top: 15px;
}
</style>