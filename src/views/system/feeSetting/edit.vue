<template>
    <el-dialog title="阶梯计费" :visible.sync="showFeeSettingDialog" width="500px">
        <el-form ref="form" :model="form" :rules="rules" label-width="8rem" hide-required-asterisk >

            <el-form-item label="机构" prop="branchId">
                <el-select v-model="form.branchId" placeholder="请选择机构名称"  style="width: 100%" size="medium">
                    <el-option
                            v-for="i in branches"
                            :key="i.id"
                            :value="i.id"
                            :label="i.name"
                    />
                </el-select>
            </el-form-item>


            <el-form-item label="最低收费(元)" prop="minFee">
                <el-input v-model="form.minFee" placeholder="请填写最低收费" />
            </el-form-item>
                <div class="oneline">
                     <el-form-item label="担保费(元)" prop="rangeFrom">
                         <el-col >
                    <el-input v-model="form.rangeFrom"  placeholder="元" style="width: 9rem" />
                         </el-col>
                     </el-form-item>
                     <el-form-item  label="-" label-width="2rem" prop="rangeTo" >
                         <el-col >
                     <el-input v-model="form.rangeTo" placeholder="元" style="width: 9rem" />
                    </el-col>
                     </el-form-item>
                </div>
            <el-form-item label="费率" prop="fee">
                    <el-input v-model="form.fee" placeholder="请填写费率" />
            </el-form-item>
            <el-form-item>
            <div  class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
            </el-form-item>
        </el-form>

    </el-dialog>
</template>
<script>
    import {updateFeeSetting,addFeeSetting} from "@/api/feeSetting";
    export default {
        name:'feeSettingEdit',
        props: {
            branches: {},
        },
        data(){
            return{
                isEdit:false,
                showFeeSettingDialog: false,
                // branches:[],
                form:{
                    branchId:undefined,
                    minFee:undefined,
                    rangeFrom:undefined,
                    rangeTo:undefined,
                    fee:undefined,
                },
                rules: {
                    branchId: [
                        { required: true, message: "机构名称不能为空", trigger: "blur" }
                    ],
                    minFee: [
                        { required: true, message: "最低收费不能为空", trigger: "blur" },
                        {pattern:  /^[1-9]\d{0,3}(\.\d{0,2})?$/,
                            message: '最低收费格式为####.##',
                            trigger: "blur"
                        }
                    ],
                    rangeFrom: [
                        { required: true, message: "担保费不能为空", trigger: "blur" },
                        {pattern:  /^\d{1,8}(\.\d{0,2})?$/,
                            message: '担保费格式为########.##',
                            trigger: "blur"
                        }
                    ],
                    rangeTo: [
                        { required: true, message: "担保费不能为空", trigger: "blur" },
                        {pattern:  /^[1-9]\d{0,7}(\.\d{0,2})?$/,
                            message: '担保费格式为########.##',
                            trigger: "blur"
                        }
                    ],
                    // rangeTo: [
                    //     { required: true, message: "担保费不能为空", trigger: "blur" }
                    // ],
                    fee: [
                        { required: true, message: "费率不能为空", trigger: "blur" },
                        {pattern:  /^-?\d{1,3}(\.\d{0,4})?$/,
                            message: '费率格式为###.####',
                            trigger: "blur"
                        }
                    ]
                }
            }
        },
        methods:{
            start(data){
                if (data) {
                    this.form = Object.assign(this.form, data);
                    // this.isEdit = true;
                }else{
                    this.form = Object.assign(this.form, {
                        id:undefined,
                        branchId:undefined,
                        minFee:undefined,
                        rangeFrom:undefined,
                        rangeTo:undefined,
                        fee:undefined
                    });
                    // this.isEdit = false;
                }
                this.showFeeSettingDialog = true;

            },
            submitForm(){
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        // console.log('isEdit========'+this.isEdit);
                        if (this.form.id) {
                            updateFeeSetting(this.form).then(response => {
                                if (response.code === '200') {
                                    this.msgSuccess("修改成功");
                                    this.showFeeSettingDialog = false;
                                    this.$emit('success');
                                } else {
                                        this.msgError(response.message);
                                }
                            });
                        } else {
                            console.log(this.form);
                            addFeeSetting(this.form).then(response => {
                                // console.log(response);
                                if (response.code === '200') {
                                    this.msgSuccess("新增成功");
                                    this.showFeeSettingDialog = false;
                                    this.$emit('success');
                                } else {
                                        if(response.code === '0000'){
                                            this.msgError("该机构已设置阶")
                                        }else{
                                        this.msgError(response.message);
                                        }
                                }
                            });
                        }
                    }
                });
            },
            cancel(){
                this.showFeeSettingDialog = false;
            },
        }
    }
</script>
<style lang="scss" scoped>
    .oneline {
        display: flex;
    }
</style>
