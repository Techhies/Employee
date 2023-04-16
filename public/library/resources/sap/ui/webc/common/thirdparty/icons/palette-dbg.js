sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/config/Theme", "./v5/palette", "./v4/palette"], function (_exports, _Theme, _palette, _palette2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "accData", {
    enumerable: true,
    get: function () {
      return _palette.accData;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "ltr", {
    enumerable: true,
    get: function () {
      return _palette.ltr;
    }
  });
  _exports.pathData = void 0;
  const pathData = (0, _Theme.isThemeFamily)("sap_horizon") ? _palette.pathData : _palette2.pathData;
  _exports.pathData = pathData;
  var _default = "palette";
  _exports.default = _default;
});