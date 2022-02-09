<template>
  <div>
  <div class="dark">
    <div class="condition">
      <el-form :inline="true">
<!--        <el-form-item label="所属项目">-->
<!--          <el-select v-model="queryParams.lineId" placeholder="所属项目" clearable size="small" @change="lineSelectd">-->
<!--            <el-option-->
<!--              v-for="i in lines"-->
<!--              :key="i.id"-->
<!--              :value="i.id"-->
<!--              :label="i.lineName"-->
<!--            />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="工点编号">-->
<!--          <el-select v-model="queryParams.workspaceId" placeholder="工点编号" clearable size="small" @change="workspaceSelected">-->
<!--            <el-option-->
<!--              v-for="i in workspacesUnderLine"-->
<!--              :key="i.key"-->
<!--              :value="i.id"-->
<!--              :label="i.workspaceNum"-->
<!--            />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
      </el-form>
    </div>
    <el-form ref="form">
      <el-button type="warning" size="mini" @click="changeView" icon="el-icon-back">返回</el-button>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['system:user:add']">新增
      </el-button>
    </el-form>
    <el-table :data="showList">
      <el-table-column label="所属项目" prop="lineName" align="center"/>
      <el-table-column label="工点编号" prop="workspaceNum" align="center"/>
      <el-table-column label="测点编号" prop="monitoringPointNum" align="center"/>
      <el-table-column label="创建时间" align="center" prop="createdAt"/>
      <el-table-column label="修改人" align="center" prop="updatedBy"/>
      <el-table-column label="修改时间" align="center" prop="updatedAt"/>
      <el-table-column
        label="操作"
        align="center"
        width="180"
        class-name="small-padding fixed-width"
      >
        <template v-slot="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:user:remove']"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
    <authority-edit :lines="lines" ref="addDialog" :visible.sync="open" @success="getList" :account="account" :list="list"></authority-edit>
  </div>
</template>
<script>
  // import {mine as mineLine} from "@/api/lineInfo";
  // import {mine as mineWorkspace} from "@/api/workspaceInfo";
  // import {mine as mineMonitoringPoint} from "@/api/monitoringPointInfo";
  import {getUserAuthority, removeAuthority} from "@/api/system/user";
  import AuthorityEdit from "./authorityEdit";

  export default {
    name: "MonitoringAuthority",
    components: {AuthorityEdit},
    props: {
      account: {required: true}
    },
    data() {
      return {
        open: false,
        list: [],
        showList: [],
        lines: [],
        workspaces: [],
        workspacesUnderLine: [],
        monitoringPoints: [],
        queryParams: {
          lineId: undefined,
          workspaceId: undefined,
        }
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
      //   mineLine().then(response => {
      //     this.lines = response.data.map(i => ({lineName: i.lineName, id: i.id}));
      //     return mineWorkspace()
      //   }).then(response => {
      //     this.workspaces = response.data.map(i => ({workspaceNum: i.workspaceNum, id: i.id, lineId: i.lineId}));
      //     return mineMonitoringPoint()
      //   }).then(response => {
      //     this.monitoringPoints = response.data.map(i => ({
      //       monitoringPointNum: i.monitoringPointNum,
      //       id: i.id,
      //       category: i.category
      //     }));
      //     this.getList();
      //   })
      },
      lineSelectd() {
        console.log('lineSelected')
        this.queryParams.workspaceId = undefined;
        // mineWorkspace(this.queryParams.lineId).then(response => {
        //   this.workspaces = response.data;
        // })
        this.workspacesUnderLine = []
        if (this.queryParams.lineId && this.workspaces) {
          this.workspacesUnderLine = this.workspaces.filter(i => i.lineId === this.queryParams.lineId);
        }
        this.filteList()
      },
      workspaceSelected() {
        this.filteList()
      },
      getList() {
        // console.log('this.account=',this.account);
        getUserAuthority(this.account).then(response => {
          // console.log('response.data=',response);
          if (response.data) {
            this.list = response.data;
            this.list.forEach(i => {
              i.lineName = this.lines.find(l => l.id === i.lineId).lineName;
              i.workspaceNum = this.workspaces.find(w => w.id === i.workspaceId).workspaceNum
              i.monitoringPointNum = this.monitoringPoints.find(m => m.id === i.monitoringPointId).monitoringPointNum
            })
            this.showList = this.list
          }
        });
      },
      filteList() {
        // console.log('filteList', this.list.length)
        let result = this.list
        if (this.list && this.list.length) {
          if (this.queryParams.lineId) {
            result = result.filter(i => i.lineId === this.queryParams.lineId);
            if (this.queryParams.workspaceId) {
              result = result.filter(i => i.workspaceId === this.queryParams.workspaceId);
            }
          }
        }
        this.showList = result
      },
      changeView() {
        this.$emit('exit')
      },
      handleAdd() {
        this.open = true;
        this.$refs.addDialog.start();
      },
      handleDelete(row) {
        this.$confirm('确认删除此数据项?', "警告", {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning"
        }).then(_ => {
          removeAuthority(row).then(response => {
            if ('200' === response.code) {
              this.getList();
              this.msgSuccess("删除成功");
            } else {
              this.msgError('删除失败')
            }
          }).catch(_ => {
          })
        })
      }
    }
  }
</script>
<style scoped>
  .dark >.el-form {
    margin: .5rem 0 .5rem 1rem;
  }
  .dark .el-table {
    margin: .5rem;
  }
</style>
