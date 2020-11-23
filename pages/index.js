import { useState } from 'react';
import ImageList from 'components/ImageList';
import UploadDialog from 'components/UploadDialog';
import SearchInput from 'components/SearchInput';
import { useDebounce, useImages } from 'hooks';
import getImages from 'lib/server/getImages';

export async function getServerSideProps() {
    const images = await getImages();
    return {
        props: { images },
    };
}

export default function Home(props) {
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounce(filter, 800);
    const { images, error, mutate } = useImages(debouncedFilter, props.images);
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div className="container px-4 py-8 mx-auto">
            <div className="flex flex-col mb-6 leading-5 md:justify-between md:mb-10 md:flex-row">
                <SearchInput handleFilterChange={handleFilterChange} />
                <UploadDialog mutate={mutate} />
            </div>
            <ImageList images={images} error={error} mutate={mutate} />
        </div>
    );
}
