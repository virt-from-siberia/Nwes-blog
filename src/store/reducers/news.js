import api from "../../api/api";
const NEWS_FETCHING = "NEWS_FETCHING";
const NEWS_SET_DATA = "NEWS_SET_DATA";
const NEWS_ADD = "NEWS_ADD";
const NEWS_APPROVE = "NEWS_APPROVE";
const NEWS_REJECT = "NEWS_REJECT";

const initialState = {
  news: [],
  isFetching: false,
  approvNews: 0,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEWS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    case NEWS_SET_DATA: {
      let count = 0;
      action.data.forEach((i) => {
        if (!i.approved) {
          count++;
        }
      });
      return { ...state, approvNews: count, news: [...action.data] };
    }

    case NEWS_APPROVE: {
      const newData = state.news.map((el) => {
        if (el.id === action.id) {
          return {
            ...el,
            approved: true,
          };
        }
        return el;
      });

      localStorage.setItem("newsData", JSON.stringify(newData));
      return {
        ...state,
        news: newData,
        approvNews:
          state.approvNews !== 0 ? state.approvNews - 1 : state.approvNews,
      };
    }

    case NEWS_ADD: {
      const payload = action;
      delete payload.type;

      const newData = {
        news: [
          ...state.news,
          {
            ...payload,
            approved: false,
          },
        ],
        approvNews: state.approvNews + 1,
      };

      localStorage.setItem("newsData", JSON.stringify(newData.news));
      return { ...state, ...newData };
    }

    case NEWS_REJECT: {
      let checkApproved = false;

      const newData = {
        ...state,
        news: state.news.filter((el) => {
          if (!el.approved) {
            checkApproved = true;
          }
          return el.id !== action.id;
        }),
        approvNews: checkApproved ? state.approvNews - 1 : state.approvNews,
      };
      localStorage.setItem("newsData", JSON.stringify(newData.news));
      return { ...newData };
    }
    default:
      return state;
  }
};

const toggleIsFetching = (isFetching) => ({
  type: NEWS_FETCHING,
  isFetching,
});

const setNews = (data) => ({
  type: NEWS_SET_DATA,
  data,
});

export const approveNews = (id) => ({
  type: NEWS_APPROVE,
  id,
});

export const rejectNews = (id) => ({
  type: NEWS_REJECT,
  id,
});

const recordNews = (header, text, id, author, authorId, createdAt) => ({
  type: NEWS_ADD,
  header,
  text,
  id,
  author,
  authorId,
  createdAt,
});

export const getNews = () => (dispatch) => {
  dispatch(toggleIsFetching(true));
  const resault = api.getNewsFromApi();
  dispatch(setNews(resault));
  dispatch(toggleIsFetching(false));
};

export const addNews = (header, text, authorId, author) => (dispatch) => {
  const createdAt = new Date()
    .toLocaleString()
    .replace(",", "")
    .replace(/:.. /, " ");
  const id = Math.floor(Math.random() * 1000);
  dispatch(recordNews(header, text, id, author, authorId, createdAt));
};

export default newsReducer;
