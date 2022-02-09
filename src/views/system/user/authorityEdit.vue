<template>
  <el-dialog title="测点授权" :visible.sync="open"  :lines="lines"  width="850px">
    <el-form ref="form" :model="form" :inline="true" size="small">
      <el-form-item label="用户账号" prop="account">
        <el-input v-model="account" :readonly="true" />
      </el-form-item>
    </el-form>
    <el-table :data="monitoringPoints" @selection-change="handleSelectionChange">
      <el-table-column prop="id" type="selection" align="center" width="55"></el-table-column>
      <el-table-column prop="monitoringPointNum" label="测点编号" align="center" ></el-table-column>
      <el-table-column label="监测类型" align="center" width="220">
        <template v-slot="scope">{{scope.row.category|categoryFilter}}</template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
  // import {mine as mineWorkspace} from "@/api/workspaceInfo";
  // import { mine as mineMonitoringPoint } from "@/api/monitoringPointInfo";
  import AuthorityEdit from "./authorityEdit";
  import { addMonitoringAuthority} from "@/api/system/user";
  import { CATEGORIES } from "@/utils/bohotec.com";

export default {
  name:'monitoringAuthorityEdit',
  components: { AuthorityEdit},
  props:{
    visible: {type: Boolean},
    account:{required:true},
    lines:  {},
    list: [],
  },
  data(){
    return{
      open: false,
      workspaces: [],
      monitoringPoints:[],
      // filtedMonitoringPoints:[],
      form:{
        // id:undefined,
        account:undefined,
        monitoringPoints: [],
        // lineId: 0,
        // workspaceId: 0,
        // monitoringPointId: undefined,
      },
      // rules: {
      //   lineId: [{required: true, message: "项目名称不能为空", trigger: "blur"}],
      //   workspaceId: [{required: true, message: "工点编号不能为空", trigger: "blur"}],
      //   monitoringPointId: [{required: true, message: "测点编号不能为空", trigger: "blur"}],
      // }
    }
  },
  methods:{
    start() {
      this.form.account = this.account;
      this.open = true;
      this.init();
      // this.form = Object.assign(this.form,{
      //   id:undefined,
      //   account:undefined,
      //   lineId:undefined,
      //   workspaceId:undefined,
      //   monitoringPointId:undefined,
      // })
    },
    init(){
      // mineWorkspace().then(response => {
      //   this.workspaces = response.data.map(i => ({workspaceNum: i.workspaceNum, id: i.id, lineId: i.lineId}));
      //   // return mineMonitoringPoint()
      // // }).then(response =>{
      // //   this.monitoringPoints = response.data.map(i=>({monitoringPointNum: i.monitoringPointNum, id:i.id, category:i.category}));
      // })
    },
    lineSelected(){
      // mineWorkspace(this.form.lineId).then(response => {
      //   this.workspaces = response.data;
      //   if (this.workspaces && (0 < this.workspaces.length)) {
      //     this.form.workspaceId = this.workspaces[0].id;
      //     this.workspaceSelect();
      //   }else{
      //     this.form.workspaceId = undefined;
      //   }
      // })
    },
    workspaceSelect(){
      this.form.monitoringPointId = undefined;
      // mineMonitoringPoint({workspaceId: this.form.workspaceId}).then(response => {
      //   console.log(response.data);
      //   if (response.data) {
      //     this.monitoringPoints = response.data;
      //   }
      // })
    },

    submitForm(){
      if (this.form.monitoringPoints && this.form.monitoringPoints.length) {
      // this.$refs["form"].validate(valid => {
      //   if (valid) {
            addMonitoringAuthority(this.form).then(response => {
              if (response.code === '200') {
                this.msgSuccess("操作成功");
                this.open = false;
                this.$emit('success');
              } else {
                if (response.code === '0000') {
                  this.$message.error("用户"+this.account+":已经授权测点编号"+this.monitoringPoints.find(i=>i.id === this.form.monitoringPointId).monitoringPointNum);
                }else{
                  this.$message.error(response.message);
                }
              }
            });
      } else {
        this.$message.warning('请选择测点')
      }
      // });
    },

    cancel(){
      this.open = false;
    },
    handleSelectionChange(selection) {
      this.form.monitoringPoints = selection.map(i => ({lineId: i.lineId, workspaceId: i.workspaceId, monitoringPointId: i.id}))
      console.log(this.form.monitoringPoints)
    },
  },
  filters: {
    categoryFilter(v) {
      return CATEGORIES[v]
    }
  }
}
</script>
