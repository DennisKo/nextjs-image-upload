import '@testing-library/jest-dom/extend-expect';
require('jest-fetch-mock').enableMocks();
function FormDataMock() {
    this.append = jest.fn();
}

global.FormData = FormDataMock;
