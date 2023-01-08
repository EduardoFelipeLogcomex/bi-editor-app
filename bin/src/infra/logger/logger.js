"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    write(message) {
        this.append({
            dateTimeOccurred: new Date(),
            message
        });
    }
    append(loggerMessage) {
        throw new Error('Method not implemented.');
    }
}
exports.default = Logger;
