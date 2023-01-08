"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../../infra/logger/logger"));
const loader_dispatcher_1 = __importDefault(require("./loader-dispatcher"));
describe('Loader dispatch unit tests', () => {
    it('should register an loader handler', () => {
        const loaderDispatcher = new loader_dispatcher_1.default(new logger_1.default());
        const loadHandlerMock = {
            handle() {
                return Promise.resolve();
            }
        };
        loaderDispatcher.register('any_loader', loadHandlerMock);
        expect(loaderDispatcher['_loaderHandlers']).toStrictEqual({
            any_loader: loadHandlerMock
        });
    });
});
