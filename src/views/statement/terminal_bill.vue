<template>
    <div class="bill-container">
        <div class="xdark">
            <div class="big-form">
                <el-form :inline="true">
<!--
                    <el-form-item label="出函机构:">
                        <el-select v-model="queryParams.branchId" placeholder="请选择机构名称" clearable >
                            <el-option
                                    v-for="i in branches"
                                    :key="i.id"
                                    :value="i.id"
                                    :label="i.name"
                            />
                        </el-select>
                    </el-form-item>
-->
                    <el-form-item label="对账时间:">
                        <el-date-picker
                                v-model="queryParams.batchTime"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"   @click="handleQuery" >搜索</el-button>
                        <el-button type="success"  @click="exportExcel">导出</el-button>
                    </el-form-item>
                    <el-form-item v-if="total">
                        <div class="summary">
                            <div>合计：{{total}} 笔</div>
                            <div>交易金额(元)：{{amount.toFixed(2)}}</div>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <div class="data-container">
                <el-table v-loading="loading" :data="list" id="settle" stripe
                          :row-style="{height: '65px',fontSize:'16px' ,fontFamily: 'Microsoft YaHei' ,fontWeight:'400' ,color: '#333333'}"
                          :header-cell-style="{height: '65px', fontSize: '16px',fontFamily: 'Microsoft YaHei', fontWeight: '400',color:'#424970'}">
                    <!--<el-table-column label="清算时间" prop="settleDate" align="center" width="180" />-->

                    <el-table-column label="企业名称" prop="companyName" align="center" width="300"/>
                    <el-table-column label="投标项目编号" prop="projectName" align="center" width="180" />
                    <el-table-column label="标段编号" prop="bidSectorNum" align="center" width="180" />
                    <el-table-column label="标段名称" prop="bidSectorName" align="center" width="180" />
                    <el-table-column label="出函机构" prop="branchName" align="center"  width="300" />
                    <!--<el-table-column label="申请来源" prop="reqSource" :formatter="reqSourceFormat" align="center" width="180" />-->

                    <!--<el-table-column label="宝付订单号" prop="bfNum" align="center" width="260" />-->
                    <el-table-column label="交易订单号" prop="poNum" align="center" width="280" />
                    <el-table-column label="交易金额(元)" prop="money" align="center" width="180" />
                    <!--<el-table-column label="手续费(元)" prop="fee" align="center" width="180" />-->
                    <el-table-column label="交易时间" prop="bfTradeAt" align="center" width="160" />
                    <el-table-column label="状态" align="center" >
                        <template v-slot="scope">
                            <i v-if="'1' === scope.row.status" class="el-icon-success success">成功</i>
                            <i v-if="'0' === scope.row.status" class="el-icon-warning warning">失败</i>
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
    </div>
</template>
<script>
    import { terminalBill } from "@/api/statement"
    import { list as getBranches } from '@/api/system/dept'
    import {mine} from "@/utils/dict"
    import XLSX from "xlsx";

    export default {
        name:'TerminalBill',
        data(){
            return {
                loading: false,
                showFeeSettingDialog:false,
                amount: 0,
                total: 0,
                list: undefined,
                branches: [],
                projectList:[],
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    branchId: undefined,
                    batchTime: [],
                },
            }
        },
        created() {
            this.queryParams.batchTime = [ this.truncDate(this.dateAdd(new Date(), -1)), this.truncDate(this.dateAdd(new Date(), -1)) ];
            getBranches({}).then(res => {
                this.branches = res.data
                this.getList()
            })
            /*
                        mine("SYS_REQ_SOURCE").then(res => {
                            this.reqSources = res
                        })
                        mine("PAY_TYPE").then(res => {
                            this.payTypes = res
                        })
            */
        },
        methods:{

            getList(){
                terminalBill(this.queryParams).then(res=>{
                    this.amount = res.data[0]
                    this.list = res.data[1].list
                    this.total = res.data[1].total

                    if (this.list) {
                        const pos = res.data[2]
                        const pjs = res.data[3]
                        this.list.forEach(i => {
                            const po = pos.find(a => a.tradeNo === i.poNum)
                            if (po) {
                                const pj = pjs.find(b => b.id === po.projectId)
                                if (pj) {
                                    i.companyName = pj.coName
                                    i.projectName = pj.bidNo
                                    i.bidSectorNum = pj.bidSectorNum
                                    i.bidSectorName = pj.bidSectorName
                                    const br = this.branches.find(c => c.id === pj.branchId)
                                    i.branchName = br.name
                                }
                            }
                        })
                    }
                })

            },
            // branchesFormat(row, column) {
            //     return this.selectDictLabel(this.branches, row.branchId);
            // },
            handleQuery(){
                this.getList();
            },
            // handleExport() {
            //     // const queryParams = this.queryParams;
            //     this.$confirm('是否确认导出所有类型数据项?', "警告", {
            //         confirmButtonText: "确定",
            //         cancelButtonText: "取消",
            //         type: "warning"
            //     }).then(_ => {
            //         stattementExportList(this.queryParams).then(response =>{
            //             console.log(response)
            //             this.exportList= response.data[0];
            //             this.projectList =response.data[1];
            //             this.exportExcel();
            //         })
            //
            //     }).catch(_ => {
            //     })
            // },
            exportExcel() {
                // const json= [];
                // if(this.exportList){
                //     this.exportList.forEach(i => {
                //         const b = this.branches.find(y => y.id === i.branchId);
                //         //i.createdAt= i.createdAt.substring(0,11);
                //         if(b){
                //             i.branchName = b.name;
                //         }
                //         i.reqSourceName=this.reqSourceFormat(i)
                //         const p=this.projectList.filter(b => b.id === i.projectId)[0]
                //         if(p){
                //             i.projectName = p.bidNo
                //             i.companyName = p.coName
                //             i.bidSectorName = p.bidSectorName
                //             i.bidSectorNum = p.bidSectorNum
                //         }
                //         i.payTypeName = this.payTypeFormat(i);
                //         if(i.status ==='S'){
                //             i.statusName='成功'
                //         }else if(i.status ==='F'){
                //             i.statusName = '失败'
                //         }
                //         const json_item = {企业名称:i.companyName,'投标项目编号':i.projectName,
                //             '标段编号':i.bidSectorNum,'标段名称':i.bidSectorName,'出函机构':i.branchName,'申请来源':i.reqSourceName,
                //             '对帐日期':i.businessDate,'保证金金额（元）':i.guaranteeAmount,'手续费金额（元）':i.feeAmount,
                //             '支付类型':i.payTypeName,'支付订单号':i.transNo,'交易订单号':i.tradeNo,'支付状态':i.statusName};
                //         json.push(json_item)
                //     })
                // }
                // const workSheet = XLSX.utils.json_to_sheet(json);
                // const wb = XLSX.utils.book_new();
                // XLSX.utils.book_append_sheet(wb, workSheet, 'Sheet1');
                const wb = XLSX.utils.table_to_book(document.querySelector("#settle"))
                XLSX.writeFile(wb, '宝付对帐单.xlsx');

            },
            reqSourceFormat(row) {
                return this.selectDictLabel(this.reqSources, row.reqSource);
            },
            payTypeFormat(row){
                return this.selectDictLabel(this.payTypes, row.payType);
            }
           /* handleUpdate(row){
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
            },*/


        }
    }
</script>
<style lang="scss" scoped>
.big-form {
    margin-top: .5rem;
    .summary {
        display: flex;
        font-size: 1.1rem;
        padding-top: .5rem;
        color: #424970;
        div:first-of-type {
            padding-right: 2rem;
        }
    }
}
    .success {
        color: green;
    }
    .warning {
        color: #FFBA00;
    }

</style>
