<template>
  <div class="list-container">
    <div class="condition big-form">
      <el-form :inline="true" >
      <el-form-item label="机构名称">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入机构名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="queryParams.status" placeholder="状态" clearable >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          class="filter-item"
          type="primary"
          @click="handleQuery"
        >搜索</el-button>
        <el-button
          class="filter-item"
          type="primary"
          @click="handleAdd"
          v-hasPermi="['system:branch:add']"
        >新增</el-button>
      </el-form-item>
    </el-form>
    </div>

    <div class="data-container">
    <el-table
      v-loading="loading"
      :data="deptList"
      row-key="id"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :row-style="{height: '65px',fontSize:'16px' ,fontFamily: 'Microsoft YaHei' ,fontWeight:'400' ,color: '#333333'}"
      :header-cell-style="{height: '65px', fontSize: '16px',fontFamily: 'Microsoft YaHei', fontWeight: '400',color:'#424970'}"
    >
      <el-table-column prop="name" label="机构名称" width="500" ></el-table-column>
      <!--<el-table-column prop="seqNum" label="序号" align="center" width="50"></el-table-column>-->
      <el-table-column prop="leader" label="负责人" align="center" width="160"></el-table-column>
      <el-table-column prop="phone" label="联系电话" align="center" width="120" ></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center" width="200"></el-table-column>
      <!--<el-table-column prop="status" label="状态" :formatter="statusFormat" align="center" width="60" ></el-table-column>-->
      <el-table-column label="创建时间" align="center" prop="createdAt" width="180">
<!--
        <template v-slot="scope">
          <span>{{ // parseTime(scope.row.createdAt) }}</span>
          <span>{{scope.row.createdAt}}</span>
        </template>
-->
      </el-table-column>
      <!--<el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
      <el-table-column label="操作" align="center" >
        <template v-slot="scope">
        <!--  <el-button
                  v-if ="!scope.row.cfcaUid"
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleCFCARegistry(scope.row)"
                  v-hasPermi="['system:branch:registry']"
          >注册CFCA签章</el-button>-->
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:branch:edit']"
          >修改</el-button>
          <el-button
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['system:branch:add']"
          >新增</el-button>
          <el-button
            v-if="scope.row.parentId != 0"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:branch:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <!-- 添加或修改部门对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="24" v-if="form.parentId !== 0">
            <el-form-item label="上级机构" prop="parentId" >
              <treeselect v-model="form.parentId" :options="deptOptions"  :normalizer="normalizer"  placeholder="选择上级机构"  @select="selectDepart"  />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入机构名称"  maxlenght="32"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="seqNum">
              <el-input-number v-model="form.seqNum" controls-position="right" :min="0" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业证件号" prop="leader">
              <el-input v-model="form.unifiedCreditCode" placeholder="请输入企业证件号" maxlength="64" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人" prop="leader">
              <el-input v-model="form.leader" placeholder="请输入负责人" maxlength="16" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经办人姓名" prop="leader">
              <el-input v-model="form.transactorName" placeholder="请输入经办人姓名" maxlength="8" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经办人身份证" prop="leader">
              <el-input v-model="form.transactorId" placeholder="请输入经办人身份证" maxlength="32" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入联系电话" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业联系手机号" prop="phone">
              <el-input v-model="form.mobileNum" placeholder="请输入企业联系手机号" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="64" />
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
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list, getDept, delDept, addDept, updateDept,treeselect,CFCARegistry } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "Dept",
  components: { Treeselect },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 表格树数据
      deptList: [],
      // 部门树选项
      deptOptions: [],
      // dataList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [{dictValue:'E',dictLabel:'启用'},
        {dictValue:'D',dictLabel:'停用'}],
      // 查询参数
      queryParams: {
        name: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        parentId: [
          { required: true, message: "上级机构不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "机构名称不能为空", trigger: "blur" }
        ],
        seqNum: [
          { required: true, message: "菜单顺序不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
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
  created() {
    this.getList();
    // this.getDicts("sys_normal_disable").then(response => {
    //   this.statusOptions = response.data;
    // });
    // this.statusOptions = {"E": "启用", "D": "停用"}
  },
  methods: {
    /** 查询部门列表 */
    getList() {
      this.loading = true;
      list(this.queryParams).then(response => {
        this.deptList = this.handleTree(response.data);
        // console.log(this.deptList);
        this.loading = false;
      });
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
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {

        // this.dataList=response.data;
        this.deptOptions = this.handleTree(response.data);
      });
    },
    // 字典状态字典翻译
    statusFormat(row, column) {
      // return this.selectDictLabel(this.statusOptions, row.status);
      return "E" === row.status ? "正常" : "停用";
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        parentId: undefined,
        name: undefined,
        seqNum: undefined,
        leader: undefined,
        phone: undefined,
        email: undefined,
        unifiedCreditCode:undefined,
        transactorName:undefined,
        transactorId:undefined,
        mobileNum:undefined,
        status: "0",
        ancestors:undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      this.getTreeselect();
      this.selectDepart(row);
      if (row != undefined) {
        this.form.parentId = row.id;
      }
      this.open = true;
      this.title = "添加机构";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
     // getDept(row.id).then(response => {
      this.form = Object.assign(this.form, row);
      this.open = true;
      this.title = "修改机构";
     // });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateDept(this.form).then(response => {
              if (response.code === '200') {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.message);
              }
            });
          } else {
            addDept(this.form).then(response => {
              if (response.code === '200') {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.message);
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      // console.log(this.dataList);

      this.$confirm('确认删除"' + row.name + '"数据项?', "警告", {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDept(row.id);
        }).then(response => {
          if(response.code === '200') {
            this.getList();
            this.msgSuccess("删除成功");
          }  else {
            if(response.code === '0001'){
              this.msgError("有下级机构，不允许删除!");
            }else{
            this.msgError(response.message);
            }
          }
        }).catch(function() {

      });
    },
    handleCFCARegistry(row){
      if(!row.unifiedCreditCode||!row.transactorName||!row.transactorId||!row.mobileNum){
        this.$message({
          type: 'error',
          message:'请先完善企业证件号，经办人姓名，经办人身份证，企业联系手机号信息再进行CFCA签章注册！'
        })
      }else{
        CFCARegistry(row).then(response=> {
          if (response.code === '200') {
            this.msgSuccess("已完成CFCA签章注册操作，后台审核中。");
          }else{
            if (response.code === '500') {
              this.msgError("后台操作出来请与管理员联系，重新申请！")
            }
          }
        })
      }
    },
    /**选中部门赋值*/
    selectDepart(val){
      // console.log('department============');
      // console.log(val);
      this.form.ancestors = val.ancestors + ','+ val.id;
    }
  }
};
</script>

<style scoped>
    .list-container .el-table {
        margin: .5rem 0 3rem;
    }
</style>
