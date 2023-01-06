const { nanoid } = require("nanoid");
const Books = require("./Books");


//tambah buku 
const addBookHeandler = (request, h) => {
    // inputan user
    const {
        name, year, 
        author, summary, 
        publisher,pageCount, 
        readPage, reading
    } = request.payload;
    // inputan server
    const id = nanoid(16);
    const insertAt = new Date().toISOString();
    const updateAt = insertAt;
    const finished = pageCount === readPage ? true : false;

    // creat objek book
    const newBook = {
        id,
        name, year, 
        author, summary, 
        publisher,pageCount, 
        readPage, reading,
        finished,
        insertAt,
        updateAt,
    };

    const isSuccess = Books.filter((book) => book.id === id).length === 0;

    if (name === undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal Menambahkan Buku. Mohon Isi nama Buku',
        });
        response.code(400);
        return response;
    }

    else if (pageCount < readPage){
        const response = h.respose({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    
    else if (isSuccess){
        Books.push(newBook);
        const response = h.respose({
            error: false,
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId : id,
            },
        });
        response.code(201);
        response.header('Access-Control-Allow-Origin', '*');
        return response;
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal ditambahkan',
          });
          response.code(500);
          return response;
    }


}