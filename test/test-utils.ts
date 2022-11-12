function buildReq(overrides = {}) {
    return {
        body: {},
        params: {},
        ...overrides
    } as any
}

function buildRes(overrides = {}) {
    const res: any = {
        json: jest.fn(() => res).mockName('json'),
        status: jest.fn(() => res).mockName('status'),
        ...overrides,
    }
    return res
}

function buildNext(impl?: any) {
    return jest.fn(impl).mockName('next')
}

export {
    buildReq,
    buildRes,
    buildNext
}