<template>
    <div class="data-container monitor">
        <el-table v-loading="loading" :data="list"
                  :row-style="{height: '65px',fontSize:'16px' ,fontFamily: 'Microsoft YaHei' ,fontWeight:'400' ,color: '#333333'}"
                  :header-cell-style="{height: '65px', fontSize: '16px',fontFamily: 'Microsoft YaHei', fontWeight: '400',color:'#424970'}">
            <el-table-column label="接口" align="center" prop="name" :show-overflow-tooltip="true" />
            <el-table-column label="功能描述" align="center" prop="descript" :show-overflow-tooltip="true" />
            <el-table-column label="状态" align="center" >
                <template v-slot="scope">
                    <i v-if="'Q' === scope.row.status" class="el-icon-loading" title="正在查询接口状态"></i>
                    <i v-if="'H' === scope.row.status" class="el-icon-success success">正常</i>
                    <i v-if="'W' === scope.row.status" class="el-icon-warning warning">异常</i>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { get } from '@/api/appState'
    export default {
        name: "Monitor",
        data() {
            return {
                list: [
                    {service: 'rmh', name: 'rmh', descript: '信息港报文接收', status: 'Q'},
                    {service: 'ebg-cfca', name: 'cfca', descript: 'CFCA签章接口', status: 'Q'},
                    {service: 'ebg-bestsign', name: 'bestsign', descript: '上上签接口', status: 'Q'},
                    {service: 'ebg-payment', name: 'payment', descript: '宝付支付接口', status: 'Q'},
                    {service: 'ebgr', name: 'tianyancha', descript: '天眼查接口', status: 'Q'},
                    {service: 'bohotec-ms', name: 'sms', descript: '阿里云短信接口', status: 'Q'},
                ],
            }
        },
        mounted() {
            get().then(res => {
                if (res && res.forEach) {
                    // console.log(res)
                    res.forEach(i => {
                        console.log(i.ServiceName)
                        const service = this.list.find(s => s.service === i.ServiceName)
                        if (service) {
                            service.status = 'H'
                        }
                    })
                    this.list.filter(i => i.status === 'Q').forEach(i => i.status = 'W')
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
.monitor {
    margin: 1rem;
    .success {
        color: green;
    }
    .warning {
        color: #FFBA00;
    }
}
</style>
