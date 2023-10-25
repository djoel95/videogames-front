import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory  } from "react-router-dom";

import style from "./styles.module.css";
import {
  postVideogame,
  getGenre,
  getPlatforms,
} from "../../store/videogame/action";

function validate(input) {
  let errors = {};
  const urlRegex = /^https?:\/\/.*$/i;
  const imageRegex = /^https?:\/\/.*\.(jpg|jpeg)$/i;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;

  if (!input.name.trim()) {
    errors.name = "Write a name, please";
  } else if (/\d/.test(input.name)) {
    errors.name = "Game name cannot contain numbers";
  } else if (specialCharsRegex.test(input.name)) {
    errors.name = "Game name cannot contain special characters";
  } else if (input.name.length < 3) {
    errors.name = "Game name must be at least 3 characters long";
  }

  if (!input.image.trim() || !imageRegex.test(input.image)) {
    errors.image = "Write a valid image URL, please";
  }
  if (!input.description.trim()) {
    errors.description = "Write a description, please";
  } else if (specialCharsRegex.test(input.description)) {
    errors.description = "Game description cannot contain special characters";
  }
  if (input.platforms.length === 0) {
    errors.platforms = "Select a platform, please";
  }
  if (input.genres.length === 0) {
    errors.genres = "Select a genre, please";
  }
  if (!input.released.trim() || !dateRegex.test(input.released)) {
    errors.released = "Write a valid release date (YYYY-MM-DD), please";
  } else if (new Date(input.released) > new Date()) {
    errors.released = "Release date cannot be in the future";
  }
  if (!input.rating.trim() || isNaN(parseFloat(input.rating))) {
    errors.rating = "Write a valid rating, please";
  } else if (parseFloat(input.rating) < 0 || parseFloat(input.rating) > 5) {
    errors.rating = "Rating must be between 0 and 5";
  }

  return errors;
}
const FormVideogames = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({ 
    name: "", 
    image: "", 
    description: "", 
    released: "", 
    rating: "", 
    platforms: [], 
    genres: [], 
  });
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
  });


  
  const disableBut = () => {
    if (
      input.name === "" ||
      input.description === "" ||
      input.platforms.length === 0 ||
      input.image === "" ||
      input.released === "" ||
      input.rating === "" ||
      input.genres.length === 0
    ) {
      return true;
    }
    
    return false;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate({ ...input, [name]: value })[name],
    }));
  };
  const handleGenres = (e) => {
    const { value } = e.target;
    setInput((prevInput) => {
      const updatedGenres = [...prevInput.genres, Number(value)];
      return {
        ...prevInput,
        genres: updatedGenres,
      };
    });
  };
  
  const handlePlatforms = (e) => {
    const { value } = e.target;
    setInput((prevInput) => {
      const updatedPlatforms = [...prevInput.platforms, Number(value)];
      return {
        ...prevInput,
        platforms: updatedPlatforms,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      dispatch(postVideogame(input));
      alert("Videogame created 👌");
      setInput({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        genre: [],
        platform:[],
      });
      history.push("/games");
    } else {
      return;
    }
  };
  const handleDeletePlatform = (g) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((platform) => platform !== g),
    });
  };

  const handleDeleteGenre = (g) => {
    setInput({
      ...input,
      genres: input.genres.filter((genre) => genre !== g),
    });
  };




  useEffect(() => {
    dispatch(getPlatforms());
    dispatch(getGenre());
  }, [dispatch]);


  return (
    <div className={style.mainContainer}>
      <h1 className={style.h1}>Add Videogames</h1>
      <div className={style.actions}>
        <Link to="/games">
          <button className={style.bot2}>Back To Home</button>
        </Link>
      </div>
      <form className={style.formarea} onSubmit={(e) => handleSubmit(e)}>
        <div className={style.detailsarea}>
          <label>Game Name</label>
          <input
            placeholder="Game Name"
            onBlur={handleOnChange}
            type="text"
            name="name"
            value={input.name}
            onChange={(e) => handleOnChange(e)}
          />
          {errors.name && <p className={style.error}> {errors.name} </p>}
        </div>
        <div className={style.detailsarea}>
          <label>Image</label>
          <input
            placeholder="Image"
            onBlur={handleOnChange}
            type="text"
            name="image"
            value={input.image}
            alt="image"
            onChange={(e) => handleOnChange(e)}
          />
          {errors.image && <p className={style.error}> {errors.image} </p>}
        </div>
        <div className={[style.detailsarea, style.maxArea].join(" ")}>
          <label>Description</label>
          <textarea
            placeholder="Description"
            onBlur={handleOnChange}
            onChange={handleOnChange}
            type="text"
            name="description"
            value={input.description}
          />
          {errors.description && (
            <p className={style.error}> {errors.description} </p>
          )}
        </div>
        <div className={style.detailsarea}>
          <label>Released</label>
          <input
            type="date"
            name="released"
            value={input.released}
            placeholder="YYYY-MM-DD"
            onChange={(e) => handleOnChange(e)}
          />
          {errors.released && (
            <p className={style.error}> {errors.released} </p>
          )}
        </div>
        <div className={style.detailsarea}>
          <label>Rating</label>
          <input
            onBlur={handleOnChange}
            type="text"
            name="rating"
            value={input.rating}
            placeholder="0 to 5"
            onChange={(e) => handleOnChange(e)}
          />
          {errors.rating && <p className={style.error}> {errors.rating} </p>}
        </div>
        <div className={style.detailsarea}>
          <label>Platforms</label>
          <select name="platforms" onChange={handlePlatforms}>
            {platforms?.map((p) => {
              return <option key={p?.id} value={p?.id}>{p?.name}</option>;
            })}
          </select>
          {errors.platforms && <p className={style.error}> {errors.platforms} </p>}
        </div>
        <div className={style.detailsarea}>
          <label>Genres</label>
          <select name='genres' onChange={handleGenres}>
            {genres?.map((p) => {
              return <option key={p?.id} value={p?.id}>{p?.name}</option>;
            })}
          </select>
          {errors.genres && <p className={style.error}> {errors.genres} </p>}
        </div>
        <div className={style.labelContainer}>
          {[...platforms || []]?.filter((p) => input?.platforms?.includes(p.id)).map((p) => (
            <div className={style.labelSelected} onClick={() => handleDeletePlatform(p.id)} >
              <span className={style.labelRemove}>X</span>
              <p className={style.labelText}>{p?.name}</p>
            </div>
          ))}
        </div>
        <div className={style.labelContainer}>
          {[...genres || []]?.filter((g) => input?.genres?.includes(g.id)).map((g) => (
            <div className={style.labelSelected} onClick={() => handleDeleteGenre(g.id)}>
              <span className={style.labelRemove}>X</span>
              <p className={style.labelText}>{g?.name}</p>
            </div>
          ))}
        </div>
        <button className={style.bot} type={"submit"} disabled={disableBut()}>
          Add Game
        </button>
      </form>
    </div>
  );
};

export default FormVideogames;
