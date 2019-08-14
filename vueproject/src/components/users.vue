<template>
  <div class="bigbox">
    <el-card>
      <breadNav :levelOne="levelOne" :levelTwo="levelTwo"></breadNav>
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input
              placeholder="请输入内容"
              @clear="serClear"
              @keyup.native="serChange"
              @keyup.enter.native="search"
              v-model="query"
              clearable
            >
              <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <el-button class="addBtn" type="success" @click="addUser" plain>添加用户</el-button>
          </div>
        </el-col>
      </el-row>
      <router-link to="/test">去测试页面</router-link>
      <template>
        <el-table :data="userList" border highlight-current-row>
          <el-table-column align="center" type="index"></el-table-column>
          <el-table-column align="center" prop="username" label="姓名"></el-table-column>
          <el-table-column align="center" prop="email" label="邮箱" width="380"></el-table-column>
          <el-table-column align="center" prop="mobile" label="电话" width="380"></el-table-column>
          <el-table-column align="center" prop="status" label="用户状态">
            <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="statusChange(scope.row.id,scope.row.mg_state)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              {{scope.row.id}}
              <el-button
                type="primary"
                @click="fnUpdate(scope.row.id)"
                icon="el-icon-edit"
                plain
                size="mini"
              ></el-button>
              <el-button
                @click="fnRole(scope.row.id)"
                type="success"
                icon="el-icon-check"
                plain
                size="mini"
              ></el-button>
              <el-button
                type="danger"
                @click="fnDelete(scope.row.id)"
                icon="el-icon-delete"
                plain
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[4, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        v-if="total != 0"
      ></el-pagination>
      <!-- 新增用户dialog -->
      <el-dialog title="新增用户" :visible.sync="userAddFormVisible">
        <el-form :model="userObj" :rules="rules" ref="userObj">
          <el-form-item label="用户名:" prop="username" :label-width="formLabelWidth">
            <el-input v-model="userObj.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password" :label-width="formLabelWidth">
            <el-input v-model="userObj.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱:" prop="email" :label-width="formLabelWidth">
            <el-input v-model="userObj.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话:" prop="mobile" :label-width="formLabelWidth">
            <el-input v-model="userObj.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="userAddFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="fnAddUserConfirm('userObj')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改用户dialog -->
      <el-dialog title="用户修改" :visible.sync="updateAddFormVisible">
        <el-form :model="updateObj" :rules="updateRules" ref="updateObj">
          <el-form-item label="用户名:" prop="username" :label-width="formLabelWidth">
            <el-input v-model="updateObj.username" disabled autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱:" prop="email" :label-width="formLabelWidth">
            <el-input v-model="updateObj.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话:" prop="mobile" :label-width="formLabelWidth">
            <el-input v-model="updateObj.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateAddFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateAddUserConfirm('updateObj')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 用户授权dialog -->
      <el-dialog title="用户授权" :visible.sync="roleFormVisible">
        <el-form :model="roleObj">
          <el-form-item label="当前用户:" :label-width="formLabelWidth">
            <el-input v-model="roleObj.username" disabled autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="选择角色" :label-width="formLabelWidth">
            <el-select v-model="roleObj.rid" placeholder="请选择">
              <el-option label="请选择" :value="-1"></el-option>
              <el-option
                v-for="item in options"
                :key="item.id"
                :value="item.id"
                :label="item.roleName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="roleFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="roleConfirm">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
    

<script>
import breadNav from "../components/layout/breadNav";

export default {
  components: {
    breadNav
  },
  data() {
    return {
      userList: [],
      status: true,
      query: "",
      levelOne: "用户管理",
      levelTwo: "用户列表",
      pagenum: 1,
      pagesize: 4,
      total: 0,
      userObj: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      updateObj: {
        id: "",
        username: "",
        email: "",
        mobile: ""
      },
      roleObj: {
        id: "",
        username: "",
        rid: ""
      },
      options: [],
      userAddFormVisible: false,
      updateAddFormVisible: false,
      roleFormVisible: false,
      formLabelWidth: "80px",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            pattern: /^\w+$/,
            message: "只能由英文、数字、下划线组成",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^\w+$/,
            message: "只能由英文、数字、下划线组成",
            trigger: "blur"
          },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            message: "请正确输入的邮箱格式",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [
          {
            required: true,
            pattern: /^(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "请输入正确的手机号格式",
            trigger: ["blur", "change"]
          }
        ]
      },
      updateRules: {
        email: [
          {
            type: "email",
            message: "请正确输入的邮箱格式",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [
          {
            required: true,
            pattern: /^(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "请输入正确的手机号格式",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    setContextData(key, value) {
      if (typeof value == "string") {
        sessionStorage.setItem(key, value);
      } else {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    },
    getContextData(key) {
      const str = sessionStorage.getItem(key);
      if (typeof str == "string") {
        try {
          return JSON.parse(str);
        } catch (e) {
          return str;
        }
      }
      return;
    },
    getuserList() {
      this.$http({
        url: `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      }).then(res => {
        console.log(res);

        const { meta, data } = res.data;
        if (meta.status === 200) {
          if (data.users.length === 0 && data.pagenum !== 1) {
            this.pagenum--;
            this.getuserList();
            return;
          }

          this.userList = data.users;

          this.total = data.total;
        }
      });
    },
    handleSizeChange(pagesize) {
      this.pagesize = pagesize;

      this.getuserList();
    },
    handleCurrentChange(pagenum) {
      this.pagenum = pagenum;
      this.setContextData("currentPage", this.pagenum);
      this.getuserList();
    },
    search() {
      this.pagenum = 1;
      this.setContextData("query", this.query);
      this.getuserList();
    },
    addUser() {
      this.userAddFormVisible = true;
    },
    fnAddUserConfirm(userObj) {
      this.$refs[userObj].validate(valid => {
        if (valid) {
          this.$http({
            url: "users",
            method: "POST",
            data: this.userObj
          }).then(res => {
            console.log(res);
            if (res.data.meta.status === 201) {
              this.pagenum = Math.ceil(this.total / this.pagesize);
              this.getuserList();
              this.$message.success(res.data.data.username + res.data.meta.msg);
              //将表单中的数据清空不能放到外面，因为这是一个异步的过程，这样会导致还没有发送请求数据就被清除掉
              this.userObj.username = this.userObj.password = this.userObj.email = this.userObj.mobile =
                "";
            }
          });
          this.userAddFormVisible = false;
        } else {
          this.$message.error("请正确填写以上信息");
          return false;
        }
      });
    },
    serChange() {
      console.log(this.query);
      if (this.query == "") {
        this.setContextData("query", "");
        this.pagenum = 1;
        this.setContextData("currentPage", this.pagenum);
        this.getuserList();
      }
    },
    serClear() {
      this.setContextData("query", "");
      this.pagenum = 1;
      this.setContextData("currentPage", this.pagenum);
      this.getuserList();
    },
    fnDelete(id) {
      console.log(id);

      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: `users/${id}`,
            method: "DELETE"
          }).then(res => {
            console.log(res);
            const { meta } = res.data;
            if (meta.status === 200) {
              this.getuserList();
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    fnUpdate(id) {
      this.updateAddFormVisible = true;
      this.$http({
        url: `users/${id}`
      }).then(res => {
        console.log(res);
        let { data, meta } = res.data;
        if (meta.status === 200) {
          this.updateObj.username = data.username;
          this.updateObj.id = data.id;
          this.updateObj.email = data.email;
          this.updateObj.mobile = data.mobile;
        }
      });
    },
    updateAddUserConfirm(updateObj) {
      console.log(1);

      this.$refs[updateObj].validate(valid => {
        if (valid) {
          this.$http({
            url: `users/${this.updateObj.id}`,
            method: "PUT",
            data: {
              email: this.updateObj.email,
              mobile: this.updateObj.mobile
            }
          }).then(res => {
            console.log(res);
            let { data, meta } = res.data;
            if (meta.status === 200) {
              this.getuserList();
              this.updateAddFormVisible = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    roleConfirm() {
      this.$http({
        url:`users/${this.roleObj.id}/role`,
        method:'PUT',
        data:{
          rid:this.roleObj.rid
        }
      }).then(res=>{
        console.log(res);
        const {meta,data} = res.data
        if(meta.status ===200 ){
          this.$message.success(meta.msg)
        }else{
          this.$message.error(meta.msg)
        }
      })

      this.roleFormVisible = false
    },
    fnRole(id) {
      this.roleFormVisible = true;

      this.$http({
        url: "roles"
      }).then(res => {
        console.log(res);
        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.options = data;
          this.$http({
            url: `users/${id}`
          }).then(res => {
            console.log(res);
            const { meta, data } = res.data;
            if (meta.status === 200) {
              this.roleObj.username = data.username;
              this.roleObj.id = data.id;
              this.roleObj.rid = data.rid;
            }
          })
        }
      })
    },
    statusChange(uid,type){
      this.$http({
        url:`users/${uid}/state/${type}`,
        method:'PUT'
      }).then(res=>{
        const {meta} = res.data
        if(meta.status === 200){
          this.$message.success(meta.msg)
        }else{
          this.$message.error(meta.msg)
        }
        
      })
    }
  },
  mounted() {
    window.onbeforeunload = function() {
      sessionStorage.removeItem("query");
      sessionStorage.removeItem("currentPage");
    };
    this.pagenum = this.getContextData("currentPage") || 1;
    this.query = this.getContextData("query") || "";
    this.getuserList();
  },
  beforeUpdate() {
    console.log("beforeUpdate");
    // sessionStorage.removeItem('currentPage')
    // sessionStorage.removeItem('query')
  },
  update() {
    console.log("update");
  },
  destroyed() {
    console.log("destroy");
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  created() {
    console.log("created");
  }
};
</script>

<style scoped>
.el-row {
  margin-top: 20px;
}
.addBtn {
  margin-left: 5px;
}
.el-table {
  margin-top: 20px;
}

.el-pagination {
  margin-top: 20px;
}
</style>
