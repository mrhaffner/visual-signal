import ContentCard from './ContentCard';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core/';

const data = [{}]

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 350,
    margin: 10,
    backgroundColor: "lightgrey",
  },
});

function ContentColumn() {
  const classes = useStyles();

  return (
    <Grid container item direction="column">
      Title
      {/* <Paper className={classes.root}>
        {
          data[0].cards.map(card => {
            return <ContentCard key={card.id} title={card.title} />
          })
        }
      </Paper> */}
    </Grid>
  );
}

export default ContentColumn;