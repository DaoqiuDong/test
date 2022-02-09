<template>
    <div class="list-container">
        <div class="dark">
            <div class="condition big-form">
                <el-form :inline="true">
                    <el-form-item label="公告标题">
                        <el-input v-model="queryParams.title"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"  @click="handleQuery">搜索</el-button>
                        <el-button
                                type="primary"
                                @click="handleAdd"
                                v-hasPermi="['system:notice:add']"
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
                    <el-table-column label="公告标题" prop="title" align="center" width="500"/>
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
                                    v-hasPermi="['system:notice:edit']"
                            >修改</el-button>
                            <el-button
                                    size="mini"
                                    type="text"
                                    icon="el-icon-delete"
                                    @click="handleDelete(scope.row)"
                                    v-hasPermi="['system:notice:remove']"
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
        <notice-edit  :visible.sync="open"   ref="noticeEdit" @success="getList"></notice-edit>
        <!--        <el-dialog :visible.sync="open" title="参数设置">-->
        <!--            <notice-edit  ref="noticeEdit" @done="getList"></notice-edit>-->
        <!--        </el-dialog>-->
    </div>
</template>
<script>
    import {listNotice,delNotice} from "@/api/system/notice";
    import NoticeEdit from './edit'
    export default {
        name:'notice',
        components:{
            NoticeEdit
        },
        data(){
            return {
                loading: false,
                open:false,
                total: 0,
                list: undefined,
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    title: undefined,
                },
            }
        },
        created() {
            this.getList();
        },
        methods:{
            getList(){
                listNotice(this.queryParams).then(response=>{
                    this.list = response.data.list;
                    this.total = response.data.total;
                })
            },
            handleQuery(){
                this.getList();
            },
            handleUpdate(row){
                // this.open=true;
                this.$refs.noticeEdit.start(row);
            },
            handleAdd(){
                // this.open=true;

                this.$refs.noticeEdit.start();
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
                    delNotice(row).then(response => {
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
