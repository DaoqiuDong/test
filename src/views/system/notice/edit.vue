<template>
    <el-dialog title="通知公告编辑" :visible.sync="open" width="900px">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="公告标题" prop="title">
                <el-input v-model="form.title" placeholder="请输入公告标题" />
            </el-form-item>
            <el-form-item label="公布内容" prop="content">

<!--                <el-input type="textarea" v-model="form.content"  placeholder="请输入公布内容" />-->
                <Editor v-model="form.content" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import {updateNotice,addNotice} from "@/api/system/notice";
    import Editor from '@/components/Editor';
    export default {
        name:'noticeEdit',
        components: {
            Editor
        },
        data(){
            return{
                open: false,
                form:{
                    title:'',
                    content:'',
                },
                rules: {
                    title: [
                        { required: true, message: "公告标题不能为空", trigger: "blur" }
                    ],
                    content: [
                        { required: true, message: "公告内容不能为空", trigger: "blur" }
                    ]
                }
            }
        },
        methods:{
            start(data){
                if (data) {
                    this.form = Object.assign(this.form, data);
                }else{
                    this.form = Object.assign(this.form, {
                        title: '',
                        content: '',
                    });
                }
                this.open = true;

            },
            submitForm(){
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        if (this.form.id) {
                            updateNotice(this.form).then(response => {
                                if (response.code === '200') {
                                    this.msgSuccess("修改成功");
                                    this.open = false;
                                    this.$emit('success');
                                } else {
                                        this.msgError(response.message);
                                }
                            });
                        } else {
                            addNotice(this.form).then(response => {
                                if (response.code === '200') {
                                    this.msgSuccess("新增成功");
                                    this.open = false;
                                    this.$emit('success');
                                } else {
                                        this.msgError(response.message);
                                }
                            });
                        }
                    }
                });
            },
            cancel(){
                this.open = false;
            },
        }
    }
</script>
<style scoped>
    .dialog-footer{
        padding-top: 20px;
        margin-top: 20px;
    }
</style>
