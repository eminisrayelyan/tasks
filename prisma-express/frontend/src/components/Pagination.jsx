function Pagination({ page, setPage, totalPages }) {
    if (totalPages <= 1) {
      return null;
    }
  
    return (
      <div>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
  
        <span>
          Page {page} of {totalPages}
        </span>
  
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    );
  }
  
  export default Pagination;