var EventBus = new /** @class */ ((function () {
  function class_1() {
    var _this = this;
    this.listeners = {};
    this.addEventListener = function (type, callback) {
      if (typeof _this.listeners[type] != 'undefined') {
        _this.listeners[type].push(callback);
      } else {
        _this.listeners[type] = [callback];
      }
    };
    this.removeEventListener = function (type, callback) {
      if (typeof _this.listeners[type] != 'undefined') {
        _this.listeners[type] = _this.listeners[type].filter(function (cb) {
          return cb !== callback;
        });
      }
    };
    this.dispatch = function (type) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      if (typeof _this.listeners[type] != 'undefined') {
        _this.listeners[type].forEach(function (cb) {
          cb.apply(void 0, args);
        });
      }
    };
  }
  return class_1;
})())();
