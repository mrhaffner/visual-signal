import NavBar from './components/NavBar'
import ContentColumn from './components/ContentColumn';
import { Grid } from '@material-ui/core/';

function App() {
  return (
    <div>
      <NavBar />
      <Grid container spacing={3}>
        <ContentColumn />
      </Grid>
    </div>
  );
}

export default App;