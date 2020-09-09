import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { useSnackbar } from "notistack";
import CloseIcon from "@material-ui/icons/Close";

import useOutsideClick from "../hooks/outsideClick.hook";
import { userLogin } from "../store/reducers/login";
import { AuthContext } from "@/context/AuthContext";

const Login = ({
  values,
  handleChange,
  errors,
  touched,
  setShowPopap,
  showPopap,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const auth = useContext(AuthContext);

  const {
    successLogin,
    isFetching,
    errorLogin,
    user: { userId, token, name },
  } = useSelector((store) => store.user);

  const ref = useRef();

  useOutsideClick(ref, () => {
    if (showPopap) {
      setShowPopap(false);
    }
  });

  useEffect(() => {
    if (successLogin) {
      setShowPopap(false);
      auth.login(token, userId, name);
      setNotifySuccessChange();
    }
  }, [successLogin]);

  const setNotifySuccessChange = () => {
    enqueueSnackbar("Вход в систему выполнен успешно", {
      variant: "success",
      preventDuplicate: true,
    });
  };

  const handleClosePopup = (evt) => {
    evt.preventDefault();
    setShowPopap(false);
  };

  return (
    <div className='auth' ref={ref}>
      <div className='auth__block'>
        <div className='auth__block__content'>
          <div className='registartion'>
            <h2>Вход в систему</h2>
            {errorLogin && errorLogin ? (
              <Alert variant='filled' severity='error'>
                Данные не верны
              </Alert>
            ) : null}
            <Form className='registartion__forms'>
              <div>
                <div className='error'>
                  {touched.email && errors.email && <p>{errors.email}</p>}
                </div>

                <Field
                  type='email'
                  name='email'
                  autoComplete='off'
                  placeholder='Email'
                  spellCheck='false'
                  value={values.email.trim()}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className='error'>
                  {touched.password && errors.password && (
                    <p>{errors.password}</p>
                  )}
                </div>
                <div>
                  <Field
                    type={(showPassword && "text") || "password"}
                    name='password'
                    autoComplete='off'
                    placeholder='Пароль'
                    spellCheck='false'
                    value={values.password.trim()}
                  />

                  <div
                    className='show-password'
                    onMouseEnter={() => setShowPassword(true)}
                    onMouseLeave={() => setShowPassword(false)}
                  >
                    {(!showPassword && <VisibilityOffIcon />) || (
                      <VisibilityIcon />
                    )}
                  </div>
                </div>
              </div>
              {isFetching ? (
                <div className='spinner '>
                  <CircularProgress />
                </div>
              ) : null}

              <button
                className='btn btn-login'
                disabled={isFetching ? true : false}
              >
                Вход
              </button>
            </Form>
          </div>
          <Link className='log-change' onClick={handleClosePopup}>
            <CloseIcon /> Отмена
          </Link>
        </div>
      </div>
    </div>
  );
};

const FormikApp = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: email || "",
      password: password || "",
    };
  },
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email("Введите валидный Email")
      .required("Введите Email"),
    password: yup
      .string()
      .min(8, "Пароль не должен быть менее 8 символов")
      .required("Введиет пароль"),
  }),

  handleSubmit(values, { props }) {
    props.dispatch(userLogin(values.email, values.password));
  },
})(Login);

export default FormikApp;
