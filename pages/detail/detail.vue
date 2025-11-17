<template>
	<view class="detail" v-if="currentInfo">
		<swiper circular :current="currentIndex" @change="onSwiper">
			<swiper-item v-for="(item, index) in classValue" :key="item._id">
				<image v-if="sawImage.includes(index)" @click="onDisabled" :src="item.picurl" mode=" aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="mask" v-if="isShow">
			<view class="goBack" @click="goBack" :style="{ top: getStatusBarHeight() + 'px' }">
				<uni-icons type="left" size="20" color="#fff"></uni-icons>
			</view>
			<view class="num">{{ currentIndex + 1 }} / {{ classValue.length }}</view>
			<view class="time">
				<uni-dateformat :date="Date.now()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="Date.now()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="info" @click="clickInfo">
					<uni-icons type="info" size="30"></uni-icons>
					<view class="text">信息</view>
				</view>
				<view class="score" @click="clickScore">
					<uni-icons type="star" size="30"></uni-icons>
					<view class="text">{{ currentInfo.score }}分</view>
				</view>
				<view class="down" @click="clickDownload">
					<uni-icons type="download" size="30"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>
		<!-- 信息弹出框 -->
		<template>
			<uni-popup ref="infoPopup" type="bottom">
				<view class="infoPopup">
					<view class="popHeader">
						<view></view>
						<view class="title">壁纸评分</view>
						<view class="close" @click="closeInfo">
							<uni-icons type="closeempty" size="18"></uni-icons>
						</view>
					</view>
					<!-- text中加selectable是文字可被长按选中 -->
					<scroll-view scroll-y>
						<view class="content">
							<view class="row">
								<view class="label">壁纸ID：</view>
								<text class="value" selectable>{{ currentInfo._id }}</text>
							</view>
							<view class="row">
								<view class="label">发布者：</view>
								<text class="value" selectable>{{ currentInfo.nickname }}</text>
							</view>
							<view class="row">
								<view class="label">评分：</view>
								<view class="value roteBox">
									<uni-rate readonly touchable value="4" size="16" />
									<text class="score">{{ currentInfo.score }}分</text>
								</view>
							</view>
							<view class="row">
								<view class="label">摘要：</view>
								<text class="value" selectable>{{ currentInfo.description }}</text>
							</view>
							<view class="row">
								<view class="label">标签：</view>
								<view class="value tabs">
									<view class="tab" v-for="item in currentInfo.tabs" :key="tab">{{ item }}</view>
								</view>
							</view>
							<view class="copyright">
								声明：本图片来自用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱4563215@qq.com，管理将删除侵犯壁纸，维护您的权益。
							</view>
							<view class="safe-area-inset-bottom"></view>
						</view>
					</scroll-view>
				</view>
			</uni-popup>
		</template>
		<!-- 评分弹出框 -->
		<template>
			<uni-popup ref="scorePopup" :is-mask-click="false">
				<view class="scorePopup">
					<view class="popHeader">
						<view></view>
						<view class="title">{{ isScore ? '已经评过分了~' : '壁纸评分' }}</view>
						<view class="close" @click="closeScore">
							<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
						</view>
					</view>
					<view class="content">
						<uni-rate v-model="userScore" allowHalf :disabled="isScore" disabled-color="#FFCA3E" />
						<text class="text">{{ userScore }}分</text>
					</view>
					<view class="footer">
						<!-- plain按钮是否镂空 -->
						<button @click="submit" :disabled="!userScore || isScore" type="default" size="mini" plain>确认评分</button>
					</view>
				</view>
			</uni-popup>
		</template>
	</view>
</template>

<script setup>
import { getStatusBarHeight } from '../../utils/system';
import { ref } from 'vue';
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { apiGetScore, apiwriteDownload, apiDetailWall } from '../../api/apis.js';
const currentId = ref(null);
const currentIndex = ref();
//壁纸信息
const currentInfo = ref([]);
//看过图片的索引值数组
const sawImage = ref([]);
onLoad(async (e) => {
	// console.log(e); //拿到每张详情图的id
	currentId.value = e.id;
	if (e.type == 'share') {
		const res = await apiDetailWall({ id: currentId.value });
		// console.log(res);
		classValue.value = res.data.map((item) => {
			return {
				...item,
				picurl: item.smallPicurl.replace('_small.webp', '.jpg')
			};
		});
	}
	currentIndex.value = classValue.value.findIndex((item) => {
		return item._id == currentId.value;
	});
	currentInfo.value = classValue.value[currentIndex.value];
	//将当前图片的索引值添加到数组中
	readImage();
});
const isShow = ref(true);
const infoPopup = ref();
const scorePopup = ref();
//点击确认时的分数
const userScore = ref(0);
//加上picurl属性的数组
const classValue = ref([]);
//是否评分
const isScore = ref(false);
//从缓存中取数据
const storageClassList = uni.getStorageSync('classList') || [];
classValue.value = storageClassList.map((item) => {
	return {
		...item,
		picurl: item.smallPicurl.replace('_small.webp', '.jpg')
	};
});
console.log(classValue.value);
//分享给好友
onShareAppMessage((e) => {
	return {
		title: '小茉莉壁纸',
		path: '/pages/detail/detail?id=' + currentId.value + '&type=share'
	};
});
//分享给朋友圈
onShareTimeline((e) => {
	return {
		title: '笨鸟',
		// 是参数不是path
		query: 'id=' + currentId.value
	};
});
//滑动是页数变化
const onSwiper = (e) => {
	console.log(e.detail.current); //这就是滑动时图片的索引
	currentIndex.value = e.detail.current;
	currentInfo.value = classValue.value[currentIndex.value];
	//将当前图片的索引值添加到数组中
	readImage();
};
//遮罩层显示隐藏
const onDisabled = () => {
	isShow.value = !isShow.value;
};
//信息弹出框
const clickInfo = () => {
	infoPopup.value.open();
};
//关闭信息弹出框
const closeInfo = () => {
	infoPopup.value.close();
};
//弹出评分
const clickScore = () => {
	if (currentInfo.value.userScore) {
		isScore.value = true;
		userScore.value = currentInfo.value.userScore;
	}
	scorePopup.value.open();
};
//关闭评分
const closeScore = () => {
	scorePopup.value.close();
	userScore.value = 0;
	isScore.value = false;
};
//评分提交按钮
const submit = async () => {
	// console.log(userScore.value); //点击确认时的分数
	uni.showLoading({
		title: '加载中...'
	});
	const { classid, _id: wallId } = currentInfo.value;
	const res = await apiGetScore({
		classid: currentInfo._id,
		wallId,
		userScore: userScore.value
	});
	uni.hideLoading();
	console.log(res);
	if (res.errCode === 0) {
		uni.showToast({
			title: '评分成功',
			icon: 'success'
		});
		classValue.value[currentIndex.value].userScore = userScore.value;
		uni.setStorageSync('classList', classValue.value);
		closeScore();
	}
};
//点击下载
const clickDownload = async () => {
	// #ifdef H5
	uni.showModal({
		content: '请长按保存壁纸',
		showCancel: false
	});
	// #endif
	// #ifndef H5
	try {
		uni.showLoading({
			title: '下载中....',
			mask: true
		});
		const { classid, _id: wallId } = currentInfo.value;
		const res = await apiwriteDownload({
			classid,
			wallId
		});
		// console.log(res);
		if (res.errCode !== 0) throw res;
		uni.getImageInfo({
			src: currentInfo.value.picurl,
			success: (res) => {
				uni.saveImageToPhotosAlbum({
					filePath: res.path,
					success: (res) => {
						uni.showToast({
							title: '保存成功',
							icon: 'none'
						});
					},
					fail: (err) => {
						if (err.errMsg == 'saveImageToPhotosAlbum:fail cancel') {
							uni.showToast({
								title: '保存失败，请重新下载',
								icon: 'none'
							});
							return;
						}
						uni.showModal({
							title: '提示',
							content: '请先授权相册权限',
							success: (res) => {
								if (res.confirm) {
									uni.openSetting({
										success: (setting) => {
											console.log(setting);
											if (setting.authSetting['scope.writePhotosAlbum']) {
												uni.showToast({
													title: '授权成功',
													icon: 'none'
												});
											} else {
												uni.showToast({
													title: '授权失败',
													icon: 'none'
												});
											}
										}
									});
								}
							}
						});
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			}
		});
	} catch (err) {
		uni.hideLoading();
	}
	// #endif
};
//返回上一页
const goBack = () => {
	uni.navigateBack({
		success: () => {},
		fail: (err) => {
			uni.reLaunch({
				url: '/pages/index/index'
			});
		}
	});
};
function readImage() {
	sawImage.value.push(
		currentIndex.value <= 0 ? classValue.value.length - 1 : currentIndex.value - 1,
		currentIndex.value,
		currentIndex.value >= classValue.value.length - 1 ? 0 : currentIndex.value + 1
	);
	//数组去重
	sawImage.value = [...new Set(sawImage.value)];
}
</script>

<style lang="scss" scoped>
.detail {
	width: 100%;
	height: 100vh;
	position: relative;
	swiper {
		width: 100%;
		height: 100%;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.mask {
		// 公共
		& > view {
			position: absolute;
			width: fit-content;
			left: 0;
			right: 0;
			margin: auto;
			color: #fff;
		}
		.goBack {
			top: 0;
			left: 60rpx;
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
			margin-left: 0;
			backdrop-filter: blur(10rpx);
			background: rgba(0, 0, 0, 0.6);
			border: 1px solid rgba(255, 255, 255, 0.3);
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.num {
			top: 10vh;

			border-radius: 40rpx;
			background: rgba(0, 0, 0, 0.5);
			padding: 10rpx 30rpx;
		}
		.time {
			top: calc(10vh + 80rpx);
			color: #fff;
			font-size: 140rpx;
			font-weight: 100;
		}
		.date {
			top: calc(10vh + 245rpx);
			font-weight: 100;
			font-size: 38rpx;
		}
		.footer {
			bottom: 10vh;
			background: rgba(255, 255, 255, 0.7);
			display: flex;
			align-items: center;
			justify-content: space-around;
			padding: 20rpx 40rpx;
			border-radius: 80rpx;
			.info,
			.score,
			.down {
				display: flex;
				flex-direction: column;
				align-items: center;
				.text {
					font-size: 33rpx;
					color: #333;
				}
			}
			.score {
				margin: 0 120rpx;
			}
			.info {
				margin-left: 20rpx;
			}
			.down {
				margin-right: 20rpx;
			}
		}
	}
	.popHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title {
			color: $text-font-color-2;
			font-size: 30rpx;
		}
		.close {
			padding: 6rpx;
			color: #666;
		}
	}
	.infoPopup {
		background: #fff;
		padding: 30rpx;
		border-radius: 30rpx 30rpx 0 0;
		overflow: hidden;
		scroll-view {
			max-height: 60vh;
			.content {
				.row {
					display: flex;
					padding: 15rpx 0;
					font-size: 32rpx;
					line-height: 1.7em;
					.label {
						color: $text-font-color-3;
						width: 160rpx;
						text-align: right;
						font-size: 30rpx;
					}
					.value {
						flex: 1;
						width: 0;
					}
					.roteBox {
						display: flex;
						align-items: center;
						.score {
							font-size: 26rpx;
							color: $text-font-color-2;
							margin-left: 10rpx;
						}
					}
					.tabs {
						display: flex;
						flex-wrap: wrap;
						.tab {
							border: 1px solid $brand-theme-color;
							color: $brand-theme-color;
							border-radius: 40rpx;
							padding: 10rpx 30rpx;
							font-size: 22rpx;
							line-height: 1em;
							margin: 0 10rpx 10rpx 0;
						}
					}
				}
				.copyright {
					font-size: 28rpx;
					padding: 20rpx;
					background: #f6f6f6;
					color: #666;
					border-radius: 10rpx;
					margin: 20rpx 0;
					line-height: 1.6em;
				}
			}
		}
	}
	.scorePopup {
		background: #fff;
		padding: 30rpx;
		width: 70vw;
		border-radius: 30rpx;
		.content {
			padding: 30rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			.text {
				color: #ffca3e;
				padding-left: 10rpx;
				width: 80rpx;
				text-align: right;
				line-height: 1em;
			}
		}
		.footer {
			padding: 10rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
