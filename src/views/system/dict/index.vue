<template>
  <div class="list-container">
    <div class="dark" v-if="showList">
      <div class="condition big-form">
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="5rem">
          <el-form-item label="字典名称" prop="dictName">
            <el-input
              v-model="queryParams.dictName"
              placeholder="请输入字典名称"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="字典类型" prop="dictType">
            <el-input
              v-model="queryParams.dictType"
              placeholder="请输入字典类型"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="queryParams.status"
              placeholder="字典状态"
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
          <el-form-item style="margin-left: 1rem;">
            <el-button type="primary" @click="handleQuery">搜索</el-button>
            <el-button
                    type="primary"
                    @click="handleAdd"
                    v-hasPermi="['system:dict:add']"
            >新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="data-container">
      <el-table v-loading="loading" :data="typeList"
                :row-style="{height: '65px',fontSize:'16px' ,fontFamily: 'Microsoft YaHei' ,fontWeight:'400' ,color: '#333333'}"
                :header-cell-style="{height: '65px', fontSize: '16px',fontFamily: 'Microsoft YaHei', fontWeight: '400',color:'#424970'}">
      <!--<el-table-column type="selection" width="55" align="center" />-->
      <el-table-column label="字典编号" align="center" prop="id" />
      <el-table-column label="字典名称" align="center" prop="dictName" :show-overflow-tooltip="true" />
      <el-table-column label="字典类型" align="center" :show-overflow-tooltip="true">
        <template v-slot="scope">
          <el-button
                  type="text"
                  @click="handleDetail(scope.row)"
                  v-hasPermi="['system:dict:edit']"
          >{{ scope.row.dictType }}</el-button>
          <!--<router-link :to="{path:'/dev-api/api/dict/detail/'+scope.row.dictType, append:'true'}" class="link-type" >
            <span>{{ scope.row.dictType }}</span>
          </router-link>-->
        </template>
      </el-table-column>
      <!--<el-table-column label="状态" align="center" prop="status" :formatter="statusFormat" />-->
      <el-table-column label="状态" align="center" prop="status">
        <template v-slot="scope">
          <span v-if="scope.row.status ==='D'">停用</span>
          <span v-if="scope.row.status ==='E'">启用</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
      <el-table-column label="创建时间" align="center" prop="createdAt" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template v-slot="scope">
          <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-s-operation"
                  @click="handleDetail(scope.row)"
                  v-hasPermi="['system:dict:detail']"
          >列表</el-button>
          <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row)"
                  v-hasPermi="['system:dict:edit']"
          >修改</el-button>
          <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
                  v-hasPermi="['system:dict:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

      <pagination
              v-show="total>0"
              :total="total"
              :page.sync="queryParams.pageNum"
              :limit.sync="queryParams.pageSize"
              @pagination="getList" />
    </div>
  </div>
    <div class="dark" v-if="!showList">
      <dict-data ref="DictData" @exit="afterDictData"></dict-data>
    </div>
    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="字典名称" prop="dictName">
          <el-input v-model="form.dictName" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item label="字典类型" prop="dictType">
          <el-input v-model="form.dictType" placeholder="请输入字典类型" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listType, getType, delType, addType, updateType, exportType } from "@/api/system/dict/type";
import DictData from "./data"
export default {
  components: {DictData},
  name: "Dict",
  data() {
    return {
      // 遮罩层
      showList:true,
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 字典表格数据
      typeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [{dictValue:'E',dictLabel:'启用'},
    {dictValue:'D',dictLabel:'停用'}],
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dictName: undefined,
        dictType: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        dictName: [
          { required: true, message: "字典名称不能为空", trigger: "blur" }
        ],
        dictType: [
          { required: true, message: "字典类型不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
 /*   this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });*/
  },
  methods: {
    /** 查询字典类型列表 */
    getList() {
      this.loading = true;
      listType(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.typeList = response.data.list;
          this.total = response.data.total;
          this.loading = false;
        }
      );
      // this.loading = false;
    },
    // 字典状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      // this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        dictName: undefined,
        dictType: undefined,
        status: "D",
        remark: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加字典类型";
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.dictId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      // this.form = row;
      this.reset();
      this.form = Object.assign(this.form, row)
      this.open = true;
      this.title = "修改字典类型"

      // const dictId = row.dictId || this.ids
      // getType(dictId).then(response => {
      //   this.form = response.data;
      //   this.open = true;
      //   this.title = "修改字典类型";
      // });
    },
    /** 提交按钮 */
    submitForm() {
      console.log('test-----------------------')
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateType(this.form).then(response => {
              if (response.code === '200') {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addType(this.form).then(response => {
              if (response.code === '200') {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    handleDetail(data){
      this.showList = false
      this.$nextTick(_ => this.$refs.DictData.getType(data))
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const dictIds = row.id || this.ids;
      this.$confirm('确认删除此数据项?', "警告", {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delType(row);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有类型数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportType(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
    afterDictData() {
      this.getList()
      this.showList = true
    },
  }

};
</script>
