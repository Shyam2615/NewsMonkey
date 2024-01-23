import React from "react";

const Newsitem =(props)=> {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      props;

      const handleClick = ()=>{
          window.location.href = props.newsUrl;
      }
    return (
      <div>
        <div className="card my-3 shadow-lg" >
          <img id="img" onClick={handleClick} src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <span
              className="badge rounded-pill bg-danger"
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "5px",
                marginTop: "-5px",
              }}
            >
              {source}
            </span>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
}

export default Newsitem