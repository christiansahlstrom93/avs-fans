import { useEffect, useContext } from "react";
import { NewsContext } from "../../contexts/newsContext";

import "./LatestNews.css";

const LatestNews = () => {
  const [{ data, loading }, fetchNews] = useContext(NewsContext);

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="loadingSim">
        <div className="loader circle" />
        <div className="loadingText">Loadig news...</div>
      </div>
    );
  }

  if (!data || !data.length) {
    return <div className="no-news">No news...</div>;
  }

  const renderImg = (src) => {
    if (!src) return null;
    return (
      <div className="img-container">
        <img className="article-img" src={src} />
      </div>
    );
  };

  const renderArticles = () => {
    return data.map((article, i) => {
      return (
        <div key={i} className="article">
          <h3>{article.headline}</h3>
          <h4>{article.subHeader}</h4>
          {renderImg(article.imgSrc)}
          <div dangerouslySetInnerHTML={{ __html: article.preview }} />
          <div dangerouslySetInnerHTML={{ __html: article.body }} />
        </div>
      );
    });
  };

  return (
    <div className="latest">
      <h2>Latest news</h2>
      {renderArticles()}
    </div>
  );
};

export default LatestNews;
