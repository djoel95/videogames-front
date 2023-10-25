import { useDispatch } from "react-redux";
import { Cards } from "../../components/";
import { useEffect } from "react";
import { getAllVideogames } from "../../store/actions";

const Home = () => {


  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getAllVideogames());
  }, []);

  return (
    <Cards />
  );
};

export default Home;
