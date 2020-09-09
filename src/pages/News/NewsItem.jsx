import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import { useDispatch } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import Chip from "@material-ui/core/Chip";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useSnackbar } from "notistack";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DoneIcon from "@material-ui/icons/Done";
import { AuthContext } from "../../context/AuthContext";
import { approveNews, rejectNews } from "../../store/reducers/news";

const NewsItem = React.memo(function NewsItem({ props }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const auth = useContext(AuthContext);

  const setNotifySuccessChange = () => {
    enqueueSnackbar("Новость успешно одобрена", {
      variant: "success",
      preventDuplicate: true,
    });
  };

  const handleApproveNews = () => {
    dispatch(approveNews(props.id));
    setNotifySuccessChange();
  };

  const handleRejectNews = () => {
    dispatch(rejectNews(props.id));
  };

  return (
    <div
      className={
        !props.approved
          ? "news__container-item notapproved"
          : "news__container-item "
      }
    >
      <h2>{props.header}</h2>
      {!props.approved ? (
        <Chip
          icon={<ErrorOutlineIcon />}
          label={
            auth.token !== "admin"
              ? "Новость будет добавлена просле модерации"
              : "требуется модерация"
          }
          color={"primary"}
          deleteIcon={<DoneIcon />}
        />
      ) : null}

      <p>{props.text}</p>
      <div className='info'>
        <h3>{props.author}</h3>
        <p>{props.createdAt}</p>
      </div>
      {!props.approved && auth.token === "admin" ? (
        <>
          <Button
            style={{
              backgroundColor: "darkblue",
              color: "white",
              marginTop: "15px",
              marginRight: "15px",
            }}
            variant='contained'
            startIcon={<AddIcon />}
            onClick={handleApproveNews}
          >
            одобрить
          </Button>
          <Button
            style={{
              backgroundColor: "red",
              color: "white",
              marginTop: "15px",
            }}
            variant='contained'
            startIcon={<DeleteOutlineIcon />}
            onClick={handleRejectNews}
          >
            отклонить
          </Button>
        </>
      ) : null}
    </div>
  );
});

export default NewsItem;
