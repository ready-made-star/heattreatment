import logo from "./logo.svg";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Order } from "./components/order";
import { HydroTest } from "./components/hydroTest";
import { HydroTestEntryDetails } from "./components/hydroTestEntryDetails";
import { UploadingPackingList } from "./components/uploadingPackingList";
import { LoginPage } from "./components/login";
import { createBrowserHistory } from "history";
import "./App.css";

function App() {
  const history = createBrowserHistory();
  return (
    <HashRouter history={history}>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/orderSummary" element={<Order />} />
        <Route exact path="/hydroTest" element={<HydroTest />} />
        <Route
          exact
          path="/hydroTestDataEntry"
          element={<HydroTestEntryDetails />}
        />
        <Route
          exact
          path="/uploadPackingList"
          element={<UploadingPackingList />}
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
