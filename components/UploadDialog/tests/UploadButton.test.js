import { render, screen } from '@testing-library/react';
import UploadButton from '../UploadButton';
import userEvent from '@testing-library/user-event';

describe('UploadButton', () => {
    it('calls click handler', () => {
        const mockHandleUploadClick = jest.fn();
        let isDisabled = false;
        render(
            <UploadButton isDisabled={isDisabled} handleClick={mockHandleUploadClick}>
                <span>{isDisabled ? 'Uploading...' : 'Upload'}</span>
            </UploadButton>
        );

        userEvent.click(screen.getByText('Upload'));

        expect(mockHandleUploadClick).toHaveBeenCalledTimes(1);
    });

    it('does NOT call click handler when disabled', () => {
        const mockHandleUploadClick = jest.fn();
        let isDisabled = true;
        render(
            <UploadButton isDisabled={isDisabled} handleClick={mockHandleUploadClick}>
                {isDisabled ? 'Uploading...' : 'Upload'}
            </UploadButton>
        );

        userEvent.click(screen.getByText('Uploading...'));

        expect(screen.getByText('Uploading...')).toBeDisabled();
        expect(mockHandleUploadClick).toHaveBeenCalledTimes(0);
    });
});
