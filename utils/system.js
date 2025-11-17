const SYSTEM_INFO = uni.getSystemInfoSync();
export const getStatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 15;
export const getTitleBarHeight = () => {
	if (uni.getMenuButtonBoundingClientRect) {
		let {
			top,
			height
		} = uni.getMenuButtonBoundingClientRect();
		return height + (top - getStatusBarHeight()) * 2
	} else {
		return 40
	}
}
export const getNavBarHeight = () => getStatusBarHeight() + getTitleBarHeight()
//针对抖音
export const getLeftIcon = () => {
	// tt是头条的意思
	// #ifdef MP-TOUTIAO
	let {
		leftIcon: {
			left,
			width
		}
	} = tt.getCustomButtomBoundingClientRect()
	return left + parseInt(width)
	// #endif

	// #ifndef MP-TOUTIAO
	return 0
	// #endif
}