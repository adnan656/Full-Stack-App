import React, { useState } from "react";
import Cards from "../component/Cards";

import { Grid, Paper, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";

import gymPic from "./gym.jpeg";
import foodPic from "./food.jpeg";
const useStyles = makeStyles({
  Paper: {
    padding: "51px",
    height: "80vh",
    width: 1000,
    margin: "100px auto",
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
  cardContainer: {
    border: "25px",
    margin: "26px",
  },
});

const HomePage = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Paper className={classes.Paper} elevation={10}>
        <Grid align="center">
          <Avatar className={classes.Avatar}>
            <HomeTwoToneIcon />
          </Avatar>
          <h1> HOMEPAGE </h1>
          <h2> Check Out My Other Projects Below!</h2>
        </Grid>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
          className={classes.cardContainer}
        >
          <Grid item xs={8} md={6} lg={6}>
            <Cards
              label="Fitness Website"
              url="https://www.maddafitness.com"
              image={gymPic}
            />
          </Grid>

          <Grid item xs={8} md={6} lg={6}>
            <Cards
              label="Recipe App"
              url="https://my-app-food-recipe.herokuapp.com/"
              image={foodPic}
            />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default HomePage;
