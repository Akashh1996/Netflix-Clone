/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';
import './MoviesList.scss';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';
import { checkFav, handleClick } from '../../util/functions';
import { addFav, deleteFav } from '../../redux/actions/userAction';

const useStyles = makeStyles(() => ({
  button: {
    background: '#0077CC',
    color: 'White',
    '&:hover': {
      backgroundColor: '#2D6FF7',
      color: '#white',
    },
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '10px',
    paddingBottom: '10px',
    fontSize: '12px',
    colorAdjust: 'economy',
    fontFamily: 'Roboto',

  },
  modal: {
    color: 'red',
    fontFamily: 'Roboto',
    fontSize: '16px',
  },

}));

function MoviesListComponent({
  movies, allMovies, dispatch, getUserDB,
}) {
  const [moviesCategories] = useState(allMovies[movies]);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const userLocalStorage = JSON.parse(window.localStorage.getItem('user'));
  const loggedUser = userLocalStorage?.user?.email;

  const clickObject = {
    loggedUser,
    handleClickOpen,
    dispatch,
    addFav,
    deleteFav,
    fav: getUserDB?.favourites,
  };

  return (
    <div id={movies}>
      <div>
        <Dialog
          id="alert"
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              className={classes.modal}

            >
              LogIn To Add To favourites
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              id="close-alert"
              style={{ color: '#E50914' }}
              autoFocus
            >
              ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div className="now-playing" id="now-playing">
        <p className="movie-category">{movies}</p>
      </div>
      <ul className="image-wrapper">
        {
          moviesCategories && moviesCategories.map((movieList) => (
            <li key={movieList.id} className="movie-card">
              {
              movieList.poster_path !== null
              && (
              <>
                <button
                  type="button"
                  className={checkFav(movieList.id, getUserDB?.favourites) ? 'favorite-button favorite-button-active' : 'favorite-button'}
                  onClick={() => handleClick(movieList, clickObject)}
                >
                  <FavoriteIcon />
                </button>
                <Link to={`/detail/${movieList.id}`}>
                  {' '}
                  <img className="movie-photo" src={`https://image.tmdb.org/t/p/w500/${movieList.poster_path}`} alt={movieList.original_title} />
                </Link>

              </>
              )
            }
            </li>
          ))
      }

      </ul>
    </div>
  );
}

function mapStateToProps({ movieReducer, userReducer }) {
  return {
    allMovies: movieReducer.allMovies,
    getUserDB: userReducer.getUserDB,
  };
}
export default connect(mapStateToProps)(MoviesListComponent);
