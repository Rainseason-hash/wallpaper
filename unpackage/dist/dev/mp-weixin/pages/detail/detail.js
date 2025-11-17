"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _component_template = common_vendor.resolveComponent("template");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2 + _component_template)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const currentId = common_vendor.ref(null);
    const currentIndex = common_vendor.ref();
    const currentInfo = common_vendor.ref([]);
    const sawImage = common_vendor.ref([]);
    common_vendor.onLoad(async (e) => {
      currentId.value = e.id;
      if (e.type == "share") {
        const res = await api_apis.apiDetailWall({ id: currentId.value });
        classValue.value = res.data.map((item) => {
          return {
            ...item,
            picurl: item.smallPicurl.replace("_small.webp", ".jpg")
          };
        });
      }
      currentIndex.value = classValue.value.findIndex((item) => {
        return item._id == currentId.value;
      });
      currentInfo.value = classValue.value[currentIndex.value];
      readImage();
    });
    const isShow = common_vendor.ref(true);
    const infoPopup = common_vendor.ref();
    const scorePopup = common_vendor.ref();
    const userScore = common_vendor.ref(0);
    const classValue = common_vendor.ref([]);
    const isScore = common_vendor.ref(false);
    const storageClassList = common_vendor.index.getStorageSync("classList") || [];
    classValue.value = storageClassList.map((item) => {
      return {
        ...item,
        picurl: item.smallPicurl.replace("_small.webp", ".jpg")
      };
    });
    common_vendor.index.__f__("log", "at pages/detail/detail.vue:155", classValue.value);
    common_vendor.onShareAppMessage((e) => {
      return {
        title: "小茉莉壁纸",
        path: "/pages/detail/detail?id=" + currentId.value + "&type=share"
      };
    });
    common_vendor.onShareTimeline((e) => {
      return {
        title: "笨鸟",
        // 是参数不是path
        query: "id=" + currentId.value
      };
    });
    const onSwiper = (e) => {
      common_vendor.index.__f__("log", "at pages/detail/detail.vue:173", e.detail.current);
      currentIndex.value = e.detail.current;
      currentInfo.value = classValue.value[currentIndex.value];
      readImage();
    };
    const onDisabled = () => {
      isShow.value = !isShow.value;
    };
    const clickInfo = () => {
      infoPopup.value.open();
    };
    const closeInfo = () => {
      infoPopup.value.close();
    };
    const clickScore = () => {
      if (currentInfo.value.userScore) {
        isScore.value = true;
        userScore.value = currentInfo.value.userScore;
      }
      scorePopup.value.open();
    };
    const closeScore = () => {
      scorePopup.value.close();
      userScore.value = 0;
      isScore.value = false;
    };
    const submit = async () => {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      const { classid, _id: wallId } = currentInfo.value;
      const res = await api_apis.apiGetScore({
        classid: currentInfo._id,
        wallId,
        userScore: userScore.value
      });
      common_vendor.index.hideLoading();
      common_vendor.index.__f__("log", "at pages/detail/detail.vue:218", res);
      if (res.errCode === 0) {
        common_vendor.index.showToast({
          title: "评分成功",
          icon: "success"
        });
        classValue.value[currentIndex.value].userScore = userScore.value;
        common_vendor.index.setStorageSync("classList", classValue.value);
        closeScore();
      }
    };
    const clickDownload = async () => {
      try {
        common_vendor.index.showLoading({
          title: "下载中....",
          mask: true
        });
        const { classid, _id: wallId } = currentInfo.value;
        const res = await api_apis.apiwriteDownload({
          classid,
          wallId
        });
        if (res.errCode !== 0)
          throw res;
        common_vendor.index.getImageInfo({
          src: currentInfo.value.picurl,
          success: (res2) => {
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: res2.path,
              success: (res3) => {
                common_vendor.index.showToast({
                  title: "保存成功",
                  icon: "none"
                });
              },
              fail: (err) => {
                if (err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
                  common_vendor.index.showToast({
                    title: "保存失败，请重新下载",
                    icon: "none"
                  });
                  return;
                }
                common_vendor.index.showModal({
                  title: "提示",
                  content: "请先授权相册权限",
                  success: (res3) => {
                    if (res3.confirm) {
                      common_vendor.index.openSetting({
                        success: (setting) => {
                          common_vendor.index.__f__("log", "at pages/detail/detail.vue:276", setting);
                          if (setting.authSetting["scope.writePhotosAlbum"]) {
                            common_vendor.index.showToast({
                              title: "授权成功",
                              icon: "none"
                            });
                          } else {
                            common_vendor.index.showToast({
                              title: "授权失败",
                              icon: "none"
                            });
                          }
                        }
                      });
                    }
                  }
                });
              },
              complete: () => {
                common_vendor.index.hideLoading();
              }
            });
          }
        });
      } catch (err) {
        common_vendor.index.hideLoading();
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack({
        success: () => {
        },
        fail: (err) => {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
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
      sawImage.value = [...new Set(sawImage.value)];
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: currentInfo.value
      }, currentInfo.value ? common_vendor.e({
        b: common_vendor.f(classValue.value, (item, index, i0) => {
          return common_vendor.e({
            a: sawImage.value.includes(index)
          }, sawImage.value.includes(index) ? {
            b: common_vendor.o(onDisabled, item._id),
            c: item.picurl
          } : {}, {
            d: item._id
          });
        }),
        c: currentIndex.value,
        d: common_vendor.o(onSwiper),
        e: isShow.value
      }, isShow.value ? {
        f: common_vendor.p({
          type: "left",
          size: "20",
          color: "#fff"
        }),
        g: common_vendor.o(goBack),
        h: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        i: common_vendor.t(currentIndex.value + 1),
        j: common_vendor.t(classValue.value.length),
        k: common_vendor.p({
          date: Date.now(),
          format: "hh:mm"
        }),
        l: common_vendor.p({
          date: Date.now(),
          format: "MM月dd日"
        }),
        m: common_vendor.p({
          type: "info",
          size: "30"
        }),
        n: common_vendor.o(clickInfo),
        o: common_vendor.p({
          type: "star",
          size: "30"
        }),
        p: common_vendor.t(currentInfo.value.score),
        q: common_vendor.o(clickScore),
        r: common_vendor.p({
          type: "download",
          size: "30"
        }),
        s: common_vendor.o(clickDownload)
      } : {}, {
        t: common_vendor.p({
          type: "closeempty",
          size: "18"
        }),
        v: common_vendor.o(closeInfo),
        w: common_vendor.t(currentInfo.value._id),
        x: common_vendor.t(currentInfo.value.nickname),
        y: common_vendor.p({
          readonly: true,
          touchable: true,
          value: "4",
          size: "16"
        }),
        z: common_vendor.t(currentInfo.value.score),
        A: common_vendor.t(currentInfo.value.description),
        B: common_vendor.f(currentInfo.value.tabs, (item, k0, i0) => {
          return {
            a: common_vendor.t(item)
          };
        }),
        C: _ctx.tab,
        D: common_vendor.sr(infoPopup, "eca06f3c-6", {
          "k": "infoPopup"
        }),
        E: common_vendor.p({
          type: "bottom"
        }),
        F: common_vendor.t(isScore.value ? "已经评过分了~" : "壁纸评分"),
        G: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        H: common_vendor.o(closeScore),
        I: common_vendor.o(($event) => userScore.value = $event),
        J: common_vendor.p({
          allowHalf: true,
          disabled: isScore.value,
          ["disabled-color"]: "#FFCA3E",
          modelValue: userScore.value
        }),
        K: common_vendor.t(userScore.value),
        L: common_vendor.o(submit),
        M: !userScore.value || isScore.value,
        N: common_vendor.sr(scorePopup, "eca06f3c-9", {
          "k": "scorePopup"
        }),
        O: common_vendor.p({
          ["is-mask-click"]: false
        })
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eca06f3c"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/detail/detail.js.map
