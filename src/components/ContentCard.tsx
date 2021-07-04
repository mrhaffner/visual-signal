import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 350,
    margin: 15,
  },
  title: {
    fontSize: 14,
  },
});

function ContentCard( props: {title: string} ) {
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography component="h2">
          {props.title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ContentCard;