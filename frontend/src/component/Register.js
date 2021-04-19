import React, { useState } from "react";
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
import PersonAddSharpIcon from "@material-ui/icons/PersonAddSharp";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import axios from "axios";
import { useHistory } from "react-router";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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
    width: 400,
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
  SignUpGrid: {
    marginTop: "20px",
  },
});

const inititalState = {
  name: "",
  email: "",
  password: "",
};

const formValidation = Yup.object().shape({
  name: Yup.string().required("Name Required"),
  email: Yup.string().email("Invalid Email").required("Email Required"),
  password: Yup.string()
    .required("Password Required")
    .min(8, "Password is too short (8 chars minimum)")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const Register = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    axios({
      method: "POST",
      url: "http://localhost:8080/auth/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        password: password,
        name: name,
      },
    })
      .then((res) => {
        if (res.data.success) {
          history.push("/login");
          toast.success("Account Created");

          console.log(res.data);
        }
        if (res.data.error) {
          toast.error(res.data.error);
          console.log(res.data);
        }
      })
      .catch((err) => toast.error(err));
  };

  return (
    <Grid container>
      <Paper className={classes.Paper} elevation={10}>
        <Grid align="center">
          <Avatar className={classes.Avatar}>
            <PersonAddSharpIcon />
          </Avatar>
          <h2> Create an Account </h2>
        </Grid>

        <Formik
          initialValues={{ ...inititalState }}
          validationSchema={formValidation}
        >
          {({ errors, handleBlur, handleChange, touched, values }) => (
            <Form autoComplete="off">
              <Field
                as={TextField}
                error={Boolean(touched.email && errors.email)}
                name="email"
                helperText={<ErrorMessage name="email" />}
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
                error={Boolean(touched.name && errors.name)}
                placeholder="Name"
                label=" Enter Name"
                name="name"
                helperText={<ErrorMessage name="name" />}
                fullWidth
                onBlur={handleBlur}
                onChange={(event) => {
                  handleChange(event);
                  setName(event.target.value);
                }}
                value={values.name}
                type="text"
              />

              <Field
                as={TextField}
                error={Boolean(touched.password && errors.password)}
                placeholder="Password"
                label=" Enter Password"
                name="password"
                helperText={<ErrorMessage name="password" />}
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
                Sign up
              </Button>
              <Typography className={classes.CreateAccount}>
                Already have an account? <Link href="/login"> log in </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default withRouter(Register);
