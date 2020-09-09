import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch } from "react-redux";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSnackbar } from "notistack";
import { Field, reduxForm } from "redux-form";
import { makeStyles } from "@material-ui/styles";
import SaveIcon from "@material-ui/icons/Save";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { AuthContext } from "../context/AuthContext";
import { addNews } from "../store/reducers/news";

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: "auto",
  },
  inputs: {
    paddingTop: 50,
  },
}));

export default function FormDialog({ isOpenModal, setIsOpenModal }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const setNotifyDangerChange = () => {
    enqueueSnackbar("Поля не должны быть пустыми", {
      variant: "error",
      preventDuplicate: true,
    });
  };
  const setNotifySuccessChange = () => {
    enqueueSnackbar("Новость успешно добавлена", {
      variant: "success",
      preventDuplicate: true,
    });
  };

  React.useEffect(() => {
    if (isOpenModal) {
      setOpen(true);
    }
  }, [isOpenModal]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setIsOpenModal(false);
    setOpen(false);
  };

  const validate = (values) => {
    const errors = {};
    const requiredFields = ["header", "text"];

    requiredFields.forEach((field) => {
      if (!values[field]) {
        errors[field] = "Заполните поле";
      }
    });
    return errors;
  };

  const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <TextField
      style={{ minWidth: "550px" }}
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      variant='outlined'
      rows={4}
      multiline
      type='text'
      margin='dense'
      fullWidth
      {...input}
      {...custom}
    />
  );

  const GroupNameInputs = (props) => {
    const onHandleSeve = () => {
      if (props.invalid) {
        setNotifyDangerChange();
      }
    };

    return (
      <form onSubmit={props.handleSubmit}>
        <DialogContent>
          <div className={classes.inputs}>
            <Field
              name='header'
              component={renderTextField}
              label='Заголовок новости'
            />
            <Field name='text' component={renderTextField} label='Описание' />
            <div />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant='contained'
            style={{
              backgroundColor: "red",
              color: "white",
            }}
          >
            отмена
          </Button>
          <Button
            variant='contained'
            style={{
              backgroundColor: "rgb(63, 81, 181)",
              color: "white",
            }}
            startIcon={<SaveIcon />}
            type='submit'
            onClick={onHandleSeve}
            className='change-password-btn'
          >
            создать
          </Button>
        </DialogActions>
      </form>
    );
  };

  const ReduxGroupNameInputs = reduxForm({
    form: "formData",
    validate,
  })(GroupNameInputs);

  const onHandlerCreateGroup = (formData) => {
    const { header, text } = formData;
    dispatch(addNews(header, text, auth.userId, auth.name));
    setNotifySuccessChange();
    handleClose();
  };

  return (
    <div>
      {auth.isAuthenticated ? (
        <Button
          style={{
            backgroundColor: "darkblue",
            color: "white",
            marginTop: "15px",
          }}
          variant='contained'
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleClickOpen}
        >
          добавить новость
        </Button>
      ) : null}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        minwidth={400}
        style={{ minWidth: "400px" }}
      >
        <DialogTitle id='form-dialog-title'>Добавить новость</DialogTitle>

        <ReduxGroupNameInputs onSubmit={onHandlerCreateGroup} />
      </Dialog>
    </div>
  );
}
