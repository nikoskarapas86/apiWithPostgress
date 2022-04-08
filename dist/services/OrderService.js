"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.OrderService = void 0;
var database_1 = __importDefault(require("../utilities/database"));
var OrderService = /** @class */ (function () {
    function OrderService() {
    }
    OrderService.prototype.getOrderById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, rows, selectedOrder, orderPSql, orderProdrows, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        sql = "SELECT * FROM orders WHERE id=($1)";
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        rows = (_a.sent()).rows;
                        selectedOrder = rows[0];
                        orderPSql = "SELECT product_id, quantity FROM order_products WHERE order_id=($1)";
                        return [4 /*yield*/, conn.query(orderPSql, [id])];
                    case 3:
                        orderProdrows = (_a.sent()).rows;
                        conn.release();
                        return [2 /*return*/, __assign(__assign({}, selectedOrder), { products: orderProdrows })];
                    case 4:
                        err_1 = _a.sent();
                        throw new Error("Could not get order");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.createOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var products, status, userid, conn, sql, result, order_1, orderProductsSql, orderProducts, _i, products_1, product, product_id, quantity, rows, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        products = order.products, status = order.status, userid = order.userid;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 2:
                        conn = _a.sent();
                        sql = "INSERT INTO orders (userid, status) VALUES($1, $2) RETURNING *";
                        return [4 /*yield*/, conn.query(sql, [userid, status])];
                    case 3:
                        result = _a.sent();
                        order_1 = result.rows[0];
                        orderProductsSql = "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity";
                        orderProducts = [];
                        _i = 0, products_1 = products;
                        _a.label = 4;
                    case 4:
                        if (!(_i < products_1.length)) return [3 /*break*/, 7];
                        product = products_1[_i];
                        product_id = product.product_id, quantity = product.quantity;
                        return [4 /*yield*/, conn.query(orderProductsSql, [
                                order_1.id,
                                product_id,
                                quantity,
                            ])];
                    case 5:
                        rows = (_a.sent()).rows;
                        orderProducts.push(rows[0]);
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        conn.release();
                        return [2 /*return*/, __assign(__assign({}, order_1), { products: orderProducts })];
                    case 8:
                        err_2 = _a.sent();
                        throw new Error("Could not create order.");
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.deleteOrder = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, orderProductsSql, sql, rows, deletedOrder, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        orderProductsSql = "DELETE FROM order_products WHERE order_id=($1)";
                        return [4 /*yield*/, conn.query(orderProductsSql, [id])];
                    case 2:
                        _a.sent();
                        sql = "DELETE FROM orders WHERE id=($1)";
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 3:
                        rows = (_a.sent()).rows;
                        deletedOrder = rows[0];
                        conn.release();
                        return [2 /*return*/, deletedOrder];
                    case 4:
                        err_3 = _a.sent();
                        throw new Error("Could not delete order");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return OrderService;
}());
exports.OrderService = OrderService;
