import Articales from "../../latestNews";
import "./LatestNews.css";

const LatestNews = () => {
  const renderVideo = (link) => {
    return (
      <div className="video">
        <iframe
          width="100%"
          height="315"
          src={link}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    );
  };

  const renderArticales = () => {
    return Articales.map((article) => {
      return (
        <div className="article">
          <h3 className="headline">{article.headline}</h3>
          <h4 className="title">{article.title}</h4>
          <span className="text">{article.text}</span>
          {article.videoLink ? renderVideo(article.videoLink) : null}
        </div>
      );
    });
  };

  return (
    <div className="latest">
      <h2>Latest news</h2>
      {renderArticales()}
    </div>
  );
};

export default LatestNews;
