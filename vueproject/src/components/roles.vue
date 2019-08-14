<template>
  <el-card>
    <breadNav :levelOne="levelyi" :levelTwo="leveler" />
    <el-button type="primary" plain class="addRole">新增角色</el-button>
    <el-table class="roleTable" :data="roleList" border stripe style="width: 100%">
      <el-table-column align="center" type="index"></el-table-column>
      <el-table-column align="center" prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column align="center" prop="roleDesc" label="角色描述" width="180"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            @click="changeRoles(scope.row.children,scope.row.id)"
            plain
            size="mini"
          ></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="分配权限"  :visible.sync="roledialogVisible" width="30%">
      <el-tree
        ref="roleTree"
        :data="allRoleList"
        show-checkbox
        default-expand-all
        node-key="id"
        check-on-click-node	
        :default-checked-keys="defaultChecked"
        :props="defaultProps"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roledialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="roleComfirm">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import breadNav from "@/components/layout/breadNav";
export default {
  components: {
    breadNav
  },
  data() {
    return {
      levelyi: "权限管理",
      leveler: "角色列表",
      roleId : 0,
      roleList: [],
      allRoleList:[],
      defaultChecked:[],
      roledialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
     
    
  },
  methods: {
    fnGetRoleList() {
      this.$http({
        url: "roles"
      }).then(res => {
        console.log(res);
        const { data } = res.data;
        this.roleList = data;
      });
    },
    changeRoles(selfRole,roleId) {
      this.defaultChecked = []
      this.roleId = roleId
      this.roledialogVisible = true;
      // this.defaultChecked = []
      this.$http({
        url:'rights/tree'
      }).then(res=>{
        
        const {data} = res.data
        this.allRoleList = data

        console.log(selfRole);
        selfRole.forEach(item=>{
          item.children.forEach(item1=>{
            item1.children.forEach(item2=>{
              console.log(item2.id);
             
              this.defaultChecked.push(item2.id)
              console.log(this.defaultChecked);
              
              
            })
          })
        })
        
        
      })
      
    },
    roleComfirm(){
      let halfCheckedState = this.$refs.roleTree.getHalfCheckedKeys()
      let allCheckedState = this.$refs.roleTree.getCheckedKeys()
      let allChecked = [...halfCheckedState,...allCheckedState]
      this.$http({
        url:`roles/${this.roleId}/rights`,
        method:'POST',
        data:{
          rids:allChecked.join(',')
        }
      }).then(res=>{
        console.log(res);
        const {meta} = res.data
        // console.log('权限修改成功 ')
        if(meta.status === 200){
          // this.roleList = []
          
          
          this.$message.success('权限修改成功')
          this.fnGetRoleList()
          
        }
        
      })
      
      this.roledialogVisible = false
    },
    
  },
  mounted() {
    this.fnGetRoleList();
  }
};
</script>

<style scoped>
.addRole,
.roleTable {
  margin-top: 15px;
}
element.style {
  width: 800px;
}
.el-table {
  width: 800px;
}
</style>
