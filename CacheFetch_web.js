"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
let cache = new Map();
/**
 * fetches the request with node-fetch and caches the result. Also only allows one request every 200ms and will put all
 * other into a waiting query
 */
function fetch(request, maxCacheAge = 60 * 60 * 1000) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!cache.has(request) || cache.get(request)[1].getTime() + maxCacheAge - new Date().getTime() < 0) {
            let promise = window.fetch(request).then(res => res.json());
            cache.set(request, [promise, new Date()]);
            return yield promise;
        }
        else {
            return yield cache.get(request)[0];
        }
    });
}
exports.fetch = fetch;
//# sourceMappingURL=CacheFetch.js.map