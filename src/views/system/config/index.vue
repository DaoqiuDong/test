<template>
    <div class="list-container">
        <div class="dark">
            <div class="condition">
                <el-form :inline="true">
                    <el-form-item label="参数名称">
                        <el-input v-model="queryParams.configName" size="small" />
                    </el-form-item>
                    <el-form-item label="保函状态">
                        <el-select v-model="queryParams.status" placeholder="保函状态" size="small">
                            <el-option
                                    v-for="i in status"
                                    :key="i.dictValue"
                                    :value="i.dictValue"
                                    :label="i.dictLabel"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                        <el-button
                                type="primary"
                                icon="el-icon-plus"
                                size="mini"
                                @click="handleAdd"
                                v-hasPermi="['system:config:add']"
                        >新增</el-button>
                    </el-form-item>
                       <!-- <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['system:user:add']">-->
                      <!--  <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd" >
                            新增
                        </el-button>-->
                </el-form>
            </div>
            <div class="data-container">
                <el-table v-loading="loading" :data="list" @row-click="selected">
                    <el-table-column label="参数名称" prop="papamKey" align="center" />
<!--                    <el-table-column label="参数值" prop="papamValue" align="center" />-->
                    <el-table-column label="状态" align="center" prop="papamValue" :formatter="statusFormat" />
                    <el-table-column label="操作人" prop="updatedBy" align="center" />
                    <el-table-column label="创建时间" prop="createdAt" align="center" />
                    <el-table-column label="修改时间" prop="updatedAt" align="center" />
                    <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                        <template v-slot="scope">
                        <el-button
                                size="mini"
                                type="text"
                                icon="el-icon-edit"
                                @click="handleUpdate(scope.row)"
                                v-hasPermi="['system:config:edit']"
                        >修改</el-button>
                        <el-button
                                size="mini"
                                type="text"
                                icon="el-icon-delete"
                                @click="handleDelete(scope.row)"
                                v-hasPermi="['system:config:remove']"
                        >删除</el-button>
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
        </div>
        <config-edit  :visible.sync="showConfigDialog"   ref="configEdit" @success="getList"></config-edit>
<!--        <el-dialog :visible.sync="showConfigDialog" title="参数设置">-->
<!--            <config-edit  ref="configEdit" @done="getList"></config-edit>-->
<!--        </el-dialog>-->
    </div>
</template>
<script>
    import {listConfig,delConfig} from "@/api/system/config";
    import {mine} from "@/utils/dict";
    import ConfigEdit from './edit'
    export default {
        name:'config',
        components:{
            ConfigEdit
        },
        data(){
            return {
                loading: false,
                showConfigDialog:false,
                total: 0,
                list: undefined,
                status:[],
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    configName: undefined,
                    status:undefined
                },
            }
        },
        created() {
            this.dictMine();


        },
        methods:{
            dictMine(){
                mine("EG_APPLY_STATUS").then(response=>{
                    this.status =response;
                    return this.getList();
                })
            },
            getList(){
                listConfig(this.queryParams).then(response=>{
                    this.list = response.data.list;
                    this.total = response.data.total;
                    // if (this.list && this.list.length) {
                    //     this.list.forEach(i=>{
                    //         console.log('status========'+this.status);
                    //         if(this.status){
                    //         const x = this.status.find(j => j.dictValue === i.papamValue);
                    //         if(x){
                    //             // console.log('dictLabel======'+x.dictLabel);
                    //             i.papamValue = x.dictLabel;
                    //         }
                    //         }
                    //     })
                    // }
                })

            },
            statusFormat(row, column) {
                return this.selectDictLabel(this.status, row.papamValue);
            },
            handleQuery(){
            this.getList();
            },
            handleUpdate(row){
                // this.showConfigDialog=true;
                this.$refs.configEdit.start(row);
            },
            handleAdd(){
                // this.showConfigDialog=true;

                this.$refs.configEdit.start();
            },
            selected(r) {
                // this.showList = false
                // this.$nextTick(_ => this.$refs.approval.init(r))
            },
            handleDelete(row){
                this.$confirm('确认删除此数据项?', "警告", {
                    confirmButtonText: "删除",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(_ => {
                    delConfig(row).then(response => {
                        if ('200' === response.code) {
                            this.getList();
                            this.msgSuccess("删除成功");
                        } else {
                            this.msgError(response.data)
                        }
                    }).catch(_ => {
                    })
                })
            },

        }
    }
</script>
