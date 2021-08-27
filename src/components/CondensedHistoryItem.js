import CardTertiary from "../components/UI/TertiaryCard";

const CondensedHistoryItem = ({ url, searchTerm, date }) => {
  return (
    <CardTertiary>
      <article className="history-info">
        <div class="image-cropper">
          <img src={url} alt={searchTerm} />
        </div>
        <div className="history-text">
          <h4>{searchTerm}</h4>
          <p>4 days ago</p>
          <p>{date}</p>
        </div>
      </article>

      <div className="button-wrapper">
        <button>View videos</button>
      </div>
    </CardTertiary>
  );
};

export default CondensedHistoryItem;
