<template>
    <el-dialog title="参数设置" :visible.sync="showConfigDialog" width="500px">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="参数键名" prop="papamKey">
            <el-input v-model="form.papamKey" placeholder="请输入参数键名" />
        </el-form-item>
        <el-form-item label="参数键值" prop="papamValue">
            <el-input v-model="form.papamValue" placeholder="请输入参数键值" />
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
    </div>
    </el-dialog>
</template>
<script>
    import {updateConfig,addConfig} from "@/api/system/config";
    export default {
        name:'configEdit',
        data(){
            return{
                isEdit:false,
                showConfigDialog: false,
                form:{
                    papamKey:'',
                    papamValue:'',
                },
                rules: {
                    papamKey: [
                        { required: true, message: "参数键名不能为空", trigger: "blur" }
                    ],
                    papamValue: [
                        { required: true, message: "参数键值不能为空", trigger: "blur" }
                    ]
                }
            }
        },
        methods:{
            start(data){
                if (data) {
                    this.form = Object.assign(this.form, data);
                    this.isEdit = true;
                }else{
                    this.form = Object.assign(this.form, {
                        papamKey: '',
                        papamValue: '',
                    });
                    this.isEdit = false;
                }
                this.showConfigDialog = true;

            },
            submitForm(){
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        // console.log('isEdit========'+this.isEdit);
                        if (this.isEdit) {
                            updateConfig(this.form).then(response => {
                                if (response.code === '200') {
                                    this.msgSuccess("修改成功");
                                    this.showConfigDialog = false;
                                    this.$emit('success');
                                } else {
                                    if(response.code  ==='0000'){
                                        this.msgSuccess("参数键名已存在！");
                                    }else{
                                    this.msgError(response.message);
                                    }
                                }
                            });
                        } else {
                            addConfig(this.form).then(response => {
                                // console.log(response);
                                if (response.code === '200') {
                                    this.msgSuccess("新增成功");
                                    this.showConfigDialog = false;
                                    this.$emit('success');
                                } else {
                                    if(response.code  ==='0000'){
                                        this.msgSuccess("参数键名已存在！");
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
                this.showConfigDialog = false;
            },
        }
    }
</script>
