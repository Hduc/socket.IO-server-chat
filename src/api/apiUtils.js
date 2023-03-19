"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.handleResponse = void 0;
exports.handleResponse = (response) => {
    if (response.ok)
        return response.json();
    throw new Error("Network response was not ok.");
};
exports.handleError = (error) => {
    console.error("API call failed. " + error);
    throw error;
};
//# sourceMappingURL=apiUtils.js.map