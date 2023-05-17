function Bookmark({ isBookmarked, onClick }) {
  return (
    <div style={{ cursor: "pointer" }}>
      {isBookmarked ? (
        <img src="/bookmark-on.png" alt="bookmark-on" onClick={onClick} />
      ) : (
        <img src="/bookmark-off.png" alt="bookmark-off" onClick={onClick} />
      )}
    </div>
  );
}

export default Bookmark;
