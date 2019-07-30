import createSpyObj = jasmine.createSpyObj;

export const pageMock  = {
    waitForSelector: jest.fn(),
    evaluate: jest.fn(),
    frames: jest.fn()
};
export const frameSpy = createSpyObj('frame', ['name']);