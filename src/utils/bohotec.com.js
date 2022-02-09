/**
 * 通用js方法封装处理
 * Copyright (c) 2019 bohotec.com
 */

const baseURL = process.env.VUE_APP_BASE_API

// 日期格式化
export function parseTime(time, pattern) {
	if (arguments.length === 0 || !time) {
		return null
	}
	const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
			time = parseInt(time)
		}
		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_str
}

// 表单重置
export function resetForm(refName) {
	if (this.$refs[refName]) {
		this.$refs[refName].resetFields();
	}
}

// 添加日期范围
export function addDateRange(params, dateRange) {
	var search = params;
	search.beginTime = "";
	search.endTime = "";
	if (null != dateRange && '' != dateRange) {
		search.beginTime = this.dateRange[0];
		search.endTime = this.dateRange[1];
	}
	return search;
}

// 回显数据字典
export function selectDictLabel(datas, value) {
	var actions = [];
	Object.keys(datas).map((key) => {
		if (datas[key].dictValue == ('' + value)) {
			actions.push(datas[key].dictLabel);
			return false;
		}
	})
	return actions.join('');
}

// // 通用下载方法
// export function download(fileName) {
// 	window.location.href = baseURL + "/common/download?fileName=" + encodeURI(fileName) + "&delete=" + true;
// }

// 字符串格式化(%s )
export function sprintf(str) {
	var args = arguments, flag = true, i = 1;
	str = str.replace(/%s/g, function () {
		var arg = args[i++];
		if (typeof arg === 'undefined') {
			flag = false;
			return '';
		}
		return arg;
	});
	return flag ? str : '';
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
    if (!str || str == "undefined" || str == "null") {
        return "";
    }
    return str;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data, id, parentId, children, rootId) {
	id = id || 'id'
	parentId = parentId || 'parentId'
	children = children || 'children'
	rootId = rootId || 0
	//对源数据深度克隆
	const cloneData = JSON.parse(JSON.stringify(data))
	//循环所有项
	const treeData =  cloneData.filter(father => {
	  let branchArr = cloneData.filter(child => {
		//返回每一项的子级数组
		return father[id] === child[parentId]
	  });
	  branchArr.length > 0 ? father.children = branchArr : '';
	  //返回第一层
	  return father[parentId] === rootId;
	});
	return treeData != '' ? treeData : data;
}

export function toFixed(v, p) {
  let r = v
  if (v && !isNaN(v)) {
    if (p && !isNaN(p)) {
      r = new Number(v).toFixed(p)
    } else {
      r = new Number(v).toFixed()
    }
  }
  // console.log('toFixed', v, p, r)
  return r
}

// export const WORKSPACE_CATEGORIES = {
//   A: '边滑坡',
//   B: '崩塌',
//   C: '杆塔',
//   D: '基坑',
//   E: '隧道',
//   F: '路基',
//   G: '桥梁',
// };
//
// export const DISEASE_TYPES = {
//   O: '古老滑坡',
//   L: '边坡滑坡',
//   C: '崩塌塌陷',
//   F: '掉块落石',
//   W: '坡面冲刷',
//   S: '流石流泥',
//   P: '风化剥落',
//   H: '无病害'
// };
//
// export const SLOPE_TYPES = {
//   A: '均质土边坡',
//   B: '类土质边坡',
//   C: '破碎岩石边坡',
//   D: '层状岩石边坡',
//   E: '节理岩石边坡',
//   F: '二元结构边坡',
//   G: '崩滑流堆积边坡',
//   H: '路堤边坡',
// };
// export const STABLE_LEVELS = [
//   {key: 4, value: '稳定'},
//   {key: 3, value: '三级'},
//   {key: 2, value: '二级'},
//   {key: 1, value: '一级'},
// ];
//
// export const CATEGORIES = {
//     'MD1': '水平位移',
//     'S1': '浅表倾斜(I类)',
//     'S2': '浅表倾斜(II类)',
//     'S3': '浅表倾斜(III类)',
//     'D1': '浅表位移(I类)',
//     'D2': '浅表位移(II类)',
//     'D3': '浅表位移(III类)',
//     'I1': '倾斜监测(I类)',
//     'I2': '倾斜监测(II类)',
//     'I3': '倾斜监测(III类)',
//     'I4': '倾斜监测(IV类)',
//     'H1': '深层水平位移(I类)',
//     'MH2': '深层水平位移(II类)',
//     'MVM': '竖向监测',
//     'GPS': '北斗监测',
//     'SAA': 'SAA监测',
//     'CAM': '视频',
//     'AICM': 'AI摄像头',
//     'SG': '沉降监测',
//   };
//   export const AUTO_CATEGORIES = {
//     'S1': '浅表倾斜(I类)',
//     'S2': '浅表倾斜(II类)',
//     'S3': '浅表倾斜(III类)',
//     'D1': '浅表位移(I类)',
//     'D2': '浅表位移(II类)',
//     'D3': '浅表位移(III类)',
//     'I1': '倾斜监测(I类)',
//     'I2': '倾斜监测(II类)',
//     'I3': '倾斜监测(III类)',
//     'I4': '倾斜监测(IV类)',
//     'H1': '深层水平位移(I类)',
//     'GPS': '北斗监测',
//     'SAA': 'SAA监测',
//     'AICM': 'AI摄像头',
//     'SG': '沉降监测',
//   };
// export const WEATHERS = {
//   'SUN': '晴',
//   'CLD': '阴',
//   'RAIN': '雨',
//   'SNOW': '雪',
//   'LR': '小雨',
//   'MR': '中雨',
//   'HR': '大雨'
// };
//
// export const MONITORING_TESTING_PRECAUTION ={
//   'A':'挡墙',
//   'B':'护面墙',
//   'C':'植草',
//   'D':'锚索',
//   'E':'锚杆',
//   'F':'主动网',
//   'G':'被动网'
// }
// export const ALARM_CATEGORIES = {P: '测点预警', C: '监测类型预警', W: '工点预警', G: '测组预警'};
// // export const ALARM_CATEGORIES = {C: '监测类型预警', G: '测组预警'};
//
// const MESSAGE_CATEGORIES = {
//   '91': ['S1', 'S3', 'I1', 'I3', 'I4', 'D1', 'D3'],
//   '92': ['S2', 'D2'],
//   '96': ['H1', 'I2'],
//   'A1': ['SAA'],
//   'AICM': ['AICM'],
//   '90': ['SG'],
//   '93': ['SG'],
// }
//
// export function messageCategory(messageCode, category) {
//   // console.log('messageCategory', messageCode, category)
//   const a = MESSAGE_CATEGORIES[messageCode]
//   const r = a && a.length && 0 <= a.indexOf(category)
//   // console.log(r)
//   return r
// }
//
// export function autoCatgories() {
//   return Object.keys(AUTO_CATEGORIES).map(i => ({key: i, value: AUTO_CATEGORIES[i]}))
// }
//
// export function monitoringPointCategory(data) {
//   const result = [];
//   if (data && 0 < data.length) {
//     const uid = new Set(data)
//     Object.keys(CATEGORIES).filter(k => uid.has(k)).forEach(i => result.push({id: i, value: CATEGORIES[i]}))
//   }
//   return result;
// }

export function currency(v, d, c) {
    return v
}
export function xcurrency(v, d, c) {
    if (isNaN(v) || !v) {
        return v
    }
    const value = parseFloat(v)
    const s = Math.abs(value).toFixed(d)
    const _i = d ? s.slice(0, -1 - d) : s
    const fp = _i.length % 3
    const h = (fp > 0) ? s.slice(0, fp) + ((fp > 0) ? ',' : '') : ''
    const f = d ? s.slice(-1 - d) : ''
    const sign = (0 > value) ? '-' : ''
    return sign + h + _i.slice(fp).replace(/(\d{3}(?=\d))/g, '$1,') + f
}

export function dateAdd(date, days) {
  return new Date(date.getTime() + 86400000 * days);
}

export function truncDate(d) {
  if (d instanceof Date) {
    d.setHours(0, 0, 0, 0);
    return d;
  }
}

export function split(source) {
  if (source.match(/^((\d+),?)*$/)) {
    const a = source.split(',')
    if (a && a.length) {
      return a.filter(i => parseInt(i)).map(i => parseInt(i))
      // console.log(result)
    // } else {
    //   console.log(a)
    }
  }
  return [];
}
