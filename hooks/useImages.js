import useSWR from 'swr';

function useImages(filter, initialImages) {
    const { data, error, mutate } = useSWR(`/api/images?filter=${filter}`, {
        initialData: initialImages,
        revalidateOnMount: true,
    });

    return {
        images: data,
        error,
        mutate,
    };
}
export default useImages;
