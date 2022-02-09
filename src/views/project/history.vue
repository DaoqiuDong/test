<template>
    <div>
        <el-table :data="history" border stripe size="middle" :v-loading="loading">
            <el-table-column prop="name" label="步骤名称" align="center" width="150"/>
            <el-table-column label="开始时间" align="center" width="250">
                <template v-slot="scope">{{scope.row.startTime | parseTime}}</template>
            </el-table-column>
            <!--<el-table-column prop="endTime" label="结束时间" />-->
<!--
            <el-table-column prop="taskLocalVariables.motivation" label="意见" align="center" />
            <el-table-column prop="taskLocalVariables.operator" label="处理人" align="center" />
-->
            <el-table-column label="处理人" align="center" width="200" >
                <template v-slot="scope">{{scope.row.endTime ? scope.row.taskLocalVariables.operator : ''}}</template>
            </el-table-column>
            <el-table-column label="意见" >
                <template v-slot="scope">{{scope.row.endTime ? scope.row.taskLocalVariables.motivation : ''}}</template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { projectHistory } from '@/api/project'
    import { parseTime as parse, dateAdd } from "@/utils/bohotec.com"

    export default {
        name: "history",
        data() {
            return {
                loading: true,
                history: undefined,
            }
        },
        methods: {
            init(processInstanceId) {
                projectHistory(processInstanceId).then(res => {
                    this.history = res.data
                    this.loading = false
                }).catch(e => {
                    // this.$message({
                    //     type: 'error',
                    //     message:'查询流程处理记录失败'
                    // })
                })
            }
        },
        filters: {
            parseTime(v) {
                return parse(new Date(v))
            }
        }
    }
</script>

<style scoped>

</style>