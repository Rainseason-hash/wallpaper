<template>
	<view class="classlist">
		<view class="loadingLayout" v-if="!classList.length && !noData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator :url="'/pages/detail/detail?id=' + item._id" class="item" v-for="item in classList" :key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<view class="loadingLayout" v-if="classList.length || noData">
			<uni-load-more :status="noData ? 'noMore' : 'loading'"></uni-load-more>
		</view>
	</view>
	<view class="safe-area-inset-bottom"></view>
</template>

<script setup>
import { ref } from 'vue';
// onReachBottom是触底
import { onLoad, onUnload, onReachBottom, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { apiGetClassList, apiGetHistoryList } from '@/api/apis.js';
import { goHome } from '@/utils/common.js';
const classList = ref([]);
const noData = ref(false);
const queryParams = {
	pageNum: 1,
	pageSize: 12
};
//分享给好友
onShareAppMessage((e) => {
	return {
		title: '小茉莉壁纸',
		path: '/pages/classlist/classlist?id=' + queryParams.classid + '&name=' + queryParams.name
	};
});
//分享给朋友圈
onShareTimeline((e) => {
	return {
		title: '笨鸟',
		// 是参数不是path
		query: "id=' + queryParams.classid + '&name=' + queryParams.name"
	};
});
onLoad((e) => {
	console.log(e); //获取到id
	let { id = null, name = null, type = null } = e; //解构
	// if (!id) goHome();
	if (type) queryParams.type = type;
	if (id) queryParams.classid = id;
	queryParams.name = name;
	uni.setNavigationBarTitle({
		title: name
	});
	getClassList(); //onload调用顺序在setup之后，所以需要放在onload中，setup执行时就会略过生命周期函数，拿不到参数
});
onUnload(() => {
	uni.removeStorageSync('classList');
});
onReachBottom(() => {
	if (noData.value) return; //没有数据了就不发请求了
	queryParams.pageNum++;
	getClassList();
});
//获取分类列表
const getClassList = async () => {
	let res;
	// 根据参数classid和type区分
	if (queryParams.classid) res = await apiGetClassList(queryParams);
	if (queryParams.type) res = await apiGetHistoryList(queryParams);
	classList.value = [...classList.value, ...res.data];
	if (queryParams.pageSize > res.data.length) {
		noData.value = true;
	}
	uni.setStorageSync('classList', classList.value);
	console.log(res);
};
</script>

<style lang="scss" scoped>
.classlist {
	.content {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 5rpx;
		padding: 5rpx;
		.item {
			height: 440rpx;
			image {
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
}
</style>
