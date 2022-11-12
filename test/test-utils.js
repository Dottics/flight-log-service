"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildNext = exports.buildRes = exports.buildReq = void 0;
function buildReq(overrides = {}) {
    return Object.assign({ body: {}, params: {} }, overrides);
}
exports.buildReq = buildReq;
function buildRes(overrides = {}) {
    const res = Object.assign({ json: jest.fn(() => res).mockName('json'), status: jest.fn(() => res).mockName('status') }, overrides);
    return res;
}
exports.buildRes = buildRes;
function buildNext(impl) {
    return jest.fn(impl).mockName('next');
}
exports.buildNext = buildNext;
