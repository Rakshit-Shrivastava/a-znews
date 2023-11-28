import React, { useState, useEffect } from 'react';
import NewItem from './NewItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [page, setPage] = useState(null);
    const [end, setEnd] = useState(false);
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [nextPage, setNextPage] = useState(null);
    let url = null;

    async function fetchData() {
        try {
            document.title = `A-Znews -  ${[...props.category][0].toUpperCase() + [...props.category].slice(1).join('')} news`;
            if (nextPage === null) {
                url = `https://newsdata.io/api/1/news?apikey=pub_33461cebb3d580b3c7f9cf5c8b9675e47acfd&category=${props.category}&country=in&language=en`;
            } else {
                url = `https://newsdata.io/api/1/news?apikey=pub_33461cebb3d580b3c7f9cf5c8b9675e47acfd&category=${props.category}&country=in&language=en&page=${page}`;
            };
            let data = await fetch(url);
            let parsedData = await data.json();
            setArticles(articles.concat(parsedData.results));
            setNextPage(parsedData.nextPage);
            setLoading(false);
            setTotalResults(parsedData.totalResults);
            if (articles.length + parsedData.results.length === totalResults) {
                setEnd(true);
            };
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [page]);

    const fetchMoreData = () => {
        setPage(nextPage);
    };

    return (
        <div>
            <h2 className='text-center my-4'>A-Znews - Top Headlines of Today</h2>
            {loading ? <Spinner /> : ''}
            <InfiniteScroll
                dataLength={articles.length}
                hasMore={articles.length !== totalResults}
                next={fetchMoreData}
                loader={<Spinner />}>
                <div className="container">
                    <div className="row">
                        {articles.map((article) => {
                            return <div className="col-md-4" key={article.article_id}>
                                <NewItem title={article.title} description={article.description} image={article.image_url} url={article.link} author={article.creator} date={article.pubDate} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {end && <h6 className='text-center'>End of the page</h6>}
        </div>
    )
}

News.defaultProps = {
    category: 'world'
};

News.propTypes = {
    category: PropTypes.string
}

export default News