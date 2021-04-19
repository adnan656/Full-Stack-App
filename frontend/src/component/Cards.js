import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Box from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth:300,
   borderTopWidth: 0.5, borderColor: 'black',
   borderStyle: 'solid'
  },
  media: {
    height: 1,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  actionArea: {
    borderRadius: 16,
    transition: '0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },

}));

export default function Cards({label, url, image, }) {
  const classes = useStyles();

  return (

<Card  className={classes.root}>
<CardActionArea  className={classes.actionArea} aria-label="website"  href={url} target="_blank" rel="noopenernoreferrer">


      <CardHeader className={classes.label} title={label} />
      <CardMedia  className={classes.media} image={image} title={label} />
      </CardActionArea>

     

  
    </Card>




  );
}
