<template>
    <div class="xlist-container">
        <div class="xdark">
            <div class="condition big-form">
                <el-form :inline="true">
                    <el-form-item label="机构">
                        <el-select v-model="queryParams.branchId" placeholder="请选择机构名称" >
                            <el-option
                                    v-for="i in branches"
                                    :key="i.id"
                                    :value="i.id"
                                    :label="i.name"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"  @click="handleQuery">搜索</el-button>
                        <el-button
                                type="primary"
                                @click="handleAdd"
                                v-hasPermi="['system:feeSetting:add']"
                        >新增</el-button>
                    </el-form-item>
                    <!-- <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['system:user:add']">-->
                    <!--  <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd" >
                          新增
                      </el-button>-->
                </el-form>
            </div>
            <div class="data-container">
                <el-table v-loading="loading" :data="list" @row-click="selected"
                          :row-style="{height: '65px',fontSize:'16px' ,fontFamily: 'Microsoft YaHei' ,fontWeight:'400' ,color: '#333333'}"
                          :header-cell-style="{height: '65px', fontSize: '16px',fontFamily: 'Microsoft YaHei', fontWeight: '400',color:'#424970'}">
                    <el-table-column label="机构" prop="branchName" align="center" :show-overflow-tooltip="true" width="400" />
                    <el-table-column label="最低收费(元)" prop="minFee" align="center" width="300"/>
                    <el-table-column label="担保费(元)" width="300">
                        <template  v-slot="scope">
                            <span>{{ scope.row.rangeFrom}} - {{ scope.row.rangeTo}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="费率" prop="fee" align="center" width="150"/>
                    <!--<el-table-column label="状态" align="center" prop="papamValue" :formatter="statusFormat" />-->
                    <el-table-column label="操作人" prop="updatedBy" align="center" width="150"/>
                    <!--<el-table-column label="创建时间" prop="createdAt" align="center" />-->
                    <el-table-column label="更新时间" prop="updatedAt" align="center" width="250" />
                    <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                        <template v-slot="scope">
                            <el-button
                                    size="mini"
                                    type="text"
                                    icon="el-icon-edit"
                                    @click="handleUpdate(scope.row)"
                                    v-hasPermi="['system:feeSetting:edit']"
                            >修改</el-button>
                            <el-button
                                    size="mini"
                                    type="text"
                                    icon="el-icon-delete"
                                    @click="handleDelete(scope.row)"
                                    v-hasPermi="['system:feeSetting:remove']"
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
        <feeSetting-edit  :visible.sync="showFeeSettingDialog"   ref="feeSettingEdit" :branches="branches" @success="getList" ></feeSetting-edit>
        <!--        <el-dialog :visible.sync="showFeeSettingDialog" title="参数设置">-->
        <!--            <feeSetting-edit  ref="feeSettingEdit" @done="getList"></feeSetting-edit>-->
        <!--        </el-dialog>-->
    </div>
</template>
<script>
    import {listFeeSetting,delFeeSetting} from "@/api/feeSetting"
    import { list as getBranches } from '@/api/system/dept'
    import FeeSettingEdit from './edit'

    export default {
        name:'feeSetting',
        components:{
            FeeSettingEdit
        },
        data(){
            return {
                loading: false,
                showFeeSettingDialog:false,
                total: 0,
                list: undefined,
                branches: [],
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    branchId: undefined,
                },
            }
        },
        created() {
            getBranches({}).then(res => {
                this.branches = res.data
                this.getList()
            })
        },
        methods:{
            // dictMine(){
            //     mine("EG_APPLY_STATUS").then(response=>{
            //         this.status =response;
            //         return this.getList();
            //     })
            // },
            getList(){
                listFeeSetting(this.queryParams).then(response=>{
                    this.list = response.data.list;
                    this.total = response.data.total;
                    if(this.list){
                        this.list.forEach(i => {
                            i.branchName = this.branches.filter(b => b.id === i.branchId)[0].name
                        })
                    }
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
            // branchesFormat(row, column) {
            //     return this.selectDictLabel(this.branches, row.branchId);
            // },
            handleQuery(){
                this.getList();
            },
            handleUpdate(row){
                // this.showFeeSettingDialog=true;
                this.$refs.feeSettingEdit.start(row);
            },
            handleAdd(){
                // this.showFeeSettingDialog=true;

                this.$refs.feeSettingEdit.start();
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
                    delFeeSetting(row).then(response => {
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
