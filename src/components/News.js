import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
  
  const [articles, setArticles] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [button, setButton] = useState(false);
  
    useEffect(() => {
      window.addEventListener('scroll', () => {
          if (window.scrollY > 400) {
              setButton(true);
          } else {
              setButton(false);
          }
      });
  }, []);


  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=13e99c7b61904b2cb6a6d45ec7e66eca&page=${page}&pagesize=${props.pagesize}`;
    setloading(false)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setloading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${
    props.category.charAt(0).toUpperCase() + props.category.slice(1)
  } - NewsMonkey`;
    updateNews()
  }, []);


  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page+1}&pagesize=${props.pagesize}`;
    setPage(page+1);
    setloading(false)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults)
    setloading(false)
  };

    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px", marginTop: '78px' }}>
          NewsMonkey - Top{" "}
          {props.category.charAt(0).toUpperCase() +
            props.category.slice(1)}{" "}
          Headlines
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title}
                      description={element.description}
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                      }
                      newsUrl={element.url}
                      author={element.author ? element.author : "Unknown"}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
            <div style={  {  display : 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0}}>
            <button type="button" class="btn btn-primary" style={{    padding: '19px',
    borderRadius: '49px'}}>Primary</button>
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
}

News.defaultProps = {
  country: "in",
  pagesize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
};

export default News