import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import request from 'request'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  collagePaper: {
    minHeight: theme.spacing(80)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  circularProgress: {
    marginLeft: 'auto',
    marginTop: 'auto'
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Collage() {

  function getCollage(user, height, width) {
    return new Promise((resolve, reject) => {
      const API_URL = process.env.REACT_APP_API_ADDRESS
      const uri = `${API_URL}/collage`
      const qs = { user, height, width }
      console.log({ uri, qs })
      let data
      request({ uri, qs })
        .on("data", (chunk) => {
          console.log("Chunk", chunk)
          return data = data ? Buffer.concat([data, chunk]) : chunk
        })
        .on('end', () => {
          console.log("Stream ended")
          resolve(data)
        })
        .on('error', reject)
    })
  }

  async function onSubmit(evt) {
    evt.preventDefault()
    setState({ ...state, loading: true })
    const { user, height, width } = state
    const collage = await getCollage(user, height, width)
    setState({ ...state, collage, loading: false })
  }

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const classes = useStyles()

  const [state, setState] = React.useState({
    user: '',
    height: '5',
    width: '5',
    collage: null,
    loading: false
  })

  const b64 = !!state.collage ? new Buffer(state.collage).toString('base64') : null
  const mimeType = 'image/png'

  const LoadingSpinner = (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={4} />
      <Grid item xs={4}>
        <CircularProgress className={classes.circularProgress} size={80} color="primary" />
      </Grid>
      <Grid item xs={4} />
    </Grid>
  )

  return (
    <React.Fragment>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <form onSubmit={onSubmit}>
              <Grid container spacing={2} direction="column">
                <Grid item xs={3}>
                  <TextField
                    id="user"
                    label="Last.fm User"
                    className={classes.textField}
                    value={state.user}
                    onChange={handleChange('user')}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="height"
                    label="Height"
                    type="number"
                    className={classes.textField}
                    value={state.height}
                    onChange={handleChange('height')}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="width"
                    label="Width"
                    type="number"
                    className={classes.textField}
                    value={state.width}
                    onChange={handleChange('width')}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button variant="outlined" type="submit" color="primary">Submit</Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classNames(classes.paper, classes.collagePaper)}>
            {
              state.loading ? (LoadingSpinner) : (<img src={!!b64 ? `data:${mimeType};base64,${b64}` : null} />)
            }
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Collage;
