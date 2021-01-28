import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Loading from '../Loading/Loading';

function SearchCommon({ movies, loading }) {
  return (
    <div>
      <ul className="image-wrapper">
        {loading && <Loading />}
        {!loading
        && movies && movies.length > 0 && movies.map((movie) => (
          <li key={movie.id || Math.random() * Date.now()} className="movie-card">
            {
            movie.poster_path !== null
            && (
            <>
              <button type="button" className="favorite-button">
                <FavoriteIcon />
              </button>
              <Link to={`/detail/${movie.id}`}>
                <img className="movie-photo" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} />
              </Link>
            </>
            )
          }
          </li>
        ))}

      </ul>
    </div>
  );
}

function mapStateToProps({ movieReducer }) {
  return {
    loading: movieReducer.loading,
  };
}

export default connect(mapStateToProps)(SearchCommon);
