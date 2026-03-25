import localforage from 'localforage';

export const db = localforage.createInstance({
    name: 'books-authors-db',
});