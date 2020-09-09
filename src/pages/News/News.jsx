import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewsItem from "./NewsItem";
import { AuthContext } from "../../context/AuthContext";
import SerchBar from "../../components/SerchBar";
import { getNews } from "../../store/reducers/news";

const News = React.memo(function News() {
  const dispatch = useDispatch();
  const [newsData, setNewsData] = useState([]);
  const [searchValue, setSearchValue] = useState();

  const { news } = useSelector((store) => store.news);
  const auth = useContext(AuthContext);

  useEffect(() => {
    dispatch(getNews());
  }, []);

  useEffect(() => {
    if (news) {
      setNewsData(news);
    }
  }, [news]);

  useEffect(() => {
    if (searchValue) {
      setNewsData(
        news.filter(
          (el) =>
            el.header.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0 ||
            el.text.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
        )
      );
    } else {
      setNewsData(news);
    }
  }, [searchValue]);

  return (
    <div className='news'>
      <SerchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className='news__container'>
        {newsData && newsData.length
          ? newsData.map((i) => {
              if (
                !i.approved &&
                i.authorId !== auth.userId &&
                auth.token !== "admin"
              ) {
                return null;
              }
              return <NewsItem key={i.id} props={i} />;
            })
          : null}
      </div>
    </div>
  );
});

export default News;
