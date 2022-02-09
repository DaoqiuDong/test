export function generate(data) {
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            top: 10,
            right: 30,
            icon: 'circle',
            data: ['已收费项目数', '待收费项目数']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#ddd'
                }
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            data: data.map(i => i.businessDate)
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#ddd'
                }
            },
            minInterval: 1,
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        series: [
            {
                name: '待收费项目数',
                type: 'line',
                itemStyle: {
                    color: '#36C2CF',
                },
                data: data.map(i => 0 <= i.pendPayTotal ? i.pendPayTotal : 0)
            },
            {
                name: '已收费项目数',
                type: 'line',
                itemStyle: {
                    color: '#5473E8',
                },
                data: data.map(i => 0 <= i.guaranteeProjectTotal ? i.guaranteeProjectTotal : 0)
            },
        ]
    };
    return option
}