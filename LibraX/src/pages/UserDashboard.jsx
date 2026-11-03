
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

function UserDashboard({ currentUser }) {

  // LOAD DEFAULT BOOKS WHEN NO BOOK DATA EXISTS
  const [books] = useState(() => {
    const savedBooks = localStorage.getItem('books')

    if (savedBooks === null) {
      localStorage.setItem('books', JSON.stringify(defaultBooks))
      return defaultBooks
    }

    return JSON.parse(savedBooks)
  })

  const [requests, setRequests] = useState(() =>
    JSON.parse(localStorage.getItem('requests') || '[]')
  )

  const [search, setSearch] = useState('')

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author} ${book.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const myRequests = requests.filter(
    (request) => request.userEmail === currentUser.email
  )

  function requestBook(book) {
    const alreadyRequested = requests.some(
      (request) =>
        request.bookTitle === book.title &&
        request.userEmail === currentUser.email
    )

    if (alreadyRequested) {
      alert('You have already requested this book!')
      return
    }

    const newRequest = {
      id: Date.now(),
      bookTitle: book.title,
      userName: currentUser.name,
      userEmail: currentUser.email,
      status: 'Pending'
    }

    const updatedRequests = [...requests, newRequest]

    setRequests(updatedRequests)
    localStorage.setItem('requests', JSON.stringify(updatedRequests))

    alert('Book request submitted successfully!')
  }

  function getStatusClass(status) {
    if (status === 'Approved') return 'status-approved'
    if (status === 'Rejected') return 'status-rejected'
    return 'status-pending'
  }

  return (
    <div className="user-dashboard">

      {/* Welcome Section */}
      <section className="user-hero">
        <div className="hero-content">
          <span className="hero-tag">YOUR DIGITAL LIBRARY</span>

          <h2>Welcome back, {currentUser.name}!</h2>

          <p>
            Discover your next favourite book. Explore, learn
            and grow with LibraX.
          </p>

          <a href="#available-books" className="hero-button">
            Explore Books <span>→</span>
          </a>
        </div>

        <div className="hero-decoration">📚</div>
      </section>

      {/* Statistics */}
      <section className="user-stats">

        <div className="stat-card">
          <span className="stat-icon">📖</span>
          <div>
            <h3>{books.length}</h3>
            <p>Available Books</p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">📝</span>
          <div>
            <h3>{myRequests.length}</h3>
            <p>My Requests</p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <div>
            <h3>
              {myRequests.filter((r) => r.status === 'Approved').length}
            </h3>
            <p>Approved Requests</p>
          </div>
        </div>

      </section>

      {/* Book Collection */}
      <section className="library-section" id="available-books">

        <div className="section-heading">
          <div>
            <span className="section-label">EXPLORE COLLECTION</span>
            <h2>Discover Books</h2>
            <p>Find the perfect book for your learning journey.</p>
          </div>
        </div>

        <div className="library-search">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search by title, author or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="book-count-row">
          <h3 className="book-count">Available Books</h3>
          <span className="book-total">
            {filteredBooks.length} Books
          </span>
        </div>

        {filteredBooks.length === 0 ? (

          <div className="empty-state">
            <span>📚</span>
            <h3>No books found</h3>
            <p>Try searching with another title or author.</p>
          </div>

        ) : (

          <div className="book-grid">

            {filteredBooks.map((book) => (

              <article className="book-card" key={book.id}>

                <div className="book-image">

                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.nextElementSibling.style.display = 'grid'
                      }}
                    />
                  ) : null}

                  <div
                    className="book-image-fallback"
                    style={{
                      display: book.image ? 'none' : 'grid'
                    }}
                  >
                    <span>📖</span>
                    <small>LIBRAX COLLECTION</small>
                  </div>

                  <span className="book-category">
                    {book.category}
                  </span>

                </div>

                <div className="book-info">

                  <h3>{book.title}</h3>

                  <p className="book-author">
                    By {book.author}
                  </p>

                  <button
                    className="request-button"
                    onClick={() => requestBook(book)}
                  >
                    Request Book <span>→</span>
                  </button>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

      {/* My Requests */}
      <section className="my-requests-section">

        <div className="section-heading">
          <div>
            <span className="section-label">YOUR ACTIVITY</span>
            <h2>My Book Requests</h2>
            <p>Track the status of your requested books.</p>
          </div>
        </div>

        {myRequests.length === 0 ? (

          <div className="empty-state">
            <span>📝</span>
            <h3>No requests yet</h3>
            <p>Explore the collection and request your first book.</p>
          </div>

        ) : (

          <div className="request-list">

            {myRequests.map((request) => (

              <div className="request-card" key={request.id}>

                <div className="request-book-icon">📕</div>

                <div className="request-book-details">
                  <h3>{request.bookTitle}</h3>
                  <p>Book request</p>
                </div>

                <span
                  className={`request-status ${getStatusClass(request.status)}`}
                >
                  {request.status}
                </span>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* Footer */}
      <div className="user-footer-note">
        <p>Keep reading. Keep learning. Keep growing. ✨</p>
        <span>LibraX — Your knowledge, your library.</span>
      </div>

    </div>
  )
}

export default UserDashboard
