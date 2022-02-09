<template>
    <div class="home">
        <div class="beans-line">
            <bean-curd :iconIndex="0" title1="待审批" :value1="waitForApprval" title2="已审批" :value2="beanCurdData.approvalTotal" :format="0"></bean-curd>
            <bean-curd :iconIndex="1" title1="项目总数" :value1="beanCurdData.projectTotal" title2="项目总金额(元)" :value2="beanCurdData.projectAmount"></bean-curd>
            <bean-curd :iconIndex="2" title1="待缴费项目" :value1="beanCurdData.pendPayTotal" title2="待缴费金额(元)" :value2="beanCurdData.pendPayAmount"></bean-curd>
            <bean-curd :iconIndex="3" title1="在保项目" :value1="beanCurdData.guaranteeProjectTotal" title2="在保金额(元)" :value2="beanCurdData.guaranteeProjectAmount"></bean-curd>
            <bean-curd :iconIndex="4" title1="解保项目" :value1="beanCurdData.historyProjectTotal" title2="解保金额(元)" :value2="beanCurdData.historyProjectAmount"></bean-curd>
        </div>
        <div class="charts1">
            <div class="chart1-div">
                <div class="chart-title">开票统计</div>
                <div class="echart1" id="chart1"></div>
            </div>
            <div class="chart2-div">
                <div class="chart-title chart-title2">在保项目数  /  解保项目数统计</div>
                <div class="echart2" id="chart2"></div>
            </div>
        </div>
        <div class="chart3-div">
            <div class="chart-title">缴费统计
            <div class="sub-chart-title">近15天收费类型</div>
            </div>
            <div class="echart3" id="chart3"></div>
        </div>
    </div>
</template>

<script>
    import BeanCurd from "./home/beanCurd"
    import { statistic } from "@/api/statistic"
    import { generate as generateChart1 } from "../utils/charts/chart1"
    import { generate as generateChart2 } from "../utils/charts/chart2"
    import { generate as generateChart3 } from "../utils/charts/chart3"

    import echarts from 'echarts'

    export default {
        name: "ebgmain",
        components: {BeanCurd},
        data() {
            return {
                chart1: undefined,
                chart2: undefined,
                chart3: undefined,
                waitForApprval: 0,
                beanCurdData: {
                    guaranteeProjectAmount: 0,
                    guaranteeProjectTotal: 0,
                    historyProjectAmount: 0,
                    historyProjectTotal: 0,
                    invoiceAmount: 0,
                    invoiceTotal: 0,
                    pendPayAmount: 0,
                    pendPayTotal: 0,
                    projectAmount: 0,
                    projectTotal: 0,
                    pendAppvTotal: 0,
                    approvalTotal: 0,
                }
            }
        },
        mounted() {
            const _this = this;
            window.onresize = () => {
                if (_this.chart1) {
                    _this.chart1.resize()
                }
                if (_this.chart2) {
                    _this.chart2.resize()
                }
                if (_this.chart3) {
                    _this.chart3.resize()
                }
            };
            this.fillChart()
        },
        methods: {
            fillChart() {
                this.chart1 = this.chart1 || echarts.init(document.getElementById('chart1'));
                this.chart2 = this.chart2 || echarts.init(document.getElementById('chart2'));
                this.chart3 = this.chart3 || echarts.init(document.getElementById('chart3'));

                statistic().then(res => {
                    if (res.data[0]) {
                        const latest = res.data[1].reduce((a, b) => a.businessDate > b.businessDate ? a : b).businessDate;
                        this.beanCurdData = res.data[0].concat(res.data[1].filter(i => i.businessDate === latest)).reduce((t, c) => {
                        // this.beanCurdData = res.data[0].concat(res.data[1]).reduce((t, c) => {
                            t.guaranteeProjectAmount += c.guaranteeProjectAmount
                            t.guaranteeProjectTotal += c.guaranteeProjectTotal
                            t.historyProjectAmount += c.historyProjectAmount
                            t.historyProjectTotal += c.historyProjectTotal
                            t.invoiceAmount += c.invoiceAmount
                            t.invoiceTotal += c.invoiceTotal
                            t.pendInvoiceAmount += c.pendInvoiceAmount
                            t.pendInvoiceTotal += c.pendInvoiceTotal
                            t.pendPayAmount += c.pendPayAmount
                            t.pendPayTotal += c.pendPayTotal
                            // t.projectAmount += c.projectAmount
                            // t.projectTotal += c.projectTotal
                            t.pendAppvTotal += c.pendAppvTotal
                            t.approvalTotal += c.approvalTotal
                            return t
                        }, {
                            guaranteeProjectAmount: 0,
                            guaranteeProjectTotal: 0,
                            historyProjectAmount: 0,
                            historyProjectTotal: 0,
                            invoiceAmount: 0,
                            invoiceTotal: 0,
                            pendInvoiceAmount: 0,
                            pendInvoiceTotal: 0,
                            pendPayAmount: 0,
                            pendPayTotal: 0,
                            projectAmount: 0,
                            projectTotal: 0,
                            pendAppvTotal: 0,
                            approvalTotal: 0,
                        })
                        if (this.beanCurdData) {
                            this.beanCurdData.projectTotal = this.beanCurdData.pendPayTotal + this.beanCurdData.guaranteeProjectTotal + this.beanCurdData.historyProjectTotal
                            this.beanCurdData.projectAmount = this.beanCurdData.pendPayAmount + this.beanCurdData.guaranteeProjectAmount + this.beanCurdData.historyProjectAmount
                        }
                    }
                    if (res.data[1]) {
                        let dates = new Set(res.data[1].map(i => i.businessDate))
                        console.log('dates', dates)
                        let cd = res.data[1].reduce((a, c) => {
                            if (a[c.businessDate]) {
                                const t = a[c.businessDate]
                                t.guaranteeProjectAmount += c.guaranteeProjectAmount
                                t.guaranteeProjectTotal += c.guaranteeProjectTotal
                                t.historyProjectAmount += c.historyProjectAmount
                                t.historyProjectTotal += c.historyProjectTotal
                                t.pendInvoiceAmount += c.pendInvoiceAmount
                                t.pendInvoiceTotal += c.pendInvoiceTotal
                                t.invoiceAmount += c.invoiceAmount
                                t.invoiceTotal += c.invoiceTotal
                                t.pendPayAmount += c.pendPayAmount
                                t.pendPayTotal += c.pendPayTotal
                                // t.projectAmount += c.projectAmount
                                // t.projectTotal += c.projectTotal
                                t.pendAppvTotal += c.pendAppvTotal
                                t.approvalTotal += c.approvalTotal
                            } else {
                                a[c.businessDate] = c
                            }
                            return a
                        }, {})
                        console.log(cd)
                        const data = []
                        for (let k of Object.keys(cd)) {
                            data.push(cd[k])
                        }
                        console.log(data)

                        const option = generateChart1(data)
                        console.log(option)
                        this.chart1.setOption(option)
                        this.chart1.resize()

                        this.chart2.setOption(generateChart2(data))
                        this.chart2.resize()

                        this.chart3.setOption(generateChart3(data))
                        this.chart3.resize()
                    }
                    if (res.data[2]) {
                        this.waitForApprval = res.data[2]
                    }
                }).catch(e => {
                    console.log(e)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.home {
    width: 100%;
    margin: 1rem 0;
    padding-right: 1rem;
    overflow: auto;
    .beans-line, .charts1, .echart3 {
        min-width: 66rem;
    }
    .beans-line {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .curd {
            width: 20%;
            height: 9rem;
            margin-right: 1rem;
            -webkit-border-radius: 12px;
            -moz-border-radius: 12px;
            border-radius: 12px;
        }
        .curd:last-of-type {
            margin-right: 0;
        }
    }
    .charts1 {
        /*width: 100%;*/
        margin: 1rem 0;
        display: flex;
        .chart1-div, .chart2-div {
            width: 50%;
        }
        .echart1, .echart2 {
            width: 100%;
            height: 18rem;
            padding: 1rem;

            background-size: 100% 100%;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
        }
        .echart1 {
            background-color: #ffffff;
            margin: 1rem 1rem 0 0;
            /*background-image: url("../assets/image/dummy01.png");*/
        }
        .echart2 {
            background-color: #ffffff;
            margin: 1rem .5rem 0 .5rem;
            /*background-image: url("../assets/image/dummy02.png");*/
        }
    }
    .echart3 {
        width: 100%;
        height: calc(100vh - 41rem);
        min-height: 18rem;
        margin: 1rem 0;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        background-color: #ffffff;
        /*background-image: url("../assets/image/dummy03.png");*/
        /*background-size: 100% 100%;*/
    }
    .chart-title {
        position: relative;
        /*font-size: .8rem;*/
        color: #000000;
    }
    .chart-title:before {
        margin-right: .5rem;
        content: '.';
        color: #0E74B6;
        background-color: #0E74B6;
    }
    .chart-title2 {
        margin-left: .5rem;
    }
    .sub-chart-title {
        position: absolute;
        top: .2rem;
        left: 5.5rem;
        font-size: .8rem;
        color: #999999;
    }
}
</style>
