'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _textField = require('material-ui/lib/text-field');

var _textField2 = _interopRequireDefault(_textField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CurrencyField = function (_Component) {
    _inherits(CurrencyField, _Component);

    function CurrencyField(props) {
        _classCallCheck(this, CurrencyField);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CurrencyField).call(this, props));

        _this.onInputType = _this.onInputType.bind(_this);
        _this.formatRawValue = _this.formatRawValue.bind(_this);
        _this.parseRawValue = _this.parseRawValue.bind(_this);
        _this.defaultConverter = _this.defaultConverter.bind(_this);
        _this.state = {
            rawValue: _this.props.value
        };
        return _this;
    }

    _createClass(CurrencyField, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.notifyParentWithRawValue(this.state.rawValue);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.value) {
                this.setState({ rawValue: nextProps.value });
            }
        }
    }, {
        key: 'onInputType',
        value: function onInputType(event) {
            var input = event.target.value;

            var rawValue = this.parseRawValue(input);
            if (!rawValue) {
                rawValue = 0;
            }

            this.notifyParentWithRawValue(rawValue);

            this.setState({ rawValue: rawValue });
        }
    }, {
        key: 'notifyParentWithRawValue',
        value: function notifyParentWithRawValue(rawValue) {
            var display = this.formatRawValue(rawValue);
            var converter = this.props.converter || this.defaultConverter;
            this.props.onChange(converter(rawValue), display);
        }
    }, {
        key: 'parseRawValue',
        value: function parseRawValue(displayedValue) {
            var value = displayedValue.replace(/[^0-9]/g, '');

            return parseFloat(value);
        }
    }, {
        key: 'formatRawValue',
        value: function formatRawValue(rawValue) {
            var minChars = '0'.length + this.props.precision;

            var result = '' + rawValue;

            if (result.length < minChars) {
                var numbers = minChars - result.length;
                var leftZeroPad = new String(0).repeat(numbers);
                result = '' + leftZeroPad + result;
            }

            var beforeSeparator = result.slice(0, result.length - this.props.precision);
            var afterSeparator = result.slice(result.length - this.props.precision);

            if (beforeSeparator.length > 3) {
                var chars = beforeSeparator.split('').reverse();
                var withDots = '';

                for (var i = chars.length - 1; i >= 0; i--) {
                    var char = chars[i];
                    var dot = i % 3 === 0 ? this.props.delimiter : '';
                    withDots = '' + withDots + char + dot;
                }

                withDots = withDots.substring(0, withDots.length - 1);
                beforeSeparator = withDots;
            }

            result = beforeSeparator + this.props.separator + afterSeparator;

            if (this.props.unit) {
                result = this.props.unit + ' ' + result;
            }

            return result;
        }
    }, {
        key: 'defaultConverter',
        value: function defaultConverter(val) {
            var precision = this.props.precision;

            var raw = val.toString();

            if (Number.isNaN(parseFloat(raw))) {
                return 0;
            }

            if (!raw.length) {
                return parseFloat(raw);
            }

            if (precision >= raw.length) {
                return parseFloat(raw);
            }

            var prefix = raw.slice(0, raw.length - precision);
            var sufix = raw.slice(raw.length - precision, raw.length);
            return parseFloat(prefix + '.' + sufix);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_textField2.default, _extends({}, this.props, {
                onChange: this.onInputType,
                value: this.formatRawValue(this.state.rawValue) }));
        }
    }]);

    return CurrencyField;
}(_react.Component);

CurrencyField.propTypes = {
    id: _react2.default.PropTypes.string,
    delimiter: _react2.default.PropTypes.string,
    onChange: _react2.default.PropTypes.func,
    precision: _react2.default.PropTypes.number,
    separator: _react2.default.PropTypes.string,
    unit: _react2.default.PropTypes.string,
    value: _react2.default.PropTypes.number,
    converter: _react2.default.PropTypes.func
};

CurrencyField.defaultProps = {
    value: 0,
    precision: 2,
    separator: '.',
    delimiter: ',',
    unit: '',
    onChange: function onChange() {}
};

exports.default = CurrencyField;