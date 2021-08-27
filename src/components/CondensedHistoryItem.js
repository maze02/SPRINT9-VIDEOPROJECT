import moment from "moment";
import CardTertiary from "../components/UI/TertiaryCard";

const CondensedHistoryItem = ({ url, searchTerm, date }) => {
  return (
    <CardTertiary>
      <article className="history-info">
        <div class="image-cropper">
          <img src={url} alt={searchTerm} />
        </div>
        <div className="history-text">
          <h4>{searchTerm} &#183;</h4>
          <p>
            {moment(
              date.substring(0, 19).replace("T", " "),
              "YYYY-MM-DD hh:mm:ss"
            ).fromNow()}
          </p>
        </div>
      </article>

      <div className="button-wrapper">
        <button>View videos</button>
      </div>
    </CardTertiary>
  );
};

export default CondensedHistoryItem;

//  {moment("2021-08-27 11:20:10", "YYYY-MM-DD hh:mm:ss").fromNow()}
