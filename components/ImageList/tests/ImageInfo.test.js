import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageInfo from '../ImageInfo';

const image = { key: 'a name.jpg', size: 630 };

describe('ImageInfo', () => {
    beforeEach(() => {
        fetch.resetMocks();
        jest.clearAllMocks();
    });
    const mockMutate = jest.fn();
    it('shows file name & size & delete button', () => {
        render(<ImageInfo image={image} mutate={mockMutate} />);

        // name
        expect(screen.getByText(image.key)).toBeInTheDocument();

        // size
        expect(screen.getByText(`${image.size}kb`)).toBeInTheDocument();

        // delete button
        expect(screen.getByText(`Delete`)).toBeInTheDocument();
    });

    it('calls delete endpoint, shows loading state, calls mutate', async () => {
        fetch.mockResponseOnce();
        render(<ImageInfo image={image} mutate={mockMutate} />);
        userEvent.click(screen.getByText('Delete'));
        await waitFor(() => screen.getByText('Deleting'));
        const deleteCall = fetch.mock.calls[0];

        // call url
        expect(deleteCall[0]).toEqual('/api/delete-image?key=a%20name.jpg');

        // call options
        expect(deleteCall[1]).toEqual({ method: 'DELETE' });

        expect(mockMutate).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('handles delete error', async () => {
        // something went wrong while deleting
        fetch.mockResponseOnce('fake error message', { status: 500 });

        render(<ImageInfo image={image} mutate={mockMutate} />);
        userEvent.click(screen.getByText('Delete'));
        await waitFor(() => screen.getByText('There was an error deleting the file...'));

        expect(fetch).toHaveBeenCalledTimes(1);

        // mutate should not be called on error response
        expect(mockMutate).toHaveBeenCalledTimes(0);
    });
});
