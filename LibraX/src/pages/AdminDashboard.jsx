
import { useState } from 'react'

// DEFAULT BOOK COLLECTION
const defaultBooks = [
  {
    id: 1,
    title: 'Python Programming',
    author: 'Guido van Rossum',
    category: 'Programming',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500'
  },
  {
    id: 2,
    title: 'Python Crash Course',
    author: 'Eric Matthes',
    category: 'Python Programming',
    image: 'https://covers.openlibrary.org/b/isbn/9781593279288-L.jpg'
  },
  {
    id: 3,
    title: 'Head First Java',
    author: 'Kathy Sierra, Bert Bates and Trisha Gee',
    category: 'Java Programming',
    image: 'https://covers.openlibrary.org/b/isbn/9781491910771-L.jpg'
  },
  {
    id: 4,
    title: 'Grokking Algorithms',
    author: 'Aditya Bhargava',
    category: 'Data Structures',
    image: 'https://covers.openlibrary.org/b/isbn/9781617292231-L.jpg'
  },
  {
    id: 5,
    title: 'Operating System Concepts',
    author: 'Abraham Silberschatz, Peter B. Galvin and Greg Gagne',
    category: 'Operating Systems',
    image: 'https://covers.openlibrary.org/b/isbn/9788126554270-L.jpg'
  },
  {
    id: 6,
    title: 'Database System Concepts',
    author: 'Abraham Silberschatz, Henry F. Korth and S. Sudarshan',
    category: 'Database Management',
    image: 'https://covers.openlibrary.org/b/isbn/9780078022159-L.jpg'
  },
  {
    id: 7,
    title: 'Artificial Intelligence: A Modern Approach',
    author: 'Stuart Russell and Peter Norvig',
    category: 'Artificial Intelligence',
    image: 'https://covers.openlibrary.org/b/isbn/9780134610993-L.jpg'
  },
  {
    id: 8,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Software Engineering',
    image: 'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg'
  },
  {
    id: 9,
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    category: 'Data Engineering',
    image: 'https://covers.openlibrary.org/b/isbn/9781449373320-L.jpg'
  },
  {
    id: 10,
    title: 'Test Book',
    author: 'Test Author',
    category: 'Testing',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500'
  }
]

function AdminDashboard() {
  // LOAD BOOKS FROM LOCAL STORAGE OR USE DEFAULT BOOKS
  const [books, setBooks] = useState(() => {
    const savedBooks = JSON.parse(
      localStorage.getItem('books') || '[]'
    )

    if (savedBooks.length > 0) {
      return savedBooks
    }

    localStorage.setItem('books', JSON.stringify(defaultBooks))
    return defaultBooks
  })

  const [requests, setRequests] = useState(() =>
    JSON.parse(localStorage.getItem('requests') || '[]')
  )

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')

  const [editingBookId, setEditingBookId] = useState(null)
  const [editedImage, setEditedImage] = useState('')

  const pendingCount = requests.filter(
    (r) => r.status === 'Pending'
  ).length

  const approvedCount = requests.filter(
    (r) => r.status === 'Approved'
  ).length

  const rejectedCount = requests.filter(
    (r) => r.status === 'Rejected'
  ).length

  function addBook(e) {
    e.preventDefault()

    const newBook = {
      id: Date.now(),
      title: title.trim(),
      author: author.trim(),
      category: category.trim(),
      image: image.trim()
    }

    const updatedBooks = [...books, newBook]

    setBooks(updatedBooks)
    localStorage.setItem('books', JSON.stringify(updatedBooks))

    setTitle('')
    setAuthor('')
    setCategory('')
    setImage('')

    alert('Book added successfully!')
  }

  function deleteBook(id) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this book?'
    )

    if (!confirmDelete) return

    const updatedBooks = books.filter(
      (book) => book.id !== id
    )

    setBooks(updatedBooks)
    localStorage.setItem('books', JSON.stringify(updatedBooks))
  }

  function editBookImage(book) {
    setEditingBookId(book.id)
    setEditedImage(book.image || '')
  }

  function saveBookImage(id) {
    const updatedBooks = books.map((book) =>
      book.id === id
        ? { ...book, image: editedImage.trim() }
        : book
    )

    setBooks(updatedBooks)
    localStorage.setItem('books', JSON.stringify(updatedBooks))

    setEditingBookId(null)
    setEditedImage('')

    alert('Book image updated successfully!')
  }

  function cancelImageEdit() {
    setEditingBookId(null)
    setEditedImage('')
  }

  function updateRequest(id, status) {
    const updatedRequests = requests.map((request) =>
      request.id === id
        ? { ...request, status }
        : request
    )

    setRequests(updatedRequests)
    localStorage.setItem('requests', JSON.stringify(updatedRequests))
  }

  return (
    <div className="admin-dashboard">

      {/* HEADER */}
      <section className="admin-hero">
        <div className="admin-hero-content">
          <span className="admin-tag">
            LIBRAX MANAGEMENT PANEL
          </span>

          <h2>Admin Dashboard</h2>

          <p>
            Manage your library, books and student requests
            in one place.
          </p>
        </div>

        <div className="admin-hero-icon">📚</div>
      </section>

      {/* STATISTICS */}
      <section className="admin-stats">

        <div className="admin-stat-card">
          <span className="admin-stat-icon">📚</span>
          <div>
            <h3>{books.length}</h3>
            <p>Total Books</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-icon">📝</span>
          <div>
            <h3>{requests.length}</h3>
            <p>Total Requests</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-icon">⏳</span>
          <div>
            <h3>{pendingCount}</h3>
            <p>Pending Requests</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-icon">✅</span>
          <div>
            <h3>{approvedCount}</h3>
            <p>Approved Requests</p>
          </div>
        </div>

      </section>

      {/* ADD BOOK */}
      <section className="admin-section">

        <div className="admin-section-heading">
          <span className="admin-section-label">
            LIBRARY COLLECTION
          </span>

          <h2>Add New Book</h2>

          <p>
            Add new books to your digital library collection.
          </p>
        </div>

        <form className="admin-book-form" onSubmit={addBook}>

          <input
            type="text"
            placeholder="Enter Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <input
            type="url"
            placeholder="Paste Book Cover Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <button type="submit">
            + Add Book
          </button>

        </form>
      </section>

      {/* AVAILABLE BOOKS */}
      <section className="admin-section">

        <div className="admin-section-heading">
          <span className="admin-section-label">
            YOUR COLLECTION
          </span>

          <h2>
            Available Books <span>({books.length})</span>
          </h2>

          <p>
            View and manage all books available in LibraX.
          </p>
        </div>

        {books.length === 0 ? (
          <div className="admin-empty">
            <span>📚</span>
            <h3>No books available</h3>
            <p>Add your first book using the form above.</p>
          </div>
        ) : (

          <div className="admin-book-grid">

            {books.map((book) => (

              <article className="admin-book-card" key={book.id}>

                <div className="admin-book-cover">

                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.nextElementSibling.style.display = 'grid'
                      }}
                    />
                  ) : null}

                  <div
                    className="admin-cover-fallback"
                    style={{
                      display: book.image ? 'none' : 'grid'
                    }}
                  >
                    <span>📖</span>
                    <small>LIBRAX COLLECTION</small>
                  </div>

                </div>

                <div className="admin-book-details">

                  <h3>{book.title}</h3>

                  <p>By {book.author}</p>

                  <span>{book.category}</span>

                </div>

                {editingBookId === book.id ? (

                  <div className="admin-image-edit">

                    <input
                      type="url"
                      placeholder="Paste new image URL"
                      value={editedImage}
                      onChange={(e) => setEditedImage(e.target.value)}
                    />

                    <button
                      type="button"
                      className="admin-save-image"
                      onClick={() => saveBookImage(book.id)}
                    >
                      Save Image
                    </button>

                    <button
                      type="button"
                      className="admin-cancel-image"
                      onClick={cancelImageEdit}
                    >
                      Cancel
                    </button>

                  </div>

                ) : (

                  <button
                    type="button"
                    className="admin-edit-button"
                    onClick={() => editBookImage(book)}
                  >
                    Edit Image
                  </button>

                )}

                <button
                  type="button"
                  className="admin-delete-button"
                  onClick={() => deleteBook(book.id)}
                >
                  Delete Book
                </button>

              </article>

            ))}

          </div>

        )}

      </section>

      {/* STUDENT REQUESTS */}
      <section className="admin-section">

        <div className="admin-section-heading">
          <span className="admin-section-label">
            STUDENT ACTIVITY
          </span>

          <h2>
            Book Requests <span>({requests.length})</span>
          </h2>

          <p>
            Review student requests and update their status.
          </p>
        </div>

        {requests.length === 0 ? (

          <div className="admin-empty">
            <span>📝</span>
            <h3>No requests yet</h3>
            <p>Student book requests will appear here.</p>
          </div>

        ) : (

          <div className="admin-request-list">

            {requests.map((request) => (

              <article
                className="admin-request-card"
                key={request.id}
              >

                <div className="admin-request-icon">
                  📕
                </div>

                <div className="admin-request-details">

                  <h3>{request.bookTitle}</h3>

                  <p>
                    Student: {request.userName || 'Previous User'}
                  </p>

                  <p>
                    Email: {request.userEmail || 'Not available'}
                  </p>

                </div>

                <div className="admin-request-actions">

                  <span
                    className={`admin-request-status ${
                      request.status === 'Approved'
                        ? 'status-approved'
                        : request.status === 'Rejected'
                        ? 'status-rejected'
                        : 'status-pending'
                    }`}
                  >
                    {request.status}
                  </span>

                  {request.status === 'Pending' && (

                    <div className="admin-action-buttons">

                      <button
                        type="button"
                        className="approve-button"
                        onClick={() =>
                          updateRequest(request.id, 'Approved')
                        }
                      >
                        Approve
                      </button>

                      <button
                        type="button"
                        className="reject-button"
                        onClick={() =>
                          updateRequest(request.id, 'Rejected')
                        }
                      >
                        Reject
                      </button>

                    </div>

                  )}

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

      {/* FOOTER */}
      <footer className="admin-footer-note">

        <p>
          Manage smart. Read more. Grow together. ✨
        </p>

        <span>
          LibraX — Admin Management Portal
        </span>

      </footer>

    </div>
  )
}

export default AdminDashboard
