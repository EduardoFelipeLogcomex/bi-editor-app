"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class LoaderDispatcher {
    constructor(logger) {
        this._loaderHandlers = {};
        this._logger = logger;
    }
    register(name, loader) {
        if (!this._loaderHandlers[name]) {
            this._loaderHandlers[name] = loader;
        }
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const name of Object.keys(this._loaderHandlers)) {
                try {
                    yield this._loaderHandlers[name].handle();
                }
                catch (error) {
                    this._logger.write(String(error));
                    throw new Error('error on run system loaders');
                }
            }
        });
    }
}
exports.default = LoaderDispatcher;
