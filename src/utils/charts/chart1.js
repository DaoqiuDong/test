export function generate(data) {
    const option = {
        legend: {
            top: 10,
            right: 30,
            icon: 'circle',
            data: ['已开票', '未开票']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                axisLabel: {
                    color: '#7C7C7C',
                },
                axisTick: {show: false,},
                axisLine: {show: false},
                boundaryGap: false,
                data: data.map(i => i.businessDate)
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    color: '#7C7C7C',
                },
                minInterval: 1,
                axisTick: {show: false,},
                axisLine: {show: false},
                splitLine: {
                    lineStyle: {
                        color: '#ECEFF8'
                    }
                },
            }
        ],
        series: [
            {
                name: '已开票',
                type: 'line',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    color: '#8FE0EB',
                },
                data: data.map(i => 0 <= i.invoiceTotal ? i.invoiceTotal : 0)
            },
            {
                name: '未开票',
                type: 'line',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    color: '#F0F0F0',
                },
                data: data.map(i => 0 <= i.pendInvoiceTotal ? i.pendInvoiceTotal : 0)
            }
        ]
    };
    return option;
}
