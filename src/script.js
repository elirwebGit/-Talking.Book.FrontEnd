const apiUrl = "https://localhost:7292/api/Livro";

document.addEventListener("DOMContentLoaded", () => {
  fetchBooks();

  document.getElementById("book-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("book-id").value;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    if (id) {
      updateBook(id, { title, author });
    } else {
      createBook({ title, author });
    }
  });
});

function fetchBooks() {
  fetch(apiUrl + "")
    .then((response) => response.json())
    .then((data) => {
      const bookList = document.getElementById("book-list");
      bookList.innerHTML = "";
      data.forEach((book) => {
        const bookItem = document.createElement("div");
        bookItem.className = "book-item";
        bookItem.innerHTML = `
                    <strong>${book.titulo}</strong> by ${book.autor}
                    <button onclick="editBook('${book.codigo}')">Editar</button>
                `;
        bookList.appendChild(bookItem);
      });
    });
}

function createBook(book) {
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  })
    .then((response) => response.json())
    .then(() => {
      fetchBooks();
      document.getElementById("book-form").reset();
    });
}

function editBook(id) {
  fetch(`${apiUrl}/${id}`)
    .then((response) => response.json())
    .then((book) => {
      document.getElementById("book-id").value = book.codigo;
      document.getElementById("title").value = book.titulo;
      document.getElementById("author").value = book.autor;
    });
}

function updateBook(livroId, book) {
  fetch(`${apiUrl}/${livroId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  })
    .then((response) => response.json())
    .then(() => {
      fetchBooks();
      document.getElementById("book-form").reset();
    });
}
