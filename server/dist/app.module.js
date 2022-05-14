"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const admin_module_1 = require("./modules/admin/admin.module");
const auth_module_1 = require("./modules/auth/auth.module");
const customer_module_1 = require("./modules/customer/customer.module");
const dealer_module_1 = require("./modules/dealer/dealer.module");
const order_module_1 = require("./modules/order/order.module");
const product_module_1 = require("./modules/product/product.module");
const search_module_1 = require("./modules/search/search.module");
const store_module_1 = require("./modules/store/store.module");
const user_module_1 = require("./modules/user/user.module");
const app_controller_1 = require("./app.controller");
exports.AppModule = [
    ...admin_module_1.AdminModule,
    ...auth_module_1.AuthModule,
    ...customer_module_1.CustomerModule,
    ...dealer_module_1.DealerModule,
    ...order_module_1.OrderModule,
    ...product_module_1.ProductModule,
    ...search_module_1.SearchModule,
    ...store_module_1.StoreModule,
    ...user_module_1.UserModule,
    app_controller_1.AppController,
];
//# sourceMappingURL=app.module.js.map