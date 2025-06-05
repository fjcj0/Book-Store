export const getPublicIdFromUrl = (url) => {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return `books/${filename.split('.')[0]}`;
};