<template>
    <el-dialog title="确认开票" :visible.sync="showUnbilledDialog" width="800px">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
            <el-row>
                <el-col :span="12">
            <el-form-item label="发票抬头:" prop="orgName" v-if="form.orgName">
                {{form.orgName}}
            </el-form-item>
                </el-col>
                <el-col :span="12">
            <el-form-item label="发票类型:" prop="invoiceTypeName" v-if="form.invoiceTypeName">
                {{form.invoiceTypeName}}
            </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="投标项目编号:" prop="bidNo" >
                        {{form.bidNo}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="标段名称:" prop="tendersNo" >
                        {{form.tendersNo}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="标段编号:" prop="tendersName" >
                        {{form.tendersName}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="出函单位:" prop="branchName" >
                        {{form.branchName}}
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
            <el-form-item label="开户银行:" prop="openBank" v-if="form.openBank">
                {{form.openBank}}
            </el-form-item>
                </el-col>
                <el-col :span="12">
            <el-form-item label="开户账号:" prop="basicAccount" v-if="form.basicAccount">
                {{form.basicAccount}}
            </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
            <el-form-item label="开票金额:" prop="amount">
                {{form.amount}}
            </el-form-item>
                </el-col>
                <el-col :span="12">
            <el-form-item label="开票方式:" prop="invoiceCategoryName" v-if="form.invoiceCategoryName">
                {{form.invoiceCategoryName}}
            </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
            <el-form-item label="申请日期:" prop="createdAt" v-if="form.createdAt">
                {{form.createdAt}}
            </el-form-item>
                </el-col>
                <el-col :span="12">
            <el-form-item label="纳税人性质:" prop="payTaxType" v-if="form.payTaxType">
                <span v-if="form.payTaxType === '01'"> 小规模纳税人</span>
                <span v-if="form.payTaxType === '02'"> 一般纳税人</span>
            </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
            <el-form-item label="联系电话:" prop="orgPhone" v-if="form.orgPhone">
                {{form.orgPhone}}
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="地址:" prop="companyAddress" v-if="form.companyAddress">
                {{form.companyAddress}}
            </el-form-item>
            <el-form-item label="邮箱地址:" prop="mailAddress" v-if="form.mailAddress">
                {{form.mailAddress}}
            </el-form-item>
            </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
            <el-form-item label="发票编号:" prop="invoiceNum">
                <el-input v-model="form.invoiceNum" placeholder="请填写发票编号"  style="width: 220px" maxlength="64"/>
            </el-form-item>
                </el-col>
                <el-col :span="12">
            <el-form-item label="开票时间:" prop="billAt">
                <el-date-picker
                        v-model="form.billAt"
                        type="date"
                        placeholder="开票时间">
                </el-date-picker>
            </el-form-item>
                </el-col>
            </el-row>
            <el-row>
            <el-col :span="12">
            <el-form-item label="快递公司:" prop="expressName" v-if="form.takeType === 'P' && form.invoiceCategory === 'P'">
                <el-input v-model="form.expressName" placeholder="请填写快递公司名称" style="width: 220px" maxlength="64" />
            </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="快递单号:" prop="expressNum" v-if="form.takeType === 'P' && form.invoiceCategory === 'P'">
                    <el-input v-model="form.expressNum" placeholder="请填写快递单号" style="width: 220px" maxlength="64"/>
                </el-form-item>
                </el-col>
            </el-row>

        </el-form>
        <div slot="footer" style="text-align: center">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import {updateInvoice} from "@/api/invoice";
    import { formatDate2 } from '@/utils'
    export default {
        name:'unbilledEdit',
        props: {
            branches: {},
        },
        data(){
            return{
                showUnbilledDialog: false,
                // branches:[],
                form:{
                    openBank:undefined,
                    basicAccount:undefined,
                    invoiceType:undefined,
                    invoiceTypeName:undefined,
                    invoiceCategory:undefined,
                    invoiceCategoryName:undefined,
                    takeType:undefined,
                    createdAt:undefined,
                    companyAddress:undefined,
                    orgPhone:undefined,
                    mailAddress:undefined,
                    invoiceNum:undefined,
                    expressNum:undefined,
                    payTaxType:undefined,
                    billAt:undefined,
                    amount:undefined,
                    expressName:undefined
                },
                rules: {

                    invoiceNum: [
                        { required: true, message: "发票编号不能为空", trigger: "blur" }
                    ],
                    expressName: [
                        { required: true, message: "快递公司名称不能为空", trigger: "blur" }
                    ],
                    expressNum: [
                        { required: true, message: "快递单号不能为空", trigger: "blur" }
                    ],

                    billAt: [
                        { required: true, message: "申请时间不能为空", trigger: "blur" }
                    ]
                }
            }
        },
        methods:{
            start(data){
                this.form = Object.assign(this.form, data);
                this.form.billAt = new Date();
                this.showUnbilledDialog = true;
                this.resetValidate();
            },
            resetValidate(){

                if(this.form.takeType==='P' && this.form.invoiceCategory === 'P'){
                    this.rules.expressNum= [
                        { required: true, message: "快递单号不能为空", trigger: "blur" }
                    ]
                    this.rules.expressName= [
                        { required: true, message: "快递公司名称不能为空", trigger: "blur" }
                    ]
                }else{
                    this.rules.expressNum = []
                }

                // this.$refs.form.clearValidate();
            },
            submitForm(){
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        // console.log('isEdit========'+this.isEdit);
                        this.form.billAt = formatDate2(this.form.billAt);
                        console.log(this.form.createdAt);
                        updateInvoice(this.form).then(response => {
                                if (response.code === '200') {
                                    this.msgSuccess("操作成功");
                                    this.showUnbilledDialog = false;
                                    this.$emit('success');
                                } else {
                                    this.msgError(response.message);
                                }
                            });
                    }
                });
            },
            cancel(){
                this.showUnbilledDialog = false;
            },
        }
    }
</script>
