// Load books on page load
document.addEventListener("DOMContentLoaded", loadBooks);

function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const category = document.getElementById("category").value;
  const rating = document.getElementById("rating").value;
  const image = document.getElementById("image").value;

  if (!title || !author || !rating || !image) {
    alert("Fill all fields!");
    return;
  }

  const book = { title, author, category, rating, image };
  saveBook(book);
  displayBook(book);
  clearFields();
}

function displayBook(book) {
  const container = document.getElementById("bookContainer");

  const card = document.createElement("div");
  card.className = "book-card";

  card.innerHTML = `
      <img src="${book.image}">
      <div class="content">
          <h3>${book.title}</h3>
          <p><b>Author:</b> ${book.author}</p>
          <p><b>Category:</b> ${book.category}</p>
          <p><b>Rating:</b> ⭐ ${book.rating}</p>
          <button class="delete-btn" onclick="deleteBook(this)">Delete</button>
      </div>
  `;

  container.appendChild(card);
}

function saveBook(book) {
  let books = localStorage.getItem("books");
  books = books ? JSON.parse(books) : [];
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
}

function loadBooks() {
  let books = localStorage.getItem("books");
  books = books ? JSON.parse(books) : [];
  books.forEach(displayBook);
}

function deleteBook(button) {
  const card = button.parentElement.parentElement;
  const title = card.querySelector("h3").innerText;

  let books = JSON.parse(localStorage.getItem("books"));
  books = books.filter(book => book.title !== title);
  localStorage.setItem("books", JSON.stringify(books));

  card.remove();
}

function searchBook() {
  const search = document.getElementById("search").value.toLowerCase();
  const cards = document.querySelectorAll(".book-card");

  cards.forEach(card => {
    const title = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = title.includes(search) ? "block" : "none";
  });
}

function clearFields() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("rating").value = "";
  document.getElementById("image").value = "";
}

/* 🤖 Simple AI Assistant Logic */
function sendMessage() {
  const userInput = document.getElementById("userInput");
  const message = userInput.value.trim();
  if (message === "") return;

  appendMessage("user", message);
  userInput.value = "";

  // Simple AI responses
  const responses = {
    "hi": "Hello! I'm BookVerse AI. Ask me for book suggestions!",
    "suggest": "I recommend 'Atomic Habits' by James Clear or 'Deep Work' by Cal Newport.",
    "fiction": "Try 'The Great Gatsby' or 'To Kill a Mockingbird'.",
    "technology": "You might love 'Clean Code' or 'The Pragmatic Programmer'.",
    "self-help": "Try 'The Power of Habit' or 'Think Like a Monk'.",
    "education": "Maybe 'Educated' by Tara Westover or 'Make It Stick'."
  };

  let reply = "Hmm... I don't know that yet, but I'm learning! 🤓";

  for (let key in responses) {
    if (message.toLowerCase().includes(key)) {
      reply = responses[key];
      break;
    }
  }

  setTimeout(() => appendMessage("ai", reply), 500);
}

function appendMessage(sender, text) {
  const chatBox = document.getElementById("chatBox");
  const msg = document.createElement("div");
  msg.classList.add("chat-message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
