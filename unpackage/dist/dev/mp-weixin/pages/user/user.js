"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_system = require("../../utils/system.js");
const api_apis = require("../../api/apis.js");
new Proxy({}, {
  get(_, key) {
    throw new Error(`Module "console" has been externalized for browser compatibility. Cannot access "console.${key}" in client code.  See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
  }
});
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_icons2 + _easycom_uni_load_more2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const infoList = common_vendor.ref();
    const getUserInfo = async () => {
      const res = await api_apis.apiGetUserInfo();
      infoList.value = res.data;
    };
    getUserInfo();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: infoList.value
      }, infoList.value ? {
        b: common_vendor.unref(utils_system.getNavBarHeight)() + "px",
        c: common_assets._imports_0,
        d: common_vendor.t(infoList.value.IP),
        e: common_vendor.t(infoList.value.address.city),
        f: common_vendor.p({
          type: "download-filled",
          size: "25",
          color: "#28b389"
        }),
        g: common_vendor.t(infoList.value.downloadSize),
        h: common_vendor.p({
          type: "right",
          size: "16",
          color: "#aaa"
        }),
        i: common_vendor.p({
          type: "star-filled",
          size: "25",
          color: "#28b389"
        }),
        j: common_vendor.t(infoList.value.scoreSize),
        k: common_vendor.p({
          type: "right",
          size: "16",
          color: "#aaa"
        }),
        l: common_vendor.p({
          type: "chatboxes-filled",
          size: "25",
          color: "#28b389"
        }),
        m: common_vendor.p({
          type: "right",
          size: "16",
          color: "#aaa"
        }),
        n: common_vendor.p({
          type: "notification-filled",
          size: "25",
          color: "#28b389"
        }),
        o: common_vendor.p({
          type: "right",
          size: "16",
          color: "#aaa"
        }),
        p: common_vendor.p({
          type: "flag-filled",
          size: "25",
          color: "#28b389"
        }),
        q: common_vendor.p({
          type: "right",
          size: "16",
          color: "#aaa"
        })
      } : {
        r: common_vendor.unref(utils_system.getNavBarHeight)() + "px",
        s: common_vendor.p({
          status: "loading"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/user.js.map
