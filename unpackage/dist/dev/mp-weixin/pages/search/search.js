"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uv_empty2 = common_vendor.resolveComponent("uv-empty");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2 + _easycom_uv_empty2 + _easycom_uni_load_more2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uv_empty = () => "../../uni_modules/uv-empty/components/uv-empty/uv-empty.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons + _easycom_uv_empty + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const noData = common_vendor.ref(false);
    const noSearch = common_vendor.ref(false);
    const queryParams = common_vendor.ref({
      pageNum: 1,
      pageSize: 12,
      keyword: ""
      //搜索关键字
    });
    const historyList = common_vendor.ref(common_vendor.index.getStorageSync("historyList") || []);
    common_vendor.ref([]);
    const classList = common_vendor.ref([]);
    const onSearch = () => {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      historyList.value = [.../* @__PURE__ */ new Set([queryParams.value.keyword, ...historyList.value])].slice(0, 10);
      common_vendor.index.setStorageSync("historyList", historyList.value);
      initParams(queryParams.value.keyword);
      getSearch();
    };
    const clickTab = (value) => {
      initParams(value);
      onSearch();
    };
    const getSearch = async () => {
      try {
        const res = await api_apis.apiGetSearchData(queryParams.value);
        classList.value = [...classList.value, ...res.data];
        common_vendor.index.setStorageSync("classList", classList.value);
        if (queryParams.value.pageSize > res.data.length)
          noData.value = true;
        if (res.data.length == 0 && classList.value.length == 0)
          noSearch.value = true;
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    const removeList = () => {
      common_vendor.index.showModal({
        title: "是否清空历史记录",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("historyList");
            historyList.value = [];
          }
        }
      });
    };
    const initParams = (value = "") => {
      classList.value = [];
      noData.value = false;
      noSearch.value = false;
      queryParams.value = {
        pageNum: 1,
        pageSize: 12,
        keyword: value || ""
        //搜索关键字
      };
    };
    const onClear = () => {
      initParams();
    };
    common_vendor.onReachBottom(() => {
      queryParams.value.pageNum++;
      getSearch();
    });
    common_vendor.onUnload(() => {
      common_vendor.index.removeStorageSync("classList", classList.value);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onSearch),
        b: common_vendor.o(onClear),
        c: common_vendor.o(onClear),
        d: common_vendor.o(($event) => queryParams.value.keyword = $event),
        e: common_vendor.p({
          focus: true,
          radius: "5",
          placeholder: "请输入商品",
          clearButton: "auto",
          cancelButton: "always",
          modelValue: queryParams.value.keyword
        }),
        f: !classList.value.length
      }, !classList.value.length ? common_vendor.e({
        g: historyList.value.length
      }, historyList.value.length ? {
        h: common_vendor.o(removeList),
        i: common_vendor.p({
          type: "trash-filled",
          size: "26",
          color: "gray"
        }),
        j: common_vendor.f(historyList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: item._id,
            c: common_vendor.o(($event) => clickTab(item), item._id)
          };
        })
      } : {}, {
        k: common_vendor.f(5, (item, index, i0) => {
          return {
            a: index,
            b: common_vendor.o(($event) => clickTab(item), index)
          };
        })
      }) : {}, {
        l: noSearch.value
      }, noSearch.value ? {
        m: common_vendor.p({
          mode: "search"
        })
      } : common_vendor.e({
        n: common_vendor.f(classList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: `/pages/detail/detail?id=${item._id}`,
            c: item._id
          };
        }),
        o: noData.value || classList.value.length
      }, noData.value || classList.value.length ? {
        p: common_vendor.p({
          status: noData.value ? "noMore" : "loading"
        })
      } : {}));
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/search/search.js.map
