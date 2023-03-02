import React, { useRef } from "react";

const MovieForm = () => {
  const enteredTitle = useRef();
  const enteredOpeningText = useRef();
  const enteredDate = useRef();
  const submitHnadler = (event) => {
    event.preventDefault();
    const newMovieObject = {
      title: enteredTitle.current.value,
      OpeningText: enteredOpeningText.current.value,
      releaseDate: enteredDate.current.value,
    };

    console.log(newMovieObject);
  };
  return (
    <section>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="fw-bold">
            Title
          </label>
          <input
            ref={enteredTitle}
            type="text"
            id="title"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="opening" className="fw-bold">
            Opening Text
          </label>
          <textarea
            ref={enteredOpeningText}
            type="text"
            id="opening"
            rows="3"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="fw-bold">
            Release Date
          </label>
          <input
            ref={enteredDate}
            type="text"
            id="date"
            className="form-control"
          />
        </div>
        <button type="submit" onClick={submitHnadler}>
          Add Movie
        </button>
      </form>
    </section>
  );
};

export default MovieForm;
