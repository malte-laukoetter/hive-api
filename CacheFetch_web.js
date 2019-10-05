"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var cache = new Map();

/**
 * fetches the request with node-fetch and caches the result. Also only allows one request every 200ms and will put all
 * other into a waiting query
 */
function fetch(request, maxCacheAge) {
    if (maxCacheAge === void 0) { maxCacheAge = 60 * 60 * 1000; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var promise;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(!cache.has(request) || cache.get(request)[1].getTime() + maxCacheAge - new Date().getTime() < 0)) return [3 /*break*/, 2];
                    promise = window.fetch(request).then(function(res){return res.json()});
                    cache.set(request, [promise, new Date()]);
                    return [4 /*yield*/, promise];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [4 /*yield*/, cache.get(request)[0]];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.fetch = fetch;
//# sourceMappingURL=CacheFetch.js.map