<template>
	<view class="userLayout pageBg" v-if="infoList">
		<view :style="{ height: getNavBarHeight() + 'px' }"></view>
		<view class="info">
			<view class="avatar">
				<image class="pic" src="/static/images/logo2.jpg" mode="aspectFill"></image>
			</view>
			<view class="ip">{{ infoList.IP }}</view>
			<view class="addr">来自于：{{ infoList.address.city }}</view>
		</view>
		<view class="section">
			<view class="list">
				<navigator url="/pages/classlist/classlist?name=我的下载&type=download" class="row">
					<view class="left">
						<uni-icons type="download-filled" size="25" color="#28b389"></uni-icons>
						<view class="text">我的下载</view>
					</view>
					<view class="right">
						<view class="text">{{ infoList.downloadSize }}</view>
						<uni-icons type="right" size="16" color="#aaa"></uni-icons>
					</view>
				</navigator>
				<navigator url="/pages/classlist/classlist?name=我的评分&type=score" class="row">
					<view class="left">
						<uni-icons type="star-filled" size="25" color="#28b389"></uni-icons>
						<view class="text">我的评分</view>
					</view>
					<view class="right">
						<view class="text">{{ infoList.scoreSize }}</view>
						<uni-icons type="right" size="16" color="#aaa"></uni-icons>
					</view>
				</navigator>
				<view class="row">
					<view class="left">
						<uni-icons type="chatboxes-filled" size="25" color="#28b389"></uni-icons>
						<view class="text">联系客服</view>
					</view>
					<view class="right">
						<uni-icons type="right" size="16" color="#aaa"></uni-icons>
					</view>
					<!-- #ifdef MP-->
					<button class="btn" open-type="contact">联系客服</button>
					<!-- #endif -->
					<!-- #ifndef MP -->
					<button class="btn" @click="onCall">拨打电话</button>
					<!-- #endif -->
				</view>
			</view>
		</view>
		<view class="section">
			<view class="list">
				<navigator url="/pages/notice/xiangqing?id=653507c6466d417a3718e94b&name=订阅更新" class="row">
					<view class="left">
						<uni-icons type="notification-filled" size="25" color="#28b389"></uni-icons>
						<view class="text">订阅更新</view>
					</view>
					<view class="right">
						<uni-icons type="right" size="16" color="#aaa"></uni-icons>
					</view>
				</navigator>
				<navigator url="/pages/notice/xiangqing?id=6536358ce0ec19c8d67fbe82&name=常见问题" class="row">
					<view class="left">
						<uni-icons type="flag-filled" size="25" color="#28b389"></uni-icons>
						<view class="text">常见问题</view>
					</view>
					<view class="right">
						<uni-icons type="right" size="16" color="#aaa"></uni-icons>
					</view>
				</navigator>
			</view>
		</view>
	</view>
	<view class="loadingLayout" v-else>
		<view :style="{ height: getNavBarHeight() + 'px' }"></view>
		<uni-load-more status="loading"></uni-load-more>
	</view>
</template>

<script setup>
// import { ref } from 'vue';
// const list = ref([
// 	{ id: 0, text: '我的下载', type: 'download-filled', num: '33' },
// 	{ id: 1, text: '我的评分', type: 'star-filled', num: '2' },
// 	{ id: 2, text: '联系客服', type: 'chatboxes-filled', num: '' }
// ]);
// const list2 = ref([
// 	{ id: 0, text: '订阅更新', type: 'notification-filled' },
// 	{ id: 1, text: '常见问题', type: 'flag-filled' }
// ]);
import { getNavBarHeight } from '@/utils/system.js';
import { apiGetUserInfo } from '@/api/apis.js';
import { ref } from 'vue';
import { info } from 'console';
const infoList = ref();
const onCall = () => {
	uni.makePhoneCall({
		phoneNumber: '117'
	});
};
const getUserInfo = async () => {
	const res = await apiGetUserInfo();
	// console.log(res);
	infoList.value = res.data;
};
getUserInfo();
</script>

<style lang="scss" scoped>
.userLayout {
	padding: 50rpx 0 0;
	.info {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin: 0 0 20rpx;
		.avatar {
			.pic {
				width: 170rpx;
				height: 170rpx;
				border-radius: 50%;
			}
		}
		.ip {
			font-size: 40rpx;
			color: #333;
			margin: 15rpx 0;
		}
		.addr {
			font-size: 28rpx;
			color: gray;
			margin-bottom: 40rpx;
		}
	}
	.section {
		background-color: #fff;
		width: 690rpx;
		margin: 50rpx auto;
		border-radius: 10rpx;
		border: 1px solid #eee;
		box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.1);
		.list {
			.row {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 30rpx;
				height: 100rpx;
				border-bottom: 1px solid #eee;
				position: relative;
				&:last-child {
					border-bottom: 0;
				}
				.left {
					display: flex;
					align-items: center;
					justify-content: center;
					.text {
						margin-left: 15rpx;
						font-size: 30rpx;
					}
				}
				.right {
					display: flex;
					align-items: center;
					justify-content: center;
					.text {
						color: #888;
						font-size: 30rpx;
						margin-right: 10rpx;
					}
				}
				.btn {
					height: 100rpx;
					position: absolute;
					left: 0;
					width: 100%;
					opacity: 0;
				}
			}
		}
	}
}
</style>
