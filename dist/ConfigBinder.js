"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConfigBinder = function () {
    function ConfigBinder(binding) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, ConfigBinder);

        this._binding = binding;

        this._autoJoin = options.autoJoin === undefined ? " " : options.autoJoin;
    }

    _createClass(ConfigBinder, [{
        key: "convert",
        value: function convert(cfg) {
            var _this = this;

            var res = {};

            Object.getOwnPropertyNames(this._binding).map(function (property) {
                res[property] = {};

                Object.getOwnPropertyNames(_this._binding[property]).forEach(function (subProperty) {
                    var attributes = _this._binding[property][subProperty].map(function (attr) {
                        return _this._convertAttributes(attr, cfg);
                    });
                    if (_this._autoJoin != null) {
                        attributes = attributes.filter(function (p) {
                            return p !== "";
                        }).join(_this._autoJoin);
                    }

                    res[property][subProperty] = attributes;
                });
            });

            return res;
        }
    }, {
        key: "_convertAttributes",
        value: function _convertAttributes(attr, cfg) {
            if ((typeof attr === "undefined" ? "undefined" : _typeof(attr)) !== "object") return attr;

            // Get value of the attribute in the config
            var value = cfg[attr.attr];

            // Get binding object if exists
            var binding = attr.binding;

            if (binding != null) {
                if (binding[value] != null) {
                    return binding[value];
                } else if (binding["*"] != null) {
                    return binding["*"];
                } else {
                    return "";
                }
            } else {
                return value;
            }
        }
    }]);

    return ConfigBinder;
}();
