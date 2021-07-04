import NavBar from './components/NavBar'
import ContentCard from './components/ContentCard';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core/';


function App() {
  return (
    <div>
      <NavBar />
      <Grid container spacing={3}>
        <Grid container item direction="column">
          <ContentCard />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;