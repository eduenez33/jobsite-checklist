import Header from "../Header/Header";
import Dashboard from "../Dashboard/Dashboard";
import Footer from "../Footer/Footer";

import "./App.css";

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Dashboard />
        <Footer />
      </div>
    </div>
  );
}

export default App;
