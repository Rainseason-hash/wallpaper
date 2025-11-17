import {
	request
} from '@/utils/request.js'
export function apiGetBanner() {
	return request({
		url: '/homeBanner'
	})
	/*
	return uni.request({
		url: 'https://tea.qingnian8.com/api/bizhi/homeBanner',
		header: {
			"access-key": 'cml200494@#'
		}
	})
	*/
}
export function apiGetDayRandom() {
	return request({
		url: '/randomWall'
	})
}
export function apiGetNotice(data = {}) {
	return request({
		url: '/wallNewsList',
		data
	})
}
/*
export const apiGetClassify = (data = {}) => request({
	url: '/classify',
	data
})
*/
export function apiGetClassify(data = {}) {
	return request({
		url: '/classify',
		data
	})
}

export const apiGetClassList = (data = {}) => request({
	url: '/wallList',
	data
})
export const apiGetScore = (data = {}) => request({
	url: '/setupScore',
	data
})
//写入下载记录
export const apiwriteDownload = (data = {}) => request({
	url: '/downloadWall',
	data
})
export const apiDetailWall = (data = {}) => request({
	url: '/detailWall',
	data
})
//用户个人信息
export const apiGetUserInfo = () => request({
	url: '/userInfo'
})
//获取历史列表，评分和下载
export const apiGetHistoryList = (data = {}) => request({
	url: '/userWallList',
	data
})
//获取公告详情
export const apiGetNoticeDetail = (data = {}) => request({
	url: "/wallNewsDetail",
	data
})
//搜索壁纸
export const apiGetSearchData = (data = {}) => request({
	url: '/searchWall',
	data
})