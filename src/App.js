import './App.css';
import Favorites from "./Favorites";
import Meals from "./Meals";
import Modal from "./Modal";
import Search from "./Search";
import { useGlobalContext } from './Context';


function App() {

  const {showModal, favorites} = useGlobalContext()

  return (
    <div >
      <Search />
      {favorites.length > 0 && <Favorites />}
      <Meals />
      {showModal &&<Modal />}

    </div>
  );
}

export default App;
