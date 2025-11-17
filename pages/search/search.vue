<template>
	<view class="searchLayout">
		<view class="search">
			<uni-search-bar
				class="uni-mt-10"
				v-model="queryParams.keyword"
				focus
				radius="5"
				placeholder="请输入商品"
				clearButton="auto"
				cancelButton="always"
				@confirm="onSearch"
				@cancel="onClear"
				@clear="onClear"
			/>
		</view>
		<view v-if="!classList.length">
			<view class="history" v-if="historyList.length">
				<view class="lastSearch">
					<view class="text">最近搜索</view>
					<view class="icon">
						<uni-icons type="trash-filled" @click="removeList" size="26" color="gray"></uni-icons>
					</view>
				</view>
				<view class="searchList">
					<view class="item" v-for="(item, index) in historyList" :key="item._id" @click="clickTab(item)">{{ item }}</view>
				</view>
			</view>

			<view class="hot">
				<view class="text">热门搜索</view>
				<view class="hotList">
					<view class="item" v-for="(item, index) in 5" :key="index" @click="clickTab(item)">帅哥</view>
				</view>
			</view>
		</view>
		<view class="noSearch" v-if="noSearch">
			<uv-empty mode="search"></uv-empty>
		</view>
		<view v-else>
			<view class="list">
				<navigator :url="`/pages/detail/detail?id=${item._id}`" class="item" v-for="item in classList" :key="item._id">
					<image :src="item.smallPicurl" mode="aspectFill"></image>
				</navigator>
			</view>
			<view class="loadingLayout" v-if="noData || classList.length"><uni-load-more :status="noData ? 'noMore' : 'loading'" /></view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad, onUnload, onReachBottom } from '@dcloudio/uni-app';
import { apiGetSearchData } from '@/api/apis.js';
//没有更多
const noData = ref(false);
const noSearch = ref(false);
//查询参数
const queryParams = ref({
	pageNum: 1,
	pageSize: 12,
	keyword: '' //搜索关键字
});
//历史记录
const historyList = ref(uni.getStorageSync('historyList') || []);
//热门搜索
const hotList = ref([]);
//搜索结果列表
const classList = ref([]);
//回车添加到记录
const onSearch = () => {
	// console.log(queryParams.value.keyword);
	uni.showLoading({
		title: '加载中...'
	});
	// slice表示记录最多10个
	historyList.value = [...new Set([queryParams.value.keyword, ...historyList.value])].slice(0, 10);
	uni.setStorageSync('historyList', historyList.value);
	initParams(queryParams.value.keyword);
	getSearch();
};
//点击每一个历史记录
const clickTab = (value) => {
	initParams(value);
	onSearch();
};
//发搜索请求
const getSearch = async () => {
	try {
		const res = await apiGetSearchData(queryParams.value);
		// console.log(res);
		classList.value = [...classList.value, ...res.data];
		uni.setStorageSync('classList', classList.value);
		if (queryParams.value.pageSize > res.data.length) noData.value = true;
		if (res.data.length == 0 && classList.value.length == 0) noSearch.value = true;
	} finally {
		uni.hideLoading();
	}
};
//清空历史记录
const removeList = () => {
	uni.showModal({
		title: '是否清空历史记录',
		success: (res) => {
			if (res.confirm) {
				uni.removeStorageSync('historyList');
				historyList.value = [];
			}
		}
	});
};
const initParams = (value = '') => {
	classList.value = [];
	noData.value = false;
	noSearch.value = false;
	queryParams.value = {
		pageNum: 1,
		pageSize: 12,
		keyword: value || '' //搜索关键字
	};
};
//搜索框叉号,取消
const onClear = () => {
	initParams();
};
//触底加载更多
onReachBottom(() => {
	queryParams.value.pageNum++;

	getSearch();
});

//关闭有页面
onUnload(() => {
	uni.removeStorageSync('classList', classList.value);
});
</script>

<style lang="scss" scoped>
.history {
	padding: 35rpx 30rpx;
	.lastSearch {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		color: #999;

		.text {
			font-size: 33rpx;
			color: #999;
		}
	}
	.searchList {
		margin: 30rpx 0;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		.item {
			background: rgba(0, 0, 0, 0.05);
			border-radius: 50rpx;
			padding: 13rpx 30rpx;
			color: black;
			text-align: center;
			margin-right: 20rpx;
			margin-top: 20rpx;
			font-size: 28rpx;
		}
	}
}
.hot {
	padding: 28rpx 30rpx;
	.text {
		font-size: 33rpx;
		color: #999;
	}
	.hotList {
		margin: 40rpx 0;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		.item {
			background: rgba(0, 0, 0, 0.05);
			border-radius: 50rpx;
			padding: 13rpx 30rpx;
			color: black;
			text-align: center;
			margin-right: 20rpx;
			font-size: 28rpx;
		}
	}
}
.noSearch {
	margin-top: 80rpx;
}
.list {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 5rpx;
	padding: 20rpx 5rpx;
	.item {
		height: 440rpx;
		image {
			width: 100%;
			height: 100%;
			display: block;
		}
	}
}
</style>
