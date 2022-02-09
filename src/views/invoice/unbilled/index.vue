<template>
    <div class="list-container">
        <div class="dark">
            <div class="condition big-form">
                <el-form :inline="true">
                    <el-form-item label="企业名称">
                        <el-input v-model="queryParams.orgName"  clearable/>
                    </el-form-item>
                    <el-form-item label="投保机构">
                        <el-select v-model="queryParams.branchId" placeholder="请选择机构名称" clearable >
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
                        <el-select v-model="queryParams.invoiceType" placeholder="请选择开票类型" clearable>
                            <el-option
                                    v-for="i in invoiceTypes"
                                    :key="i.id"
                                    :value="i.id"
                                    :label="i.name"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开票方式">
                        <el-select v-model="queryParams.invoiceCategory" placeholder="请选择开票方式"  clearable>
                            <el-option
                                    v-for="i in invoiceCategories"
                                    :key="i.id"
                                    :value="i.id"
                                    :label="i.name"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="申请时间">
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
                    <el-table-column label="纳税识别号" prop="uniformCreditCode" align="center" width="300" />
                    <el-table-column label="投标项目编号" prop="bidNo" align="center" width="300"/>
                    <el-table-column label="标段编号" prop="tendersNo" align="center" width="300"/>
                    <el-table-column label="标段名称" prop="tendersName" align="center" width="300"/>
                    <el-table-column label="出函单位" prop="branchName" align="center" width="300"/>
                    <el-table-column label="开票方式" prop="invoiceCategoryName" align="center" width="200"/>
                    <el-table-column label="开票类型" prop="invoiceTypeName" align="center" width="200"/>
                    <el-table-column label="发票金额(元)" prop="amount" align="center" width="200"/>
                    <el-table-column label="申请时间" prop="createdAt" align="center" width="200"/>
                    <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
                        <template v-slot="scope">
                            <el-button
                                    type="text"
                                    icon="el-icon-edit"
                                    @click="handleUpdate(scope.row)"
                            >开票</el-button>

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
        <unbilled-edit  :visible.sync="open"   ref="unbilledEdit" @success="getList"></unbilled-edit>
        <!--        <el-dialog :visible.sync="open" title="参数设置">-->
        <!--            <unbilled-edit  ref="unbilledEdit" @done="getList"></unbilled-edit>-->
        <!--        </el-dialog>-->
    </div>
</template>
<script>
    import {listUnbilled} from "@/api/invoice";
    import { list as getBranches } from '@/api/system/dept'
    import UnbilledEdit from './edit'
    export default {
        name:'unbilled',
        components:{
            UnbilledEdit
        },
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
                listUnbilled(this.queryParams).then(response=>{
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
                            i.invoiceCategoryName = this.invoiceCategories.filter(b => b.id === i.invoiceCategory)[0].name
                                +this.takeTypes.filter(b => b.id === i.takeType)[0].name;
                            // i.createdAt= i.createdAt.substring(0,10);
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
