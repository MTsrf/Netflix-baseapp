import NavBar from "./Components/NavBar/NavBar";
import "./App.css"
import Banner from "./Components/Banner/Banner";
import RowPost from "./Components/RowPost/RowPost";
import {action,original,horror} from './url'


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <RowPost url={original} title='Netflix Originals' />
      <RowPost url={action} title='Actions' isSmall />
      <RowPost url={horror} title='Horror' isSmall />

    </div>
  );
}

export default App;
