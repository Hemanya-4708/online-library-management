/* =====================================================
   LIBRAX - ONLINE LIBRARY MANAGEMENT SYSTEM
   ===================================================== */


/* ================= DATA ================= */

let currentUser = "";
let currentRole = "";

let books = [

    {
        id: 1,
        title: "Java Programming",
        author: "Herbert Schildt",
        category: "programming",
        code: "JAVA",
        color: "cover-blue",
        available: true
    },

    {
        id: 2,
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "programming",
        code: "CODE",
        color: "cover-green",
        available: false
    },

    {
        id: 3,
        title: "Database System Concepts",
        author: "Abraham Silberschatz",
        category: "database",
        code: "DB",
        color: "cover-purple",
        available: true
    },

    {
        id: 4,
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        category: "science",
        code: "TIME",
        color: "cover-orange",
        available: true
    },

    {
        id: 5,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "fiction",
        code: "ALC",
        color: "cover-red",
        available: true
    },

    {
        id: 6,
        title: "Python Crash Course",
        author: "Eric Matthes",
        category: "programming",
        code: "PY",
        color: "cover-dark",
        available: true
    },

    {
        id: 7,
        title: "Data Structures and Algorithms",
        author: "Narasimha Karumanchi",
        category: "programming",
        code: "DSA",
        color: "cover-blue",
        available: true
    },

    {
        id: 8,
        title: "Operating System Concepts",
        author: "Silberschatz",
        category: "science",
        code: "OS",
        color: "cover-purple",
        available: false
    }

];


let borrowedBooks = [

    {
        id: 2,
        title: "Clean Code",
        borrowDate: "10 Sep 2026",
        dueDate: "24 Sep 2026",
        status: "Overdue"
    },

    {
        id: 1,
        title: "Java Programming",
        borrowDate: "20 Sep 2026",
        dueDate: "04 Oct 2026",
        status: "Active"
    }

];


let reservations = [

    {
        title: "Operating System Concepts",
        date: "28 Sep 2026",
        status: "Waiting"
    }

];


let history = [

    {
        title: "HTML & CSS Design",
        borrowed: "01 Aug 2026",
        returned: "15 Aug 2026",
        status: "Returned"
    },

    {
        title: "Data Structures",
        borrowed: "20 Jul 2026",
        returned: "02 Aug 2026",
        status: "Returned"
    },

    {
        title: "Operating Systems",
        borrowed: "05 Jul 2026",
        returned: "20 Jul 2026",
        status: "Returned"
    }

];


/* ================= LOGIN ================= */

function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const role =
        document.getElementById("loginRole").value;


    if (username === "" || password === "") {

        showToast(
            "Please enter username and password.",
            "⚠️"
        );

        return;
    }


    currentUser = username;
    currentRole = role;


    localStorage.setItem(
        "libraryUser",
        username
    );

    localStorage.setItem(
        "libraryRole",
        role
    );


    document
        .getElementById("loginPage")
        .classList.add("hidden");


    document
        .getElementById("app")
        .classList.remove("hidden");


    updateUserInterface();

    renderBooks();

    renderBorrowedBooks();

    renderReservations();

    renderHistory();


    showToast(
        "Welcome to LibraX!",
        "👋"
    );
}


/* ================= UPDATE USER ================= */

function updateUserInterface() {

    const roleNames = {

        student: "Student",

        librarian: "Librarian",

        admin: "Administrator"

    };


    const roleIcons = {

        student: "👨‍🎓",

        librarian: "👩‍💼",

        admin: "👨‍💼"

    };


    document
        .getElementById("roleName")
        .textContent = roleNames[currentRole];


    document
        .getElementById("roleIcon")
        .textContent = roleIcons[currentRole];


    document
        .getElementById("userNameDisplay")
        .textContent = currentUser;


    document
        .getElementById("headerUser")
        .textContent = currentUser;


    document
        .getElementById("headerRole")
        .textContent =
        roleNames[currentRole];


    /* Admin features */

    document
        .querySelectorAll(".admin-only")
        .forEach(element => {

            if (
                currentRole === "admin" ||
                currentRole === "librarian"
            ) {

                element.style.display = "";

            } else {

                element.style.display = "none";

            }

        });

}


/* ================= LOGOUT ================= */

function logout() {

    localStorage.removeItem("libraryUser");

    localStorage.removeItem("libraryRole");

    currentUser = "";
    currentRole = "";

    document
        .getElementById("app")
        .classList.add("hidden");

    document
        .getElementById("loginPage")
        .classList.remove("hidden");

    document.getElementById("username").value = "";

    document.getElementById("password").value = "";

    showToast(
        "Logged out successfully.",
        "✓"
    );
}


/* ================= PAGE NAVIGATION ================= */

function showPage(pageId, clickedElement = null) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove(
                "active-page"
            );

        });


    const selectedPage =
        document.getElementById(pageId);


    if (!selectedPage) return;


    selectedPage.classList.add(
        "active-page"
    );


    document
        .querySelectorAll(".nav-link")
        .forEach(link => {

            link.classList.remove("active");

        });


    if (clickedElement) {

        clickedElement.classList.add(
            "active"
        );

    } else {

        const nav =
            document.querySelector(
                `.nav-link[href="#${pageId}"]`
            );

        if (nav) {

            nav.classList.add("active");

        }

    }


    const titles = {

        dashboard: [
            "Dashboard",
            "Welcome to your library dashboard."
        ],

        books: [
            "Library Books",
            "Browse and manage available books."
        ],

        borrowed: [
            "My Borrowed Books",
            "Track your currently borrowed books."
        ],

        reservations: [
            "My Reservations",
            "Manage your reserved books."
        ],

        history: [
            "Borrowing History",
            "Complete history of your library activity."
        ],

        notifications: [
            "Notifications",
            "Important updates and reminders."
        ],

        reports: [
            "Library Reports",
            "Monitor library performance."
        ],

        users: [
            "User Management",
            "Manage registered library users."
        ]

    };


    if (titles[pageId]) {

        document
            .getElementById("pageTitle")
            .textContent =
            titles[pageId][0];

        document
            .getElementById("pageSubtitle")
            .textContent =
            titles[pageId][1];

    }


    if (pageId === "books") {

        renderBooks();

    }

    if (pageId === "borrowed") {

        renderBorrowedBooks();

    }

    if (pageId === "reservations") {

        renderReservations();

    }

    if (pageId === "history") {

        renderHistory();

    }


    document
        .querySelector(".sidebar")
        ?.classList.remove("show");

}


/* ================= RENDER BOOKS ================= */

function renderBooks() {

    const grid =
        document.getElementById("booksGrid");


    if (!grid) return;


    grid.innerHTML = "";


    books.forEach(book => {

        const card =
            document.createElement("div");

        card.className = "book-card";


        const actionButton =
            book.available

                ? `
                    <button
                        class="small-btn"
                        onclick="borrowBook(${book.id})">
                        Borrow
                    </button>

                    <button
                        class="small-btn reserve-btn"
                        onclick="reserveBook(${book.id})">
                        Reserve
                    </button>
                  `

                : `
                    <button
                        class="small-btn reserve-btn"
                        onclick="reserveBook(${book.id})">
                        Reserve
                    </button>
                  `;


        card.innerHTML = `

            <div class="book-cover ${book.color}">
                ${book.code}
            </div>

            <div class="book-content">

                <span class="book-category">
                    ${book.category}
                </span>

                <h3>
                    ${book.title}
                </h3>

                <p>
                    ${book.author}
                </p>

                <div class="book-meta">

                    <span class="${
                        book.available
                        ? "available-text"
                        : "unavailable-text"
                    }">

                        ${
                            book.available
                            ? "● Available"
                            : "● Currently Borrowed"
                        }

                    </span>

                    <div class="book-buttons">

                        ${actionButton}

                    </div>

                </div>

            </div>

        `;


        grid.appendChild(card);

    });

}


/* ================= SEARCH ================= */

function searchBooks() {

    const search =
        document
            .getElementById("bookSearch")
            .value
            .toLowerCase();


    const category =
        document
            .getElementById("categoryFilter")
            .value;


    const availability =
        document
            .getElementById("availabilityFilter")
            .value;


    const cards =
        document
            .querySelectorAll(".book-card");


    books.forEach((book, index) => {

        const matchesSearch =

            book.title
                .toLowerCase()
                .includes(search)

            ||

            book.author
                .toLowerCase()
                .includes(search);


        const matchesCategory =

            category === "all"

            ||

            book.category === category;


        const matchesAvailability =

            availability === "all"

            ||

            (
                availability === "available"
                &&
                book.available
            )

            ||

            (
                availability === "borrowed"
                &&
                !book.available
            );


        if (
            matchesSearch &&
            matchesCategory &&
            matchesAvailability
        ) {

            cards[index].style.display =
                "block";

        } else {

            cards[index].style.display =
                "none";

        }

    });

}


function filterBooks() {

    searchBooks();

}


/* ================= BORROW ================= */

function borrowBook(id) {

    const book =
        books.find(
            book => book.id === id
        );


    if (!book) return;


    if (!book.available) {

        showToast(
            "This book is currently unavailable.",
            "⚠️"
        );

        return;

    }


    const alreadyBorrowed =
        borrowedBooks.some(
            item => item.id === id
        );


    if (alreadyBorrowed) {

        showToast(
            "You already borrowed this book.",
            "⚠️"
        );

        return;

    }


    const today =
        new Date();


    const dueDate =
        new Date();


    dueDate.setDate(
        today.getDate() + 14
    );


    borrowedBooks.push({

        id: book.id,

        title: book.title,

        borrowDate:
            formatDate(today),

        dueDate:
            formatDate(dueDate),

        status: "Active"

    });


    book.available = false;


    renderBooks();

    renderBorrowedBooks();

    updateStatistics();


    showToast(
        `"${book.title}" borrowed successfully!`,
        "📚"
    );

}


/* ================= RETURN ================= */

function returnBook(id) {

    const index =
        borrowedBooks.findIndex(
            book => book.id === id
        );


    if (index === -1) return;


    const book =
        borrowedBooks[index];


    history.unshift({

        title: book.title,

        borrowed: book.borrowDate,

        returned:
            formatDate(new Date()),

        status: "Returned"

    });


    const libraryBook =
        books.find(
            item => item.id === id
        );


    if (libraryBook) {

        libraryBook.available = true;

    }


    borrowedBooks.splice(
        index,
        1
    );


    renderBooks();

    renderBorrowedBooks();

    renderHistory();

    updateStatistics();


    showToast(
        `"${book.title}" returned successfully!`,
        "✓"
    );

}


/* ================= RESERVE ================= */

function reserveBook(id) {

    const book =
        books.find(
            book => book.id === id
        );


    if (!book) return;


    const exists =
        reservations.some(
            item => item.title === book.title
        );


    if (exists) {

        showToast(
            "This book is already reserved.",
            "⚠️"
        );

        return;

    }


    reservations.push({

        title: book.title,

        date: formatDate(new Date()),

        status: "Waiting"

    });


    renderReservations();


    showToast(
        `"${book.title}" reserved successfully!`,
        "📌"
    );

}


/* ================= BORROWED TABLE ================= */

function renderBorrowedBooks() {

    const table =
        document.getElementById(
            "borrowedTable"
        );


    if (!table) return;


    table.innerHTML = "";


    if (borrowedBooks.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="5"
                    style="text-align:center;padding:40px">

                    📚 No borrowed books.

                </td>

            </tr>

        `;

        return;

    }


    borrowedBooks.forEach(book => {

        const row =
            document.createElement("tr");


        const isOverdue =
            book.status === "Overdue";


        row.innerHTML = `

            <td>
                <strong>
                    ${book.title}
                </strong>
            </td>

            <td>
                ${book.borrowDate}
            </td>

            <td>
                ${book.dueDate}
            </td>

            <td>

                <span class="status ${
                    isOverdue
                    ? "danger"
                    : "active"
                }">

                    ${
                        isOverdue
                        ? "Overdue"
                        : "Active"
                    }

                </span>

            </td>

            <td>

                <button
                    class="small-btn"
                    onclick="returnBook(${book.id})">

                    Return

                </button>

            </td>

        `;


        table.appendChild(row);

    });

}


/* ================= RESERVATIONS ================= */

function renderReservations() {

    const container =
        document.getElementById(
            "reservationList"
        );


    if (!container) return;


    container.innerHTML = "";


    if (reservations.length === 0) {

        container.innerHTML = `

            <div class="dashboard-card">

                📌 No active reservations.

            </div>

        `;

        return;

    }


    reservations.forEach(
        (reservation, index) => {

            const card =
                document.createElement("div");


            card.className =
                "reservation-card";


            card.innerHTML = `

                <div class="reservation-cover">
                    📖
                </div>

                <div>

                    <strong>
                        ${reservation.title}
                    </strong>

                    <small>
                        Reserved on:
                        ${reservation.date}
                    </small>

                </div>

                <span class="status pending">
                    ${reservation.status}
                </span>

                <button
                    class="secondary-btn"
                    onclick="cancelReservation(${index})">

                    Cancel

                </button>

            `;


            container.appendChild(card);

        }
    );

}


/* ================= CANCEL RESERVATION ================= */

function cancelReservation(index) {

    const title =
        reservations[index].title;


    reservations.splice(
        index,
        1
    );


    renderReservations();


    showToast(
        `Reservation for "${title}" cancelled.`,
        "✓"
    );

}


/* ================= HISTORY ================= */

function renderHistory() {

    const table =
        document.getElementById(
            "historyTable"
        );


    if (!table) return;


    table.innerHTML = "";


    history.forEach(item => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>
                    ${item.title}
                </strong>
            </td>

            <td>
                ${item.borrowed}
            </td>

            <td>
                ${item.returned}
            </td>

            <td>

                <span class="status active">
                    ${item.status}
                </span>

            </td>

        `;


        table.appendChild(row);

    });

}


/* ================= STATISTICS ================= */

function updateStatistics() {

    const borrowed =
        borrowedBooks.length;


    const overdue =
        borrowedBooks.filter(
            book =>
                book.status === "Overdue"
        ).length;


    const available =
        books.filter(
            book => book.available
        ).length;


    const total =
        books.length;


    document
        .getElementById("borrowedCount")
        .textContent = borrowed;


    document
        .getElementById("overdueCount")
        .textContent = overdue;


    document
        .getElementById("availableBooks")
        .textContent = available;


    document
        .getElementById("totalBooks")
        .textContent = total;

}


/* ================= ADD BOOK ================= */

function openAddBookModal() {

    document
        .getElementById("bookModal")
        .classList.add("show");

}


function closeBookModal() {

    document
        .getElementById("bookModal")
        .classList.remove("show");

}


function addBook() {

    const title =
        document
            .getElementById("newBookTitle")
            .value
            .trim();


    const author =
        document
            .getElementById("newBookAuthor")
            .value
            .trim();


    const category =
        document
            .getElementById("newBookCategory")
            .value;


    if (
        title === "" ||
        author === ""
    ) {

        showToast(
            "Please enter all book details.",
            "⚠️"
        );

        return;

    }


    const colors = [
        "cover-blue",
        "cover-green",
        "cover-purple",
        "cover-orange",
        "cover-red",
        "cover-dark"
    ];


    const randomColor =
        colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];


    books.push({

        id:
            Date.now(),

        title: title,

        author: author,

        category: category,

        code:
            title
                .substring(0, 3)
                .toUpperCase(),

        color: randomColor,

        available: true

    });


    closeBookModal();

    renderBooks();

    updateStatistics();


    document
        .getElementById("newBookTitle")
        .value = "";


    document
        .getElementById("newBookAuthor")
        .value = "";


    showToast(
        "New book added successfully!",
        "📚"
    );

}


/* ================= NOTIFICATIONS ================= */

function markNotificationsRead() {

    document
        .querySelectorAll(".notification")
        .forEach(notification => {

            notification.classList.remove(
                "unread"
            );

        });


    document
        .querySelector(".notification-count")
        .style.display = "none";


    showToast(
        "All notifications marked as read.",
        "✓"
    );

}


/* ================= THEME ================= */

function toggleTheme() {

    document
        .body
        .classList.toggle("dark");


    const isDark =
        document
            .body
            .classList
            .contains("dark");


    localStorage.setItem(
        "darkMode",
        isDark
    );

}


/* ================= REPORT ================= */

function generateReport() {

    showToast(
        "Library report generated successfully!",
        "📊"
    );

}


/* ================= MOBILE SIDEBAR ================= */

function toggleSidebar() {

    document
        .querySelector(".sidebar")
        .classList.toggle("show");

}


/* ================= DATE ================= */

function formatDate(date) {

    return date.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* ================= TOAST ================= */

function showToast(
    message,
    icon = "✓"
) {

    const toast =
        document.getElementById("toast");


    document
        .getElementById("toastMessage")
        .textContent = message;


    document
        .getElementById("toastIcon")
        .textContent = icon;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 3000);

}


/* ================= START APPLICATION ================= */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        const savedUser =
            localStorage.getItem(
                "libraryUser"
            );


        const savedRole =
            localStorage.getItem(
                "libraryRole"
            );


        const darkMode =
            localStorage.getItem(
                "darkMode"
            );


        if (darkMode === "true") {

            document
                .body
                .classList
                .add("dark");

        }


        if (
            savedUser &&
            savedRole
        ) {

            currentUser = savedUser;

            currentRole = savedRole;


            document
                .getElementById("loginPage")
                .classList
                .add("hidden");


            document
                .getElementById("app")
                .classList
                .remove("hidden");


            updateUserInterface();

            renderBooks();

            renderBorrowedBooks();

            renderReservations();

            renderHistory();

            updateStatistics();

        }

    }
);