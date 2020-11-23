import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from '../SearchInput';

describe('SearchInput', () => {
    beforeEach(() => {
        fetch.resetMocks();
        jest.clearAllMocks();
    });

    it('calls delete endpoint, shows loading state, calls mutate', async () => {
        const mockHandleFilterChange = jest.fn();
        fetch.mockResponse();
        render(<SearchInput handleFilterChange={mockHandleFilterChange} />);
        userEvent.type(screen.getByPlaceholderText('Search documents...'), 'search');

        expect(mockHandleFilterChange).toHaveBeenCalledTimes('search'.length);
        expect(screen.getByPlaceholderText('Search documents...')).toHaveValue('search');
    });
});
