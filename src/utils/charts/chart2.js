export function generate(data) {
    const option = {
        legend: {
            top: 10,
            right: 30,
            icon: 'circle',
            data: ['在保项目数', '解保项目数']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
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
                axisLine: {show: false},
                axisTick: {show: false},
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
                splitLine: {show: false},
            }
        ],
        series: [
            {
                name: '在保项目数',
                type: 'bar',
                barGap: 0,
                // label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    color: '#FFA516',
                },
                data: data.map(i => 0 <= i.guaranteeProjectTotal ? i.guaranteeProjectTotal : 0)
            },
            {
                name: '解保项目数',
                type: 'bar',
                // label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    color: '#03A9F4',
                },
                data: data.map(i => 0 <= i.historyProjectTotal ? i.historyProjectTotal : 0)
            },
        ]
    };
    return option
}