<template>
    <div class="list-container">
        <div class="dark" v-if="showList">
                <div class="condition big-form">
                    <el-form :model="queryParams" :inline="true" label-width="9rem">
                        <div>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="出函单位">
                                        <el-select v-model="queryParams.branchId" placeholder="出函单位" clearable >
                                            <el-option
                                                    v-for="i in branches"
                                                    :key="i.id"
                                                    :value="i.id"
                                                    :label="i.name"
                                            />
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="企业名称">
                                        <el-input v-model="queryParams.coName"  />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="项目状态">
                                        <el-select v-model="queryParams.status" placeholder="待审批" disabled >
                                            <el-option
                                                    v-for="i in statusList"
                                                    :key="i.dictValue"
                                                    :value="i.dictValue"
                                                    :label="i.dictLabel"
                                            />
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="申请时间">
                                        <el-date-picker
                                                v-model="queryParams.applyTimes"
                                                value-format="yyyy-MM-dd"
                                                type="daterange"
                                                range-separator="-"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                        ></el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="审核时间">
                                        <el-date-picker
                                                v-model="queryParams.auditTimes"
                                                value-format="yyyy-MM-dd"
                                                type="daterange"
                                                range-separator="-"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                        ></el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="缴费时间">
                                        <el-date-picker
                                                v-model="queryParams.paymentTimes"
                                                value-format="yyyy-MM-dd"
                                                type="daterange"
                                                range-separator="-"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                        ></el-date-picker>
                                    </el-form-item>
                                </el-col>


                            </el-row>
                        </div>
                        <div v-show="showSenior">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="出函时间">
                                        <el-date-picker
                                                v-model="queryParams.guaranteeAtTimes"
                                                value-format="yyyy-MM-dd"
                                                type="daterange"
                                                range-separator="-"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                        ></el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="解保时间">
                                        <el-date-picker
                                                v-model="queryParams.bidOpenAtTimes"
                                                value-format="yyyy-MM-dd"
                                                type="daterange"
                                                range-separator="-"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                        ></el-date-picker>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="8">
                                    <el-form-item label="申请来源">
                                        <el-select v-model="queryParams.reqSource" placeholder="请选择申请来源" clearable >
                                            <el-option
                                                    v-for="i in reqSources"
                                                    :key="i.dictValue"
                                                    :value="i.dictValue"
                                                    :label="i.dictLabel"
                                            />
                                        </el-select>
                                    </el-form-item>
                                </el-col>


                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="投标项目编号">
                                        <el-input v-model="queryParams.bidNo"  />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="标段编号">
                                        <el-input v-model="queryParams.bidSectorNum"/>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="8">
                                    <el-form-item label="标段名称">
                                        <el-input v-model="queryParams.bidSectorName"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="统一社会信用代码">
                                        <el-input v-model="queryParams.coCreditId" />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="法定代表人姓名">
                                        <el-input v-model="queryParams.coLegalName"  />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="法定代表人身份证">
                                        <el-input v-model="queryParams.coLegalId"  />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="招标人">
                                        <el-input v-model="queryParams.tenderee"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="招标代理">
                                        <el-input v-model="queryParams.bidAgency"  />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="公司电话">
                                        <el-input v-model="queryParams.coTelNo"  />
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>

                                <el-col :span="8">
                                    <el-form-item label="申请联系人">
                                        <el-input v-model="queryParams.contactName"  />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="申请人联系电话">
                                        <el-input v-model="queryParams.contactPhone" />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="电子邮箱地址">
                                        <el-input v-model="queryParams.coEmail"  />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>

                        <div class="bohotec-button-project">
                            <el-form-item>
                                <el-button type="primary"   @click="handleQuery">搜索</el-button>
                                <el-button type="primary"   v-show="showSenior" @click="showSenior = false">基础筛选</el-button>
                                <el-button type="primary"  v-show="!showSenior" @click="showSenior = true">高级筛选</el-button>
                                <el-button type="primary"  @click="clearParams">清除</el-button>
                                <el-button type="success"  @click="handleExport" v-hasPermi="['project:approval_pending:export']">导出</el-button>


                            </el-form-item>
                        </div>
                    </el-form>
            </div>
            <div class="data-container">
                <el-table v-loading="loading" :data="list" @row-click="selected"
                          :row-style="{height: '65px',fontSize:'16px' ,fontFamily: 'Microsoft YaHei' ,fontWeight:'400' ,color: '#333333'}"
                          :header-cell-style="{height: '65px', fontSize: '16px',fontFamily: 'Microsoft YaHei', fontWeight: '400',color:'#424970'}"

                >
                    <el-table-column label="企业名称" prop="coName" :show-overflow-tooltip="true" align="center" width="300" fixed/>
                    <el-table-column label="投标项目编号" prop="bidNo" :show-overflow-tooltip="true" align="center" width="180" fixed/>
                    <el-table-column label="统一社会信用代码" prop="coCreditId" :show-overflow-tooltip="true" align="center" width="300" />
                    <el-table-column label="标段编号" prop="bidSectorNum" :show-overflow-tooltip="true" align="center" width="180" />
                    <el-table-column label="标段名称" prop="bidSectorName" :show-overflow-tooltip="true" align="center" width="180" />
                    <el-table-column label="招标人" prop="tenderee" :show-overflow-tooltip="true" align="center" width="180" />
                    <el-table-column label="招标代理" prop="bidAgency" :show-overflow-tooltip="true" align="center" width="180" />
                    <el-table-column label="申请联系人" prop="contactName" align="center" width="180" />
                    <el-table-column label="申请人联系电话" prop="contactPhone" align="center" width="180" />
                    <el-table-column label="法定代表人姓名" prop="coLegalName" align="center" width="180" />
                    <el-table-column label="法定代表人身份证" prop="coLegalId" align="center" width="300" />
                    <el-table-column label="公司电话" prop="coTelNo" align="center" width="180" />
                    <el-table-column label="电子邮箱地址" prop="coEmail" align="center" width="180" />
                    <el-table-column label="出函单位" prop="branchName"  align="center" width="300"/>
                    <el-table-column label="申请时间" prop="createdAt" align="center" width="180" />
                    <el-table-column label="审核时间" prop="approvedAt" align="center" width="180" />
                    <el-table-column label="缴费时间" prop="payAt" align="center" width="180" />
                    <el-table-column label="出函时间" prop="guaranteeAt" align="center" width="180" />
                    <el-table-column label="解保时间" prop="bidOpenAt" align="center" width="180" />
                    <el-table-column label="保证金(元)" prop="guaranteeAmount" align="center" width="180" />
                    <el-table-column label="手续费(元)" prop="feeAmount" align="center"  width="120"/>
                    <el-table-column label="项目状态" prop="status" :formatter="statusFormat" align="center" width="180" />
                    <el-table-column label="申请来源" prop="reqSource" :formatter="reqSourceFormat" align="center" width="180" />
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
        <div class="dark" v-if="!showList">
            <approval ref="approval" @close="showList = true" @exit="afterApproval"></approval>
        </div>
    </div>
</template>

<script>
    import {getPendingList,getPendingExportList} from '@/api/project'
    import {mine} from "@/utils/dict"
    import { list as getBranches } from '@/api/system/dept'
    import Approval from "./approval"
    import XLSX from "xlsx";

    export default {
        name: "ProjectPending",
        components: {Approval},
        data() {
            return {
                loading: true,
                showList: true,
                showSenior:false,
                total: 0,
                list: undefined,
                branches: [],
                reqSources: [],
                statusList:[],
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    branchId: undefined,
                    coName: undefined,
                    status:undefined,
                    applyTimes:[],
                    paymentTimes:[],
                    auditTimes:[],
                    guaranteeAtTimes:[],
                    bidOpenAtTimes:[],
                    reqSource:undefined,
                    coCreditId:undefined,
                    tenderee:undefined,
                    bidNo:undefined,
                    bidSectorNum:undefined,
                    bidSectorName:undefined,
                    bidAgency:undefined,
                    contactName:undefined,
                    contactPhone:undefined,
                    coTelNo:undefined,
                    coLegalName:undefined,
                    coLegalId:undefined,
                    coEmail:undefined
                },
                dummy: undefined
            }
        },
        created() {
           // this.queryParams.applyTimes = [ this.truncDate(this.dateAdd(new Date(), -6)), this.truncDate(this.dateAdd(new Date(), 1)) ];
            getBranches({}).then(res => {
                this.branches = res.data
                this.getList()
            })
            mine("SYS_REQ_SOURCE").then(res => {
                this.reqSources = res
            })
            mine("PROJECT_STATUS").then(res => {
                this.statusList = res
            })
           /* this.queryParams.status='PA'*/
        },
        methods: {
            getList() {
                this.loading = true
                getPendingList(this.queryParams).then(res => {
                    this.list = res.data.list
                    this.total = res.data.total
                    this.loading = false
                    this.list.forEach(i => {
                        i.branchName = this.branches.filter(b => b.id === i.branchId)[0].name
                        /*const s= this.statusList.find(c => c.id === i.status)
                        if(s){
                            i.statusName = s.name
                        }*/
                    })
                })
            },
            handleQuery() {
                this.queryParams.page = 1;
                this.getList();
            },
            /** 导出按钮操作 */
            handleExport() {
                getPendingExportList(this.queryParams).then(response =>{
                    this.exportList= response.data;
                    this.exportExcel();
                })
            },
            exportExcel(){
                const json= [];
                if(this.exportList){
                    this.exportList.forEach(i => {
                        const b = this.branches.find(y => y.id === i.branchId);
                        //i.createdAt= i.createdAt.substring(0,11);
                        if(b){
                            i.branchName = b.name;
                        }
                        i.reqSourceName=this.reqSourceFormat(i)
                       /* const s= this.statusList.find(c => c.id === i.status)
                        if(s){*/
                            i.statusName = this.statusFormat(i);
                        // }
                        const json_item = {企业名称:i.coName,'投标项目编号':i.projectName,
                            '标段编号':i.bidSectorNum,'标段名称':i.bidSectorName,'招标人':i.tenderee,'出函机构':i.branchName,
                            '申请时间':i.createdAt,'支付时间':i.createdAt,'审批时间':i.createdAt,'出函时间':i.createdAt,
                            '解保时间':i.bidOpenAt,'保函金额':i.guaranteeAmount,'支付金额':i.feeAmount,
                            '支付状态':i.statusName,'申请来源':i.reqSourceName,};
                        json.push(json_item)
                    })
                }
                const workSheet = XLSX.utils.json_to_sheet(json);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, workSheet, 'Sheet1');

                /* save to file */
                XLSX.writeFile(wb, '项目管理待审批报表.xlsx');
            },
            selected(r) {
                this.showList = false
                this.$nextTick(_ => this.$refs.approval.init(r))
            },
            afterApproval() {
                this.getList()
                this.showList = true
            },
            reqSourceFormat(row) {
                return this.selectDictLabel(this.reqSources, row.reqSource);
            },
            statusFormat(row) {
                return this.selectDictLabel(this.statusList, row.status);
            },
            clearParams(){
                this.queryParams = {
                    pageNum: 1,
                    pageSize: 10,
                    branchId: undefined,
                    coName: undefined,
                    status:undefined,
                    applyTimes:[],
                    paymentTimes:[],
                    auditTimes:[],
                    bidOpenAtTimes:[],
                    guaranteeAtTimes:[],
                    reqSource:undefined,
                    coCreditId:undefined,
                    tenderee:undefined,
                    bidNo:undefined,
                    bidSectorNum:undefined,
                    bidSectorName:undefined,
                    bidAgency:undefined,
                    contactName:undefined,
                    contactPhone:undefined,
                    coTelNo:undefined,
                    coLegalName:undefined,
                    coLegalId:undefined,
                    coEmail:undefined
                }
                // this.queryParams.applyTimes = [ this.truncDate(this.dateAdd(new Date(), -6)), this.truncDate(this.dateAdd(new Date(), 1)) ];
            },
        }

    }
</script>

<style scoped>
    .list-container {
        overflow: auto;
    }
    .bohotec-button-project{
        text-align: center;
        align-content: center;
        margin-top: 1rem
    }
</style>
