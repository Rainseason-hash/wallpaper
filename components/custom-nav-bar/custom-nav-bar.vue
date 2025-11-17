<template>
	<view class="layout">
		<view class="navbar">
			<view class="statuBar" :style="{ height: statusBarHeight + 'px' }"></view>
			<view class="titleBar" :style="{ height: getTitleBarHeight() + 'px', marginLeft: getLeftIcon() + 'px' }">
				<view class="title">{{ title }}</view>
				<navigator url="/pages/search/search" class="search">
					<uni-icons class="icons" type="search" size="18" color="#888"></uni-icons>
					<text class="text">搜索</text>
				</navigator>
			</view>
		</view>
		<view class="fill" :style="{ height: getNavBarHeight() + 'px' }"></view>
	</view>
</template>

<script setup>
//系统信息
import { ref } from 'vue';
import { getStatusBarHeight, getTitleBarHeight, getNavBarHeight, getLeftIcon } from '@/utils/system.js';
let statusBarHeight = ref(getStatusBarHeight());
defineProps({
	title: {
		type: String,
		default: '壁纸'
	}
});
</script>

<style lang="scss" acoped>
.layout {
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 2;
		background: linear-gradient(to bottom, transparent, #fff 400rpx), linear-gradient(to right, #beecd8 20%, #f4e2d8);
		.statuBar {
		}
		.titleBar {
			display: flex;
			padding: 0 30rpx;
			align-items: center;
			.title {
				font-size: 46rpx;
				font-weight: 700;
				color: $text-font-color-1;
			}
			.search {
				width: 220rpx;
				height: 50rpx;
				border-radius: 60rpx;
				background: rgba(255, 255, 255, 0.4);
				border: 1px solid #fff;
				margin-left: 30rpx;
				color: #999;
				font-size: 28rpx;
				display: flex;
				align-items: center;
				.icons {
					margin-left: 5rpx;
				}
				.text {
				}
			}
		}
	}
	.fill {
	}
}
</style>
