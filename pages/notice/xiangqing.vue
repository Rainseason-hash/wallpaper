<template>
	<view class="noticeLayout">
		<view class="title">
			<view class="tag" v-if="detail.select">
				<uni-tag class="tag" inverted text="置顶" type="error"></uni-tag>
			</view>
			<view class="font">{{ detail.title }}</view>
		</view>
		<view class="info">
			<view class="item">{{ detail.author }}</view>
			<view class="item">
				<uni-dateformat :date="Date.now()" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>
		</view>
		<view class="content">
			<!-- 富文本，将解析html标签,rich-text是官方的，mp-html是富文本插件 -->
			<!-- <rich-text :nodes="detail.content"></rich-text> -->
			<mp-html :content="detail.content"></mp-html>
		</view>
		<view class="count">阅读量：{{ detail.view_count }}</view>
	</view>
</template>

<script setup>
import { apiGetNoticeDetail } from '@/api/apis.js';
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
const detail = ref();
const noticeId = ref();
const queryParams = ref({
	name: null
});
onLoad((e) => {
	const { name = null } = e;
	noticeId.value = e.id;
	queryParams.name = name;
	uni.setNavigationBarTitle({
		title: name
	});
	getNoticeDetail();
});
const getNoticeDetail = async () => {
	const res = await apiGetNoticeDetail({ id: noticeId.value });
	console.log(res);
	detail.value = res.data;
};
</script>

<style lang="scss" scoped>
.noticeLayout {
	padding: 30rpx;
	.title {
		font-size: 40rpx;
		color: #111;
		line-height: 1.6em;
		padding-bottom: 30rpx;
		display: flex;
		.tag {
			transform: scale(0.8);
			transform-origin: left center;
			flex-shrink: 0;
		}
		.font {
			padding-left: 6rpx;
		}
	}
	.info {
		display: flex;
		align-items: center;
		color: #999;
		font-size: 28rpx;
		.item {
			padding-right: 20rpx;
		}
	}
	.content {
		padding: 50rpx 0;
	}
	.count {
		color: #999;
		font-size: 28rpx;
	}
}
</style>
