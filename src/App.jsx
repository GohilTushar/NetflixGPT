import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import store from "./utils/states/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    </Provider>
  );
}

export default App;


