
import { useState } from 'react'

function UserDashboard({ currentUser }) {
  const [books] = useState(
    JSON.parse(localStorage.getItem('books')) || []
  )

  const [requests, setRequests] = useState(
    JSON.parse(localStorage.getItem('requests')) || []
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
          <span className="book-total">{filteredBooks.length} Books</span>
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
                    style={{ display: book.image ? 'none' : 'grid' }}
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

                <span className={`request-status ${getStatusClass(request.status)}`}>
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
