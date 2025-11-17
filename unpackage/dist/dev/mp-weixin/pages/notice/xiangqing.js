"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_mp_html2 = common_vendor.resolveComponent("mp-html");
  (_easycom_uni_tag2 + _easycom_uni_dateformat2 + _easycom_mp_html2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_mp_html = () => "../../uni_modules/mp-html/components/mp-html/mp-html.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_dateformat + _easycom_mp_html)();
}
const _sfc_main = {
  __name: "xiangqing",
  setup(__props) {
    const detail = common_vendor.ref();
    const noticeId = common_vendor.ref();
    const queryParams = common_vendor.ref({
      name: null
    });
    common_vendor.onLoad((e) => {
      const { name = null } = e;
      noticeId.value = e.id;
      queryParams.name = name;
      common_vendor.index.setNavigationBarTitle({
        title: name
      });
      getNoticeDetail();
    });
    const getNoticeDetail = async () => {
      const res = await api_apis.apiGetNoticeDetail({ id: noticeId.value });
      common_vendor.index.__f__("log", "at pages/notice/xiangqing.vue:44", res);
      detail.value = res.data;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: detail.value.select
      }, detail.value.select ? {
        b: common_vendor.p({
          inverted: true,
          text: "置顶",
          type: "error"
        })
      } : {}, {
        c: common_vendor.t(detail.value.title),
        d: common_vendor.t(detail.value.author),
        e: common_vendor.p({
          date: Date.now(),
          format: "yyyy-MM-dd hh:mm:ss"
        }),
        f: common_vendor.p({
          content: detail.value.content
        }),
        g: common_vendor.t(detail.value.view_count)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-536e642b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/notice/xiangqing.js.map
