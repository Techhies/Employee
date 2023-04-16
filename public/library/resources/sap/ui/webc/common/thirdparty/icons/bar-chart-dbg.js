sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/config/Theme", "./v5/bar-chart", "./v4/bar-chart"], function (_exports, _Theme, _barChart, _barChart2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "accData", {
    enumerable: true,
    get: function () {
      return _barChart.accData;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "ltr", {
    enumerable: true,
    get: function () {
      return _barChart.ltr;
    }
  });
  _exports.pathData = void 0;
  const pathData = (0, _Theme.isThemeFamily)("sap_horizon") ? _barChart.pathData : _barChart2.pathData;
  _exports.pathData = pathData;
  var _default = "bar-chart";
  _exports.default = _default;
});