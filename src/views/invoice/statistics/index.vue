<template>
    <div class="list-container">
        <div class="dark">
            <div class="condition big-form">
                <el-form :inline="true">
<!--
                    <el-form-item label="企业名称">
                        <el-input v-model="queryParams.orgName"  />
                    </el-form-item>
-->
                    <el-row>
                    <el-col :span="7">
                            <el-form-item label="出函单位" >
                                <el-select v-model="queryParams.branchId" clearable placeholder="请选择机构名称" clearable>
                                    <el-option
                                            v-for="i in branches"
                                            :key="i.id"
                                            :value="i.id"
                                            :label="i.name"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="开票类型">
                                <el-select v-model="queryParams.invoiceType" placeholder="请选择开票类型" clearable>
                                    <el-option
                                            v-for="i in invoiceTypes"
                                            :key="i.id"
                                            :value="i.id"
                                            :label="i.name"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="开票方式">
                                <el-select v-model="queryParams.invoiceCategory" placeholder="请选择开票方式" clearable>
                                    <el-option
                                            v-for="i in invoiceCategories"
                                            :key="i.id"
                                            :value="i.id"
                                            :label="i.name"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="开票时间">
                                <el-date-picker
                                        v-model="queryParams.batchTime"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item>
                                <el-button type="primary"  @click="handleQuery">搜索</el-button>
                                <el-button type="success"  @click="exportExcel"  v-hasPermi="['invoice:statistics:export']"
                                >导出</el-button>
                                <!--
                                <el-button
                                         type="primary"
                                         icon="el-icon-plus"
                                         size="mini"
                                         @click="handleAdd"
                                         v-hasPermi="['system:dict:add']"
                                 >新增</el-button>-->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['system:user:add']">-->
                    <!--  <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd" >
                          新增
                      </el-button>

                      -->
                </el-form>
            </div>
            <div class="data-container">
                <el-table v-loading="loading" :data="list" stripe :loading="loading" id="table1" height="calc(100vh - 20rem)"
                          :row-style="{height: '65px',fontSize:'16px' ,fontFamily: 'Microsoft YaHei' ,fontWeight:'400' ,color: '#333333'}"
                          :header-cell-style="{fontSize: '16px',fontFamily: 'Microsoft YaHei', fontWeight: '400',color:'#424970'}">
                    <el-table-column label="出函单位" prop="name" align="center" width="400"/>
                    <el-table-column label="电子发票" align="center" >
                        <el-table-column label="未开票" align="center">
                            <el-table-column label="笔数" prop="cetotal" align="center" :formatter="nformat" />
                            <el-table-column label="金额" prop="ceamount" align="center" :formatter="n2format" />
                        </el-table-column>
                        <el-table-column label="已开票" align="center">
                            <el-table-column label="笔数" prop="ceutotal" align="center"  :formatter="nformat" />
                            <el-table-column label="金额" prop="ceuamount" align="center"  :formatter="n2format" />
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="纸质发票" align="center" >
                        <el-table-column label="增值税普通发票" align="center" >
                            <el-table-column label="未开票" align="center">
                                <el-table-column label="笔数" prop="cp0total" align="center"  :formatter="nformat" />
                                <el-table-column label="金额" prop="cp0amount" align="center" :formatter="n2format" />
                            </el-table-column>
                            <el-table-column label="已开票" align="center">
                                <el-table-column label="笔数" prop="cp0utotal" align="center"  :formatter="nformat" />
                                <el-table-column label="金额" prop="cp0uamount" align="center" :formatter="n2format" />
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="增值税专用发票" align="center" >
                            <el-table-column label="未开票" align="center">
                                <el-table-column label="笔数" prop="cp1total" align="center"  :formatter="nformat" />
                                <el-table-column label="金额" prop="cp1amount" align="center" :formatter="n2format" />
                            </el-table-column>
                            <el-table-column label="已开票" align="center">
                                <el-table-column label="笔数" prop="cp1utotal" align="center"  :formatter="nformat" />
                                <el-table-column label="金额" prop="cp1uamount" align="center" :formatter="n2format" />
                            </el-table-column>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="未开票" align="center">
                        <el-table-column label="笔数" prop="total" align="center"  :formatter="nformat" />
                        <el-table-column label="金额" prop="amount" align="center" :formatter="n2format" />
                    </el-table-column>
                    <el-table-column label="已开票" align="center">
                        <el-table-column label="笔数" prop="utotal" align="center"  :formatter="nformat" />
                        <el-table-column label="金额" prop="uamount" align="center" :formatter="n2format" />
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
    import XLSX from 'xlsx'
    import { mine } from '@/api/system/dept'
    import {statistics,statisticsExportList} from "@/api/invoice";
    import { list as getBranches } from '@/api/system/dept'
    export default {
        name:'invoiced',
        data(){
            return {
                loading: true,
                open:false,
                branches: [],
                takeTypes:[{id:'S',name:'自取'},{id:'P',name:'邮寄'}],
                invoiceTypes: [{id:'0',name:'增值税普通发票'},{id:'1',name:'增值税专用发票'}],
                invoiceCategories:[{id:'E',name:'电子发票'},{id:'P',name:'纸质发票'}],
                total: 0,
                invoiced:0,
                unbilled:0,
                list: undefined,
                summary: undefined,
                exportList:undefined,
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    orgName: undefined,
                    branchId: undefined,
                    tendersNo: undefined,
                    invoiceType: undefined,
                    invoiceCategory: undefined,
                    batchTime: [],
                },
            }
        },
        created() {
            mine().then(res => {
                this.branches = res
                this.list = res
                if (this.list) {
                    this.list.forEach(i => {
                        i.total = 0
                        i.amount = 0
                        i.utotal = 0
                        i.uamount = 0
                        i.cetotal = 0
                        i.ceamount = 0
                        i.ceutotal = 0
                        i.ceuamount = 0
                        i.cp0total = 0
                        i.cp0amount = 0
                        i.cp0utotal = 0
                        i.cp0uamount = 0
                        i.cp1total = 0
                        i.cp1amount = 0
                        i.cp1utotal = 0
                        i.cp1uamount = 0
                    })
                }
                // this.queryParams.batchTime = [ this.truncDate(this.dateAdd(new Date(), -30)), this.truncDate(this.dateAdd(new Date(), 1)) ];
                this.getList();
            })
        },
        methods:{
            getList(){
                this.loading = true
                statistics(this.queryParams).then(res =>{
                    if (res && '200' === res.code) {
                        this.list = this.branches
                        if (this.list) {
                            this.list.forEach(i => {
                                i.total = 0
                                i.amount = 0
                                i.utotal = 0
                                i.uamount = 0
                                i.cetotal = 0
                                i.ceamount = 0
                                i.ceutotal = 0
                                i.ceuamount = 0
                                i.cp0total = 0
                                i.cp0amount = 0
                                i.cp0utotal = 0
                                i.cp0uamount = 0
                                i.cp1total = 0
                                i.cp1amount = 0
                                i.cp1utotal = 0
                                i.cp1uamount = 0
                            })
                        }
                        // this.summary = ['合计', 0, 0, 0, 0, 0, 0, 0, 0]

                        if (res.data && 0 < res.data.length) {
                            res.data.forEach(l => {
                                const i = this.list.find(d => l.branchId === d.id)
                                if (l && i) {
                                    if ("P" === l.invoiceCategory) {
                                        if ("0" === l.invoiceType) {
                                            if (0 === l.bill) {
                                                i.cp0amount = l.amount
                                                i.cp0total = l.total
                                            } else {
                                                i.cp0uamount = l.amount
                                                i.cp0utotal = l.total
                                            }
                                        } else {
                                            if (0 === l.bill) {
                                                i.cp1amount = l.amount
                                                i.cp1total = l.total
                                            } else {
                                                i.cp1uamount = l.amount
                                                i.cp1utotal = l.total
                                            }
                                        }
                                    } else {
                                        if (0 === l.bill) {
                                            i.ceamount = l.amount
                                            i.cetotal = l.total
                                        } else {
                                            i.ceuamount = l.amount
                                            i.ceutotal = l.total
                                        }
                                    }

                                    if (0 === l.bill) {
                                        i.amount += l.amount
                                        i.total += l.total
                                    } else {
                                        i.uamount += l.amount
                                        i.utotal += l.total
                                    }
                                }
                            })
                        }
                        if (this.queryParams.branchId) {
                            const t = this.list.find(i => i.id === this.queryParams.branchId)
                            this.list = [t]
                        }
                    }
                }).finally(() => {
                    this.loading = false
                })
            },
            nformat(r, c, v, i) {
                if (0 === v) {
                    return '-'
                }
                return v
            },
            n2format(r, c, v, i) {
                if (0 === v) {
                    return '-'
                } else if (v) {
                    return v.toFixed(2)
                }
                return v
            },
            getSummaries(param){
                const { columns, data } = param;
                const sums = ['合计', 0, 0, 0, 0, 0, 0, 0, 0];
                if (data) {
                    data.forEach(i => {
                        sums[1] += i.cetotal
                        sums[2] += i.ceamount
                        sums[3] += i.cp0total
                        sums[4] += i.cp0amount
                        sums[5] += i.cp1total
                        sums[6] += i.cp1amount
                        sums[7] += i.total
                        sums[8] += i.amount
                    })
                }
                return this.summary
            },
            handleQuery(){
                this.getList();
            },
            handleUpdate(row){
                // this.open=true;
                this.$refs.unbilledEdit.start(row);
            },
            handleAdd(){
                // this.open=true;

                this.$refs.unbilledEdit.start();
            },
            exportExcel() {
                const wb = XLSX.utils.table_to_book(document.querySelector("#table1"))
                XLSX.writeFile(wb, '开票统计报表.xlsx');
            },
            selected(r){
                // this.showList = false
                // this.$nextTick(_ => this.$refs.approval.init(r))
            },
            handleDelete(row){
                this.$confirm('确认删除此数据项?', "警告", {
                    confirmButtonText: "删除",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(_ => {
                    delUnbilled(row).then(response => {
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
<style lang="scss" scoped>
    .data-container, .data-container {
        width: 100%;
        /*max-height: calc(100vh - 20rem);*/
        overflow: auto;
    }
    .data-container {
        margin-bottom: 4rem;
    }
</style>
