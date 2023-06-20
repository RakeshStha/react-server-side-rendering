import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../shared/loader/Loader";
import { getFilm } from "../../actions/filmActions";
import SEO from "../shared/SEO";

const FilmDetail = () => {
  const params = useParams();
  const id = params?.id;
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const { film, loading } = useSelector(
    (state) => ({
      loading: state.films.processing,
      film: state.films.film,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(getFilm(id));
  }, []);

  useEffect(() => {
    setData(film?.results);
  }, [film]);

  return (
    <>
      <SEO
        title={"Films Details"}
        description={"Films Details"}
        name={"Films description"}
        type={"article"}
      />
      {loading ? (
        <Loader />
      ) : (
        <div className="container text-center my-5 py-5">
          <div className="container d-flex align-items-center justify-content-center">
            <div className="card m-3">
              <div className="card-body text-center">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h6>Film details</h6>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <img
                      className="img-fluid "
                      src={data?.primaryImage?.url}
                      alt={data?.titleText?.text}
                    />
                  </div>
                  <div className="col-sm-6">
                    <h6 className="mt-2">{data?.titleText?.text}</h6>
                    <p>Original title is {data?.originalTitleText?.text}</p>
                    <small className="text-muted">
                      {data?.releaseDate?.year && <b>Release Date: </b>}
                      {data?.releaseDate?.year}
                      {data?.releaseDate?.month &&
                        "-" + data?.releaseDate?.month}
                      {data?.releaseDate?.day && "-" + data?.releaseDate?.day}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilmDetail;
