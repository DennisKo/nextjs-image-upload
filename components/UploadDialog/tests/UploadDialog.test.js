import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import UploadDialog from 'components/UploadDialog';

describe('UploadDialog', () => {
    beforeEach(() => {
        fetch.resetMocks();
        jest.clearAllMocks();
    });

    it('uploads a file and shows loading', async () => {
        const mockRefetchImage = jest.fn();
        jest.spyOn(React, 'useRef').mockReturnValue({ current: { click: jest.fn() } });
        const mockSignUrl = 'someAwsS3BucketUrl';
        fetch.mockResponse((req) =>
            req.url === 'api/sign-url'
                ? Promise.resolve(JSON.stringify({ signedUrl: mockSignUrl }))
                : Promise.resolve({ body: 'ok' })
        );
        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        render(<UploadDialog refetchImages={mockRefetchImage} />);
        const input = screen.getByTestId('file-input');
        userEvent.upload(input, file);
        await waitFor(() => screen.getByText('Upload'));

        expect(input.files[0]).toStrictEqual(file);

        const signUrlCall = fetch.mock.calls[0];
        const uploadFileCall = fetch.mock.calls[1];

        // calls sign-url correctly
        expect(signUrlCall[0]).toEqual('api/sign-url');
        expect(signUrlCall[1]).toEqual({
            method: 'POST',
            'content-type': 'application/json',
            body: '{"name":"hello.png","type":"image/png"}',
        });

        // calls signed url correctly (s3)
        expect(uploadFileCall[0]).toEqual(mockSignUrl);
        expect(uploadFileCall[1]).toEqual({ method: 'PUT', body: expect.any(File) });

        expect(mockRefetchImage).toHaveBeenCalledTimes(1);
    });
});
