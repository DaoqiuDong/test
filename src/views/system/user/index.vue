<template>
  <div>
  <div class="list-container">
    <div class="dark list" v-if ="!isAuthority">
    <el-row :gutter="20">
      <!--部门数据-->
      <el-col :span="4" :xs="24" style="height: 100%; min-height: calc(100vh - 140px); margin-top: .5rem;background-color: #ffffff">
        <div class="org-title"></div>
        <div class="head-container">
          <el-tree
            :data="deptOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <!--用户数据-->
      <el-col :span="20" :xs="24">
        <div class="condition big-form">
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="80px">
          <el-form-item label="用户账号" prop="accoung">
            <el-input
              v-model="queryParams.account"
              placeholder="请输入用户账号"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="mobileNum">
            <el-input
              v-model="queryParams.mobileNum"
              placeholder="请输入手机号码"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="queryParams.status"
              placeholder="账户状态"
              clearable
            >
              <el-option
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="dateRange"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="handleQuery">搜索</el-button>
           <!-- <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
            <el-button
              type="primary"
b              @click="handleAdd"
              v-hasPermi="['system:user:add']"
            >新增</el-button>
          </el-form-item>
        </el-form>
        </div>
<!--        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
              v-hasPermi="['system:user:add']"
            >新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="success"
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
              v-hasPermi="['system:user:edit']"
            >修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
              v-hasPermi="['system:user:remove']"
            >删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="info"
              icon="el-icon-upload2"
              size="mini"
              @click="handleImport"
              v-hasPermi="['system:user:import']"
            >导入</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="warning"
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
              v-hasPermi="['system:user:export']"
            >导出</el-button>
          </el-col>
        </el-row>-->
        <div class="data-container">
        <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange"
                  :row-style="{height: '65px',fontSize:'16px' ,fontFamily: 'Microsoft YaHei' ,fontWeight:'400' ,color: '#333333'}"
                  :header-cell-style="{height: '65px', fontSize: '16px',fontFamily: 'Microsoft YaHei', fontWeight: '400',color:'#424970'}">
          <!--<el-table-column type="selection" width="40" align="center" />-->
          <el-table-column label="用户ID" align="center" prop="id" width="80"/>
          <el-table-column label="用户账号" align="center" prop="account" :show-overflow-tooltip="true" width="160" />
          <el-table-column label="用户昵称" align="center" prop="nickName" :show-overflow-tooltip="true" width="160"/>
          <el-table-column label="机构" align="center" prop="branchName" :show-overflow-tooltip="true" width="300"/>
          <el-table-column label="手机号码" align="center" prop="mobileNum" width="200" />
          <el-table-column label="状态" align="center" width="72">
            <template v-slot="scope">
              <el-switch
                v-model="scope.row.status"
                active-value="E"
                inactive-value="D"
                @change="handleStatusChange(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" prop="createdAt" width="200">
            <template v-slot="scope">
              <span>{{ parseTime(scope.row.createdAt) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="220"
            class-name="small-padding fixed-width"
          >
            <template v-slot="scope">
            <!--纳税人性质，发票类型，交易平台编码，担保费最大/最小金额，手续费最大最小金额<el-button
                size="mini"
                type="text"
                icon="el-icon-plus"
                @click="handleAuthority(scope.row)"
                v-hasPermi="['system:user:edit']"
              >授权</el-button>-->

              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['system:user:edit']"
              >修改</el-button>
              <el-button
                v-if="scope.row.userId !== 1"
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                v-hasPermi="['system:user:remove']"
              >删除</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-key"
                @click="handleResetPwd(scope.row)"
                v-hasPermi="['system:user:resetPwd']"
              >重置</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
        </div>
      </el-col>
    </el-row>

    <!-- 添加或修改参数配置对话框 -->
    </div>
    <el-dialog :title="title" :visible.sync="open" width="50%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户账号" prop="account" >
              <el-input v-model="form.account" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构" prop="branchId">
              <treeselect v-model="form.branchId" :options="deptOptions"  :normalizer="normalizer" placeholder="请选择机构" />
              <!--<el-input v-model="form.branchName" :readonly="true" />-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户昵称" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入用户昵称" maxlength="16" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.id == undefined" label="用户密码" prop="secret">
              <el-input v-model="form.secret" placeholder="请输入用户密码" type="password" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="mobileNum">
              <el-input v-model="form.mobileNum" placeholder="请输入手机号码" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="64" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户性别">
              <el-select v-model="form.sexuality" placeholder="请选择">
                <el-option
                  v-for="dict in sexOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色">
              <el-select v-model="form.roles" multiple  placeholder="请选择">
                <el-option
                  v-for="item in roleOptions"
                  :key="item.roleCode"
                  :label="item.roleName"
                  :value="item.roleCode"
                  :disabled="item.status == 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" maxlength="64"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
  <authority v-if="isAuthority" @exit="changeView" :account="rowAccount"></authority>
  </div>
</template>

<script>
import { listUser, getUser, delUser, addUser, updateUser, exportUser, resetUserPwd, changeUserStatus, importTemplate ,getSelectUserRole } from "@/api/system/user";
import { getToken } from "@/utils/auth";
import { treeselect } from "@/api/system/dept";
import {getAllRole } from "@/api/system/role";
import Treeselect from "@riophae/vue-treeselect";
import Authority from "./authority";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import md5 from 'js-md5'

export default {
  name: "User",
  components: { Treeselect ,Authority},
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // // 部门名称
      deptNames: undefined,
      // // 默认密码
      // initPassword: undefined,
      // 日期范围
      dateRange: [],
      isAuthority:false,
      rowAccount:undefined,
      // 状态数据字典
      statusOptions: [{dictValue:'E',dictLabel:'启用'},
        {dictValue:'D',dictLabel:'停用'},],
      // 性别状态字典
      sexOptions: [{dictValue:'F',dictLabel:'女'},
        {dictValue:'M',dictLabel:'男'},],
      // 岗位选项
      // postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        // label: "name"
        label: "smsSign"
      },
      // 用户导入参数
      upload: {
        // 是否显示弹出层(用户导入)
        open: false,
        // 弹出层标题(用户导入)
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/user/importData"
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        account: undefined,
        mobileNum: undefined,
        status: undefined,
        branchId: undefined
      },
      // 表单校验
      rules: {
        account: [
          { required: true, message: "用户账号不能为空", trigger: "blur" },
            { pattern: /^[a-zA-Z0-9]+$/, message: "账号只能由字母或数字组成", trigger: "blur"}
        ],
        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" }
        ],
        branchId: [
          { required: true, message: "机构不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
        secret: [
          { required: true, message: "用户密码不能为空", trigger: "blur" },
          {pattern: /^[a-zA-Z0-9]{6,10}$/,
           message: '密码格式为：6到10位的字母与数字组合',
            trigger: "blur"
          }
        ],
        email: [
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        mobileNum: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.getTreeselect();
    this.isAuthority = false;
    // this.getDicts("sys_normal_disable").then(response => {
    //   this.statusOptions = response.data;
    // });
    // this.getDicts("sys_user_sex").then(response => {
    //   this.sexOptions = response.data;
    // });
    // this.getConfigKey("sys.user.initPassword").then(response => {
    //   this.initPassword = response.msg;
    // });
  },
  methods: {
    getList() {
      this.loading = true;
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.userList = response.data.list;
          this.total = response.data.total;
          if(this.userList){
              this.userList.forEach(i => {
              if (this.deptNames) {
                const p = this.deptNames.find(x => x.id === i.branchId);
                if (p) {
                  i.branchName = p.name;
                }

            }
            //  i.branchName = p.name;
            });
          }
          this.loading = false;
        }
      );
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {
          console.log(response)
        this.deptOptions = this.handleTree(response.data);
        this.deptNames = response.data;
        this.getList();
      });
    },
    /**查询所有角色*/
    roleList(){
      getAllRole().then(response => {
        // console.log('&&&&&&&&&&&&&&&&&&&&&***');
        // console.log(response);
      this.roleOptions = response.data;
      });
    },
    /**查询选中的角色*/
    getSelectUserRole(account){
      getSelectUserRole(account).then(response =>{
        // this.roleOptions = response.data;
        this.form.roles = response.data;
      });

    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.branchId = data.id;
      this.getList();
    },
    // 用户状态修改
    handleStatusChange(row) {
      let text = row.status === "E" ? "启用" : "停用";
      this.$confirm(`确认要${text}${row.account}用户?`, "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return changeUserStatus(row.id, row.status);
        }).then(() => {
          this.msgSuccess(text + "成功");
        }).catch(function() {
          row.status = row.status === "E" ? "D" : "E";
        });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    /** 转换部门数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children
      };
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        branchId: undefined,
        account: undefined,
        nickName: undefined,
        password: undefined,
        mobileNum: undefined,
        email: undefined,
        sexuality: undefined,
        status: "0",
        remark: undefined,
        // postIds: [],
        roles: []
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.userId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.getTreeselect();
      this.roleList();
      // getUser().then(response => {
        // this.postOptions = response.posts;
        // this.roleOptions = response.roles;
        this.open = true;
        this.title = "添加用户";
        // this.form.password = this.initPassword;
      // });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
      // const userId = row.id || this.ids;
      // getUser(userId).then(response => {
        this.form = Object.assign(this.form, row);
        // const branch = this.deptOptions.find(i => i.id === this.form.branchId)
        // this.form.branchName = branch ? branch.name : ''
        // this.postOptions = response.posts;
        // this.roleOptions = response.roles;
        // this.form.postIds = response.postIds;
        this.roleList();
        this.getSelectUserRole(row.account);
        //this.form.roles = response.roleIds;
        this.open = true;
        this.title = "修改用户";
        this.form.secret = "";
      // });
    },
    handleAuthority(row){
      // console.log(row);
      this.rowAccount = row.account;
      this.isAuthority = true;
      // this.$store.dispatch("tagsView/delView", this.$route);
      // this.$router.push({ path: "/index" });
      // this.$router.push({name: "/monitoringPointAuthority/index", params: {data: row}})

    },
    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.$prompt('请输入"' + row.account + '"的新密码', "提示", {
        inputPattern: /^[a-zA-Z0-9]{6,10}$/,
        inputErrorMessage: '密码格式不对',
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
          // const secret= ${md5(value)}
        const secret = `${md5(value)}`;
          resetUserPwd(row.id, row.branchId,secret).then(response => {
            if (response.code === '200') {
              this.msgSuccess("修改成功，新密码是：" + value);
            } else {
              this.msgError(response.msg);
            }
          });
        }).catch(() => {});
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateUser(this.form).then(response => {
              if (response.code === '200') {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                if (response.code === '0000') {
                  this.msgError("帐号已存在！");
                }else{
                  this.msgError(response.message);
                }
              }
            });
          } else {
             this.form.secret = `${md5(this.form.secret)}`;
                        // this.form.secret = ${md5(secret)}h
            addUser(this.form).then(response => {
              if (response.code === '200') {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                if (response.code === '0000') {
                  this.msgError("帐号已存在！");
                }else{
                  this.msgError(response.message);
                }
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const userIds = row.id || this.ids;
      this.$confirm('确认删除用户' + row.account + '数据项?', "警告", {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delUser(userIds,row.branchId);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    changeView(){
      this.handleQuery();
      this.isAuthority = false;
    },
    // /** 导出按钮操作 */
    // handleExport() {
    //   const queryParams = this.queryParams;
    //   this.$confirm('是否确认导出所有用户数据项?', "警告", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning"
    //     }).then(function() {
    //       return exportUser(queryParams);
    //     }).then(response => {
    //       this.download(response.msg);
    //     }).catch(function() {});
    // },
 /*   /!** 导入按钮操作 *!/
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /!** 下载模板操作 *!/
    importTemplate() {
      importTemplate().then(response => {
        this.download(response.msg);
      });
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },*/
    // 提交上传文件
    // submitFileForm() {
    //   this.$refs.upload.submit();
    // }
  }
};
</script>
<style scoped>
  .dark.list {
    padding: .5rem;
  }
  .head-container{
      margin-top: 1rem;
    /*background: #00afff;*/
  }
/*
  .org-title {
    padding: .5rem 0 1rem .5rem;
    margin-left: -.6rem;
    margin-right: -.6rem;
    font-size: 15px;
    font-weight: bold;
    background-color: #f8f8f9;
  }
*/
</style>
