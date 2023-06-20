import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getFilms } from "../../actions/filmActions";
import Loader from "../shared/loader/Loader";
import SEO from "../shared/SEO";

const Films = () => {
  const [data, setData] = useState([]);

  const { films, loading } = useSelector(
    (state) => ({
      loading: state.films.processing,
      films: state.films.films,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilms());
  }, []);

  useEffect(() => {
    setData(films?.results);
  }, [films]);

  return (
    <div className="container my-5">
      <SEO
        title={"Films"}
        description={"List of films"}
        name={"This is films list"}
        type={"article"}
      />
      {loading ? (
        <Loader />
      ) : (
        <div className="container row d-flex align-items-center justify-content-center">
          <h1 className="text-center">Films</h1>
          {data?.length > 0 ? (
            data?.map((o, i) => {
              return (
                <div className="col-sm-4" key={i}>
                  <div className="card m-3">
                    <div className="card-body text-center">
                      <a href={`/films/${o?.id}`}>
                        <img
                          className="img-fluid home_img"
                          src={o?.primaryImage?.url}
                          alt={o?.id}
                        />
                        <h6 className="mt-2">{o.titleText.text}</h6>
                        <small className="text-muted">
                          {o?.releaseDate?.year && <b>Release Date: </b>}
                          {o?.releaseDate?.year}
                          {o?.releaseDate?.month && "-" + o?.releaseDate?.month}
                          {o?.releaseDate?.day && "-" + o?.releaseDate?.day}
                        </small>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-sm-12">
              <h6 className="text-center">No data available</h6>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Films;
