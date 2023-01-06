const {
    addBookHandler
} = require('./Handler');

const Routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
];