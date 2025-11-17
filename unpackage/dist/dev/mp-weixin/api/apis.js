"use strict";
const utils_request = require("../utils/request.js");
function apiGetBanner() {
  return utils_request.request({
    url: "/homeBanner"
  });
}
function apiGetDayRandom() {
  return utils_request.request({
    url: "/randomWall"
  });
}
function apiGetNotice(data = {}) {
  return utils_request.request({
    url: "/wallNewsList",
    data
  });
}
function apiGetClassify(data = {}) {
  return utils_request.request({
    url: "/classify",
    data
  });
}
const apiGetClassList = (data = {}) => utils_request.request({
  url: "/wallList",
  data
});
const apiGetScore = (data = {}) => utils_request.request({
  url: "/setupScore",
  data
});
const apiwriteDownload = (data = {}) => utils_request.request({
  url: "/downloadWall",
  data
});
const apiDetailWall = (data = {}) => utils_request.request({
  url: "/detailWall",
  data
});
const apiGetUserInfo = () => utils_request.request({
  url: "/userInfo"
});
const apiGetHistoryList = (data = {}) => utils_request.request({
  url: "/userWallList",
  data
});
const apiGetNoticeDetail = (data = {}) => utils_request.request({
  url: "/wallNewsDetail",
  data
});
const apiGetSearchData = (data = {}) => utils_request.request({
  url: "/searchWall",
  data
});
exports.apiDetailWall = apiDetailWall;
exports.apiGetBanner = apiGetBanner;
exports.apiGetClassList = apiGetClassList;
exports.apiGetClassify = apiGetClassify;
exports.apiGetDayRandom = apiGetDayRandom;
exports.apiGetHistoryList = apiGetHistoryList;
exports.apiGetNotice = apiGetNotice;
exports.apiGetNoticeDetail = apiGetNoticeDetail;
exports.apiGetScore = apiGetScore;
exports.apiGetSearchData = apiGetSearchData;
exports.apiGetUserInfo = apiGetUserInfo;
exports.apiwriteDownload = apiwriteDownload;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/apis.js.map
