<template>
    <div class="list-container">
        <div class="dark">
            <div class="condition big-form">
                <el-form :inline="true">
                    <el-form-item label="企业名称">
                        <el-input v-model="queryParams.orgName"  clearable/>
                    </el-form-item>
                    <el-form-item label="投保机构" >
                        <el-select v-model="queryParams.branchId" clearable placeholder="请选择机构名称" >
                            <el-option
                                    v-for="i in branches"
                                    :key="i.id"
                                    :value="i.id"
                                    :label="i.name"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标段编号">
                        <el-input v-model="queryParams.tendersNo"  clearable/>
                    </el-form-item>
                    <el-form-item label="开票类型">
                        <el-select v-model="queryParams.invoiceType" placeholder="请选择开票类型"  clearable>
                            <el-option
                                    v-for="i in invoiceTypes"
                                    :key="i.id"
                                    :value="i.id"
                                    :label="i.name"
                            />
                        </el-select>
                    </el-form-item>
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
                    <el-form-item label="开票时间">
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
                        <el-button type="success"  @click="handleExport"  v-hasPermi="['invoice:invoiced:export']"
                        >导出</el-button>
                        <!-- <el-button
                                 type="primary"
                                 icon="el-icon-plus"
                                 size="mini"
                                 @click="handleAdd"
                                 v-hasPermi="['system:dict:add']"
                         >新增</el-button>-->
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
                    <el-table-column label="开票抬头" prop="orgName" align="center" width="300" fixed/>
                    <el-table-column label="纳税识别号" prop="uniformCreditCode" align="center" width="300"/>

                    <el-table-column label="投标项目编号" prop="bidNo" align="center" width="300"/>
                    <el-table-column label="标段编号" prop="tendersNo" align="center" width="300"/>
                    <el-table-column label="标段名称" prop="tendersName" align="center" width="300"/>

                    <el-table-column label="出函单位" prop="branchName" align="center" width="300"/>
                    <el-table-column label="开票号" prop="invoiceNum" align="center" width="200"/>
                    <el-table-column label="开票方式" prop="invoiceCategoryName" align="center" width="200"/>
                    <el-table-column label="开票类型" prop="invoiceTypeName" align="center" width="200"/>

                    <el-table-column label="开户银行" prop="openBank"   align="center" width="200"/>
                    <el-table-column label="开户帐号" prop="basicAccount" align="center" width="200"/>
                    <el-table-column label="纳税人性质" prop="payTaxType" align="center" width="200">
                        <template v-slot="scope">
                            {{'01' === scope.row.payTaxType ? '小规模纳税人' : '一般纳税人'}}
                        </template>
                    </el-table-column>
                    <el-table-column label="联系电话" prop="orgPhone" align="center" width="200"/>
                    <el-table-column label="地址" prop="companyAddress" align="center" width="400"/>
                    <el-table-column label="邮箱地址" prop="mailAddress" align="center" width="200"/>
                    <el-table-column label="快递公司" prop="expressName" align="center" width="200"/>
                    <el-table-column label="快递单号" prop="expressNum" align="center" width="200"/>
                    <el-table-column label="发票金额(元)" prop="amount" align="center" width="200"/>
                    <el-table-column label="申请时间" prop="createdAt" align="center" width="200"/>
                    <el-table-column label="开票时间" prop="billAt" align="center" width="200"/>
                   <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                        <template v-slot="scope">
                            <el-button
                                    size="mini"
                                    type="text"
                                    icon="el-icon-edit"
                                    @click="handleUpdate(scope.row)"
                            >开票</el-button>

                        </template>
                    </el-table-column>-->
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
    import XLSX from 'xlsx'
    import {listInvoiced,invoicedExportList} from "@/api/invoice";
    export default {
        name:'invoiced',
        data(){
            return {
                loading: false,
                open:false,
                branches: [
                    {id: 1000, code: '620100', name: '甘肃金控融资担保集团股份有限公司' },
                    {id: 1001, code: '623000', name: '甘肃金控融资担保集团股份有限公司天祝分公司' },
                    {id: 1002, code: '620900', name: '甘肃金控酒泉融资担保有限公司' },
                    {id: 1003, code: '620800', name: '甘肃金控平凉融资担保有限公司' },
                    {id: 1004, code: '621200', name: '甘肃金控陇南融资担保有限公司' },
                    {id: 1005, code: '620400', name: '甘肃金控白银融资担保有限公司' },
                    {id: 1006, code: '621000', name: '甘肃金控庆阳融资担保有限公司' },
                    {id: 1007, code: '620700', name: '甘肃金控张掖融资担保有限公司' },
                    {id: 1008, code: '620300', name: '甘肃金控金昌融资担保有限公司' },
                    {id: 1009, code: '620500', name: '甘肃金控天水融资担保有限公司' },
                    {id: 1010, code: '621100', name: '甘肃金控定西融资担保有限公司' },
                    {id: 1011, code: '620600', name: '甘肃金控武威融资担保有限公司' },
                    {id: 1012, code: '622900', name: '甘肃金控临夏融资担保有限公司' },
                    {id: 1013, code: '620200', name: '甘肃金控嘉峪关融资担保有限公司' }

                    // 甘肃金控担保酒泉公司
                    // 甘肃金控担保平凉公司
                    // 甘肃金控担保陇南公司
                    // 甘肃金控担保庆阳公司
                    // 甘肃金控担保张掖公司
                    // 甘肃金控担保金昌公司
                    // 甘肃金控担保天水公司
                    // 甘肃金控担保武威公司
                    // 甘肃金控担保临夏公司
                    // 甘肃金控担保嘉峪关公司
                ],
                takeTypes:[{id:'S',name:'自取'},{id:'P',name:'邮寄'}],
                invoiceTypes: [{id:'0',name:'增值税普通发票'},{id:'1',name:'增值税专用发票'}],
                invoiceCategories:[{id:'E',name:'电子发票'},{id:'P',name:'纸质发票'}],
                exportList:undefined,
                total: 0,
                list: undefined,
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
            // getBranches({}).then(res => {
            //     this.branches = res.data
            //     this.getList()
            // })
            // this.queryParams.batchTime = [ this.truncDate(this.dateAdd(new Date(), -6)), this.truncDate(this.dateAdd(new Date(), 1)) ];
            this.getList();
        },
        methods:{
            getList(){
                listInvoiced(this.queryParams).then(response=>{
                    this.list = response.data.list;
                    this.total = response.data.total;
                    if(this.list){
                        this.list.forEach(i => {
                            //TODO:前后台机构数据同步
                            const b = this.branches.find(y => y.id === i.branchId);
                            if(b){
                                i.branchName = b.name;
                            }
                            const it = this.invoiceTypes.find(b => b.id === i.invoiceType);

                            if(it){
                                i.invoiceTypeName = it.name;
                            }
                            //i.createdAt= i.createdAt.substring(0,11);
                            i.invoiceCategoryName = this.invoiceCategories.filter(b => b.id === i.invoiceCategory)[0].name
                                +this.takeTypes.filter(b => b.id === i.takeType)[0].name;
                        })
                    }
                })
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
            /** 导出按钮操作 */
            /** 导出按钮操作 */
            handleExport() {
                // const queryParams = this.queryParams;
                // this.$confirm('是否确认导出所有类型数据项?', "警告", {
                //     confirmButtonText: "确定",
                //     cancelButtonText: "取消",
                //     type: "warning"
                // }).then(_ => {
                    invoicedExportList(this.queryParams).then(response =>{
                        this.exportList= response.data;
                        this.exportExcel();
                    })

                // }).catch(_ => {
                // })
            },
            exportExcel() {
                const json= [];
                if(this.exportList){
                    this.exportList.forEach(i => {
                        const b = this.branches.find(y => y.id === i.branchId);
                        //i.createdAt= i.createdAt.substring(0,11);
                        if(b){
                            i.branchName = b.name;
                        }
                        const it = this.invoiceTypes.find(b => b.id === i.invoiceType);

                        if(it){
                            i.invoiceTypeName = it.name;
                        }
                        i.invoiceCategoryName = this.invoiceCategories.filter(b => b.id === i.invoiceCategory)[0].name
                            +this.takeTypes.filter(b => b.id === i.takeType)[0].name;
                        if(i.payTaxType === '01'){
                            i.payTaxTypeName ='小规模纳税人'
                        }
                        if(i.payTaxType === '02'){
                            i.payTaxTypeName ='一般纳税人'
                        }

                        const json_item = {'开票抬头':i.orgName,'纳税识别号':i.uniformCreditCode,'投标项目编号':i.bidNo,
                            '标段编号':i.tendersNo,'标段名称':i.tendersName,'出函单位':i.branchName,
                            '开票号':i.invoiceNum,'开票方式':i.invoiceCategoryName,'开票类型':i.invoiceTypeName,
                            '开户银行':i.openBank,'开户帐号':i.basicAccount,'纳税人性质':i.payTaxTypeName,'联系电话':i.orgPhone,
                            '地址':i.companyAddress,'邮箱地址':i.mailAddress,'快递公司':i.expressName,'快递单号':i.expressNum,
                            '发票金额':i.amount,'开票时间':i.billAt};
                        json.push(json_item)
                    })
                }
                console.log('this.config=',json);
                const workSheet = XLSX.utils.json_to_sheet(json);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, workSheet, 'Sheet1');

                /* save to file */
                XLSX.writeFile(wb, '已出票统计报表.xlsx');

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
