import { render, screen, getNodeText } from '@testing-library/react';
import ImageHeader from '../ImageHeader';

const images = [
    { key: 'a name.jpg', size: 630 },
    { key: 'another name.jpg', size: 123 },
];

describe('ImageHeader', () => {
    it('shows # of documents and total file size', () => {
        const { container } = render(<ImageHeader images={images} />);

        const expectedContent = `${images.length} Documents`;

        const header = getNodeText(container.querySelector('h2'));
        expect(header).toEqual(expectedContent);

        // file size sum
        expect(screen.getByText(/753/i)).toBeInTheDocument();
    });

    it('handle 0 images', () => {
        const { container } = render(<ImageHeader images={[]} />);

        const header = getNodeText(container.querySelector('h2'));
        expect(header).toEqual('0 Documents');

        const fileSize = getNodeText(container.querySelector('p'));

        expect(fileSize).toEqual('Total size: 0kb');
    });
});
