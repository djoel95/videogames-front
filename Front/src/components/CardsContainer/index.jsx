import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card";
import style from "./styles.module.css";
import TablaPaginacion from "../Paginacion";
import {
  getPlatforms,
  getGenre,
  filterVideogames,
  order,
  getAllVideogames
} from "../../store/videogame/action";

const Cards = () => {
  const dispatch = useDispatch();
  const videoGames = useSelector((state) => state.videoGames);
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(15);
  const [selectedSort, setSelectedSort] = useState("");
  const [filters, setFilters] = useState({ order: 'ALL', platform: 'ALL', genre: 'ALL', created: 'ALL' })

  const paginateVideogames = useMemo(() => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return videoGames.slice(startIndex, endIndex);
  }, [currentPage, cardsPerPage, videoGames])
    // const paginateVideogames = videoGames 
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
    dispatch(order(event.target.value));
  }
  useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getPlatforms());
    dispatch(getGenre());
  }, [dispatch]);

  const setVideogameFilter = (event) => {
    const name = event?.currentTarget?.name
    const value = event?.currentTarget?.value
    setCurrentPage(1)
    setFilters((old) => {
      const newFilter = { ...old, [name]: value }
      dispatch(filterVideogames(newFilter))
      return newFilter
    })
  }
  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.header}>
          <h1 className={style.headingSub}>Videogames</h1>
        </div>
        <div className={style.gameList}>
          {!!selectedSort && <h3 className={style.sortedIndicator}>
            Sorted by: {selectedSort}
          </h3>}
          <div className={style.gameListControls}>
            <select className={style.select} value={selectedSort} onChange={handleSortChange}>
              <option value="ALL">Sort by</option>
              <option value="AZ">Name AZ</option>
              <option value="ZA">Name ZA</option>
              <option value="ASC">Rating asc </option>
              <option value="DES">Rating des</option>
            </select>

            <select className={style.select} name="genre" value={filters?.genre} onChange={setVideogameFilter}>
              <option value="ALL">All Genre</option>
              {genres?.map((genre) => (<option key={genre.id} value={genre.name}>{genre.name}</option>))}
            </select>

            <select className={style.select} name="platform" value={filters?.platform} onChange={setVideogameFilter}>
              <option value="ALL">All Platform</option>
              {platforms.map((platform) => (<option key={platform.id} value={platform.name}>{platform.name}</option>))}
            </select>

            <select className={style.select} name="created" value={filters?.created} onChange={setVideogameFilter}>
              <option value="ALL">All Origin</option>
              <option value="true">DB</option>
              <option value="false">API</option>
            </select>


          </div>
        </div>

        <div className={style.Container}>
          {paginateVideogames.map((videoGame) => (
            <Card
              key={videoGame.id}
              id={videoGame.id}
              image={videoGame.image}
              name={videoGame.name}
              released={videoGame.released}
              rating={videoGame.rating}
              platforms={videoGame.platform || videoGame.platforms?.map((p) => p.name)}
              genres={videoGame.genre || videoGame.genres?.map((p) => p.name)}
            />
          ))}
        </div>
        <div className={style.paginacion}>
          <TablaPaginacion
            totalCards={videoGames.length}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
};

export default Cards;


// import React, { useEffect, useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Card from "../Card";
// import style from "./styles.module.css";
// import TablaPaginacion from "../Paginacion";
// import {
//   orderByName,
//   orderByRating,
//   getPlatforms,
//   getGenre,
//   filterVideogames
// } from "../../store/videogame/action";
// import Loader from "../Loader";

// const Cards = () => {
//   const dispatch = useDispatch();
//   const videoGames = useSelector((state) => state.videoGames);
//   const genres = useSelector((state) => state.genres);
//   const platforms = useSelector((state) => state.platforms);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [cardsPerPage, setCardsPerPage] = useState(15);
//   const [selectedSort, setSelectedSort] = useState("");
//   const [selectedGenre, setSelectedGenre] = useState("ALL");
//   const [selectedPlatform, setSelectedPlatform] = useState("ALL");
//   const [selectedOrigin, setSelectedOrigin] = useState("ALL");
//   const [showLoader, setShowLoader] = useState(videoGames?.length > 0);
//   const [filters, setFilters] = useState({ platform: 'ALL', genre: 'ALL', created: 'ALL' })
//   const paginateVideogames = useMemo(() => {
//     const startIndex = (currentPage - 1) * cardsPerPage;
//     const endIndex = startIndex + cardsPerPage;
//     return videoGames?.slice(startIndex, endIndex);
//   }, [currentPage, cardsPerPage, videoGames?.length])
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleRatingChange = (event) => {
//     dispatch(orderByRating(event.target.value));
//   };

//   const handleSortChange = (event) => {
//     const selectedValue = event.target.value;
//     setSelectedSort(selectedValue);
//     setSelectedGenre("ALL");
//     setSelectedPlatform("ALL");
//     setSelectedOrigin("ALL");
  
//     if (selectedValue === "Des") {
//       dispatch(orderByRating("Des"));
//     } else if (selectedValue === "Asc") {
//       dispatch(orderByRating("Asc"));
//     } else if (selectedValue === "AZ") {
//       dispatch(orderByName("AZ"));
//     } else if (selectedValue === "ZA") {
//       dispatch(orderByName("ZA"));
//     }
//   };

//   useEffect(() => {
//     dispatch(orderByName());
//     dispatch(orderByRating());
//     dispatch(getPlatforms());
//     dispatch(getGenre());
//   }, [dispatch]);

//   if (paginateVideogames?.length) {
//     setTimeout(() => {
//       setShowLoader(false);
//     }, 5000); 
//   }


//   const setVideogameFilter = (event) => {
//     const name = event?.currentTarget?.name
//     const value = event?.currentTarget?.value
//     setCurrentPage(1)
//     setFilters((old) => {
//       const newFilter = { ...old, [name]: value }
//       dispatch(filterVideogames(newFilter))
//       return newFilter
//     })
//   }
//   const filteredVideogames = useMemo(() => {
//     const filtered = videoGames.filter((videoGame) => {
//       if (filters.platform !== 'ALL' && !videoGame.platforms?.some((platform) => platform.name === filters.platform)) {
//         return false;
//       }
//       if (filters.genre !== 'ALL' && !videoGame.genres?.some((genre) => genre.name === filters.genre)) {
//         return false;
//       }
//       if (filters.created !== 'ALL' && videoGame.isDb !== (filters.created === 'true')) {
//         return false;
//       }
//       return true;
//     });

//     return filtered;
//   }, [videoGames, filters]);
//   const showNoResultsMessage = !filteredVideogames?.length && !showLoader && videoGames?.length > 0;
//   return (
//     <>
//       <div className={style.mainContainer}>
//         <div className={style.header}>
//           <h1 className={style.headingSub}>Videogames</h1>
//         </div>
//         <div className={style.gameList}>
//           {!!selectedSort && <h3 className={style.sortedIndicator}>
//             Sorted by: {selectedSort}
//           </h3>}
//           {showNoResultsMessage && (
//             <div className={style.noResultsMessage}>
//               No videogames found with the selected filters.
//             </div>
//           )}
//           <div className={style.gameListControls}>
//             <select className={style.select} value={selectedSort} onChange={handleSortChange}>
//               <option value="ALL">Sort by</option>
//               <option value="AZ">Name AZ</option>
//               <option value="ZA">Name ZA</option>
//               <option value="Asc">Rating Asc</option>
//               <option value="Des">Rating Des</option>
//               {console.log(selectedSort)}
//             </select>

//             <select className={style.select} name="genre" value={filters?.genre} onChange={setVideogameFilter}>
//               <option value="ALL">All Genre</option>
//               {genres?.map((genre) => (<option key={genre.id} value={genre.name}>{genre.name}</option>))}
//             </select>

//             <select className={style.select} name="platform" value={filters?.platform} onChange={setVideogameFilter}>
//               <option value="ALL">All Platform</option>
//               {platforms.map((platform) => (<option key={platform.id} value={platform.name}>{platform.name}</option>))}
//             </select>

//             <select className={style.select} name="created" value={filters?.created} onChange={setVideogameFilter}>
//               <option value="ALL">All Origin</option>
//               <option value="true">DB</option>
//               <option value="false">API</option>
//             </select>
//           </div>
//         </div>


//         {!paginateVideogames.length && showLoader ? (
//           <div className={style.loader}>
//             <Loader />
//           </div>
//         ) : (
//           <div className={style.Container}>
//             {paginateVideogames.map((videoGame) => (
//               <Card
//                 key={videoGame.id}
//                 id={videoGame.id}
//                 image={videoGame.image}
//                 name={videoGame.name}
//                 released={videoGame.released}
//                 rating={videoGame.rating}
//                 platforms={videoGame.platform || videoGame.platforms?.map((p) => p.name)}
//                 genres={videoGame.genre || videoGame.genres?.map((p) => p.name)}
//               />
//             )
//             )}

//           </div>
//         )}
//         <div className={style.paginacion}>
//           <TablaPaginacion
//             totalCards={videoGames.length}
//             onPageChange={handlePageChange}
//             currentPage={currentPage}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Cards;
