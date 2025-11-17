<template>
	<view class="themeItem">
		<navigator :url="'/pages/classlist/classlist?id=' + item._id + '&name=' + item.name" class="nav" v-if="!isMore">
			<image class="pic" :src="item.picurl" mode="aspectFill"></image>
			<view class="mask">{{ item.name }}</view>
			<view class="tag" v-if="compareTimestamp(item.updateTime)">{{ compareTimestamp(item.updateTime) }}前更新</view>
		</navigator>
		<navigator url="/pages/classlist/classlist" open-type="reLaunch" class="nav more" v-if="isMore">
			<image class="pic" src="../../common/images/more.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="30" color="#fff"></uni-icons>
				<view class="text">更多</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
import { compareTimestamp } from '@/utils/common.js';
defineProps({
	isMore: {
		type: Boolean,
		default: false
	},
	item: {
		type: Object,
		default() {
			return {
				name: '默认名称',
				picurl: '../../common/images/classify.jpg',
				updateTime: Date.now()
			};
		}
	}
});
</script>

<style lang="scss" scoped>
.themeItem {
	.nav {
		position: relative;
		height: 340rpx;
		border-radius: 10rpx;
		overflow: hidden;
		.pic {
			width: 100%;
			height: 100%;
		}
		.mask {
			width: 100%;
			height: 70rpx;
			position: absolute;
			bottom: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.2);
			backdrop-filter: blur(10rpx);
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30rpx;
		}
		.tag {
			position: absolute;
			top: 0;
			left: 0;
			background-color: orange;
			color: #fff;
			font-size: 18rpx;
			padding: 10rpx 10rpx;
			border-radius: 0 0 15rpx 0;
			transform-origin: left top;
			transform: scale(0.8);
			background: rgba(250, 129, 98, 0.9);
			backdrop-filter: blur(10rpx);
		}
	}
	.nav.more {
		.mask {
			width: 100%;
			height: 100%;
			flex-direction: column;
		}
		.text {
			font-size: 28rpx;
		}
	}
}
</style>
