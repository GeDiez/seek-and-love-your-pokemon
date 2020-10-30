import "bulma";
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import Home from "./components/Views/Home/Home";

const queryCache = new QueryCache()

function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Home></Home>
    </ReactQueryCacheProvider>
  );
}

export default App;
