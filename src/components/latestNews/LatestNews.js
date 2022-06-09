import { useEffect, useContext, useState } from "react";
import { NewsContext } from "../../contexts/newsContext";

import "./LatestNews.css";

const Article = (props) => {
  const [showMore, setShowMore] = useState(false);
  const { article } = props;
  const renderImg = (src, srcSet) => {
    if (!srcSet && !src) return null;
    return (
      <div className="img-container">
        <img className="article-img" src={src} srcSet={srcSet} />
      </div>
    );
  };

  const renderShowMore = () => {
    if (!showMore) {
      return (
        <div className="show-more-container">
          <button className="show-more" onClick={() => setShowMore(true)}>
            Show more
          </button>
        </div>
      );
    }

    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
        <div className="show-more-container">
          <button onClick={() => setShowMore(false)} className="show-less">
            Show less
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <h1>{article.headline}</h1>
      <h4 className="subheader">{article.subHeader}</h4>
      {renderImg(article.imgSrc, article.srcSet)}
      <div dangerouslySetInnerHTML={{ __html: article.preview }} />
      {renderShowMore()}
    </>
  );
};

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

  const renderArticles = () => {
    return data.map((article, i) => {
      return (
        <div key={i} className="article">
          <Article article={article} />
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
