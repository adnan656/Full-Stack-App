import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { useHistory } from "react-router";
import { withRouter } from "react-router-dom";

import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOpenSharpIcon from "@material-ui/icons/LockOpenSharp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

toast.configure({
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

const useStyles = makeStyles({
  Paper: {
    padding: "51px",
    height: "50vh",
    width: 285,
    margin: "150px auto",
  },
  Avatar: {
    backgroundColor: "darkcyan",
  },
  Button: {
    marginTop: "20px",
  },
  CreateAccount: {
    marginTop: "20px",
  },
});

const inititalState = {
  email: "",
  password: "",
};

const formValidation = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    axios({
      method: "POST",
      url: "http://localhost:8080/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        if (res.data.success) {
          history.push("/homepage");
        }
        if (res.data.error) {
          toast.error(res.data.error);
        }
      })
      .catch((err) => toast.error(err));
  };

  return (
    <Grid container>
      <Paper className={classes.Paper} elevation={10}>
        <Grid align="center">
          <Avatar className={classes.Avatar}>
            <LockOpenSharpIcon />
          </Avatar>
          <h2> Log In </h2>
        </Grid>

        <Formik
          initialValues={{ ...inititalState }}
          validationSchema={formValidation}
        >
          {({ errors, handleBlur, handleChange, touched, values }) => (
            <Form autoComplete="off">
              <Field
                as={TextField}
                name="email"
                error={Boolean(touched.email && errors.email)}
                placeholder="Email"
                label=" Enter Email"
                fullWidth
                onBlur={handleBlur}
                onChange={(event) => {
                  handleChange(event);
                  setEmail(event.target.value);
                }}
                value={values.email}
                type="email"
              />

              <Field
                as={TextField}
                error={Boolean(touched.password && errors.password)}
                name="password"
                placeholder="Password"
                label=" Enter Password"
                fullWidth
                onBlur={handleBlur}
                onChange={(event) => {
                  handleChange(event);
                  setPassword(event.target.value);
                }}
                value={values.password}
                type="password"
              />

              <Button
                type="submit"
                onClick={handleSubmit}
                className={classes.Button}
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>

              <Typography className={classes.CreateAccount}>
                Create an account?
                <Link href="/register"> sign up </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default withRouter(Login);
