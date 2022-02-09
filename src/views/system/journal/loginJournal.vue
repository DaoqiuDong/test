<template>
    <div class="list-container">
        <div class="dark">
            <div class="condition big-form">
                <el-form :inline="true">
                    <el-form-item label="操作人员">
                        <el-input v-model="queryParams.account"  />
                    </el-form-item>
                    <el-form-item label="操作时间">
                        <el-date-picker
                                v-model="queryParams.batchTime"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"  @click="handleQuery">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="data-container">
                <el-table v-loading="loading" :data="list"
                          :row-style="{height: '65px',fontSize:'16px' ,fontFamily: 'Microsoft YaHei' ,fontWeight:'400' ,color: '#333333'}"
                          :header-cell-style="{height: '65px', fontSize: '16px',fontFamily: 'Microsoft YaHei', fontWeight: '400',color:'#424970'}">
                    <el-table-column label="日志编号" prop="id" align="center"/>
                    <el-table-column label="IP地址" prop="ip" align="center" />

                    <el-table-column label="操作人员" prop="createdBy" align="center"/>
                    <el-table-column label="操作时间" prop="createdAt" align="center"/>
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
    </div>

</template>

<script>
    import {listLoginJournal} from "@/api/journal";
    export default {
        name: "OprJournal",
        data() {
            return {
                loading: true,
                actions: {
                    'APPROVAL_PROJECT': '项目审批',
                    'C_BRANCH_INFO': '创建机构',
                    'C_DICT': '创建数据字典',
                    'C_FEE_SETTING': '创建阶梯计费配置',
                    'C_NOTICE': '创建通知公告',
                    'C_ROLE_CODE': '创建角色',
                    'C_SYS_PARAMS': '创建系统参数',
                    'C_USER_INFO': '创建账号',
                    'R_ROLE_CODE': '删除角色',
                    'EXPORT_INVOICE': '导出发票列表',
                    'EXPORT_PROJECT': '导出项目',
                    'Q_BRANCH_INFO': '查询机构',
                    'Q_DICT': '查询数据字典',
                    'Q_FEE_SETTING': '查询阶梯计费配置',
                    'Q_INVOICE': '查询发票',
                    'Q_NOTICE': '查询通知公告',
                    'Q_PROJECT': '查询项目',
                    'Q_ROLE_CODE': '查询角色',
                    'Q_SYS_PARAMS': '查询系统参数',
                    'Q_USER_INFO': '查询账号列表',
                    'RST_PWD': '重置密码',
                    'R_BRANCH_INFO': '删除机构信息',
                    'R_DICT': '删除数据字典',
                    'R_FEE_SETTING': '删除阶梯计费配置',
                    'R_NOTICE': '删除通知公告',
                    'R_SYS_PARAMS': '删除系统参数',
                    'R_USER_INFO': '删除用户信息',
                    'U_BRANCH_INFO': '修改机构信息',
                    'U_DICT': '修改数据字典',
                    'U_FEE_SETTING': '修改阶梯计费配置',
                    'U_INVOICE': '修改发票信息',
                    'U_NOTICE': '修改通知公告',
                    'U_ROLE_CODE': '修改角色',
                    'U_SYS_PARAMS': '修改系统参数',
                    'U_USER_INFO': '修改用户信息',
                    'Q_RECONCILIATION': '财务对账',
                    'EXPORT_RECONCILIATION': '导出财务对账信息',
                },
                total: 0,
                list: undefined,
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    account: undefined,
                    batchTime: [],
                },
            }

        },
        created() {
            // this.queryParams.batchTime = [ this.truncDate(this.dateAdd(new Date(), -6)), this.truncDate(this.dateAdd(new Date(), 1)) ];
            this.getList();
        },
        methods:{
            getList(){
                this.loading = true
                listLoginJournal(this.queryParams).then(response=>{
                    this.loading = false
                    this.list = response.data.list;
                    this.total = response.data.total;

                })
            },
            handleQuery(){
                this.getList();
            },
        }
    }
</script>

<style lang="scss" scoped>
    .opr-journal {

    }
</style>
