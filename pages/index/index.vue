<template>
	<view class="layout pageBg">
		<custom-nav-bar title="推荐"></custom-nav-bar>
		<view class="banner">
			<swiper indicator-dots autoplay indicator-color="rgba(255,255,255,0.7)" indicator-active-color="#fff" circular>
				<swiper-item v-for="item in bannerList" :key="item._id">
					<navigator v-if="item.target == 'miniProgram'" class="link" target="miniProgram" :url="item.url" :app-id="item.appid">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>

					<navigator v-else class="link" :url="`/pages/classlist/classlist?${item.url}`">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="23" color="#28b389"></uni-icons>
				<text class="text">公告</text>
			</view>
			<view class="center">
				<swiper autoplay circular interval="1500" duration="300" vertical>
					<swiper-item v-for="item in noticeList" :key="item._id">
						<navigator :url="'/pages/notice/xiangqing?id=' + item._id">{{ item.title }}</navigator>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="16" color="#333"></uni-icons>
			</view>
		</view>
		<view class="select">
			<common-title>
				<template #name>每日推荐</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="20" color="#28b389"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd"></uni-dateformat>
						</view>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x>
					<view class="box" v-for="item in randomList" :key="item._id" @click="goDetail(item._id)">
						<image :src="item.smallPicurl" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="theme">
			<common-title>
				<template #name>专题精选</template>
				<template #custom>
					<navigator url="/pages/classify/classify" open-type="reLaunch" class="more">More+</navigator>
				</template>
			</common-title>
			<view class="content">
				<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
				<theme-item :isMore="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { apiGetBanner, apiGetDayRandom, apiGetNotice, apiGetClassify } from '@/api/apis.js';
const bannerList = ref([]);
const randomList = ref([]);
const noticeList = ref([]);
const classifyList = ref([]);
//跳转至详情页
const goDetail = (id) => {
	uni.setStorageSync('classList', randomList.value);
	uni.navigateTo({
		url: '/pages/detail/detail?id=' + id
	});
};
//分享给好友
onShareAppMessage((e) => {
	return {
		title: '小茉莉壁纸',
		path: '/pages/index/index'
	};
});
//分享给朋友圈
onShareTimeline((e) => {
	return {
		title: '笨鸟',
		imageUrl: '/static/images/logo2.jpg'
	};
});
const getBanner = async () => {
	const res = await apiGetBanner();
	bannerList.value = res.data;
	console.log(res);
};
//随机九张图
const getRandomImg = async () => {
	const res = await apiGetDayRandom();
	randomList.value = res.data;
};
//获取公告列表
const getNotice = async () => {
	const res2 = await apiGetNotice({ select: true });
	noticeList.value = res2.data;
};
//获取专题精选
const getClassify = async () => {
	const res = await apiGetClassify({ select: true });
	// console.log(res);
	classifyList.value = res.data;
};

getBanner();
getRandomImg();
getNotice();
getClassify();
</script>

<style lang="scss" scoped>
.layout {
	.banner {
		width: 750rpx;
		padding: 30rpx 0;
		swiper {
			width: 750rpx;
			height: 340rpx;
			swiper-item {
				width: 100%;
				height: 100%;
				padding: 0 30rpx;
				.link {
					width: 100%;
					height: 100%;
					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
			}
		}
	}
	.notice {
		display: flex;
		width: 690rpx;
		height: 80rpx;
		margin: 0 auto;
		background-color: #f9f9f9;
		border-radius: 80rpx;
		line-height: 80rpx;
		.left {
			width: 140rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			vertical-align: middle;
			.text {
				color: #28b389;
				font-weight: 600;
				font-size: 28rpx;
			}
		}
		.center {
			flex: 1;
			swiper {
				height: 100%;
				swiper-item {
					height: 100%;
					font-size: 30rpx;
					color: #666;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
		.right {
			width: 70rpx;
		}
	}
	.select {
		padding-top: 50rpx;
		.date {
			display: flex;
			color: $brand-theme-color;
			align-items: center;
			vertical-align: middle;
			.text {
				margin-left: 10rpx;
			}
		}
		.content {
			width: 720rpx;
			margin-left: 30rpx;
			margin-top: 30rpx;
			scroll-view {
				white-space: nowrap;
				.box {
					width: 200rpx;
					height: 430rpx;
					display: inline-block;
					margin-right: 15rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
				.box:last-child {
					margin-right: 30rpx;
				}
			}
		}
	}
	.theme {
		padding-top: 50rpx;
		.more {
			color: #888;
			font-size: 30rpx;
		}
		.content {
			margin-top: 30rpx;
			padding: 0 30rpx;
			display: grid;
			gap: 10rpx;
			grid-template-columns: repeat(3, 1fr);
		}
	}
}
</style>
