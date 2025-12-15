import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import SitesContext from "../../contexts/SitesContext";
import Header from "../Header/Header";
import Dashboard from "../Dashboard/Dashboard";
import SiteDetailView from "../SiteDetailView/SiteDetailView";
import Footer from "../Footer/Footer";
import CreateSiteModal from "../CreateSiteModal/CreateSiteModal";
// import EditSiteModal from "../EditSiteModal/EditSiteModal";
// import DeleteSiteModal from "../DeleteSiteModal/DeleteSiteModal";
import storageService from "../../utils/storageService";

import "./App.css";

function App() {
  const navigate = useNavigate();
  const [sites, setSites] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [activeSite, setActiveSite] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCreateSiteClick = () => {
    setActiveModal("create-site");
  };

  const handleEditSiteClick = (site) => {
    setActiveSite(site);
    setActiveModal("edit-site");
  };

  const handleDeleteSiteClick = (site) => {
    setActiveSite(site);
    setActiveModal("delete-site");
  };

  const handleModalClose = () => {
    setActiveModal("");
    setActiveSite({});
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  const handleCreateSiteSubmit = async (siteData) => {
    try {
      setError(null);
      const newSite = await storageService.createSite(siteData);
      setSites((prev) => [newSite, ...prev]);
      handleModalClose();
      navigate(`/site/${newSite.id}`);
    } catch (err) {
      setError("Failed to create site. Please try again.");
      console.error(err);
    }
  };

  const handleEditSiteSubmit = async (updatedSiteData) => {
    try {
      setError(null);

      const updatedSite = await storageService.updateSite(
        activeSite.id,
        updatedSiteData
      );
      setSites((prev) =>
        prev.map((site) => (site.id === activeSite.id ? updatedSite : site))
      );
      handleModalClose();
    } catch (err) {
      setError("Failed to update site. Please try again.");
      console.error(err);
    }
  };

  const handleDeleteSite = async () => {
    try {
      setError(null);

      await storageService.deleteSite(activeSite.id);

      setSites((prev) => prev.filter((site) => site.id !== activeSite.id));

      handleModalClose();
    } catch (error) {
      setError("Failed to delete site. Please try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleModalClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    const loadSites = async () => {
      setIsLoading(true);
      const data = await storageService.getAllSites();
      setSites(data);
      setIsLoading(false);
    };
    loadSites();
  }, []);

  return (
    <SitesContext.Provider
      value={{
        sites,
        setSites,
        handleCreateSiteClick,
        handleEditSiteClick,
        handleDeleteSiteClick,
      }}
    >
      <div className="page">
        <div className="page__content">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/site/:siteId" element={<SiteDetailView />} />
          </Routes>
          <Footer />
        </div>
        <CreateSiteModal
          isOpen={activeModal === "create-site"}
          handleModalClose={handleModalClose}
          onOverlayClick={handleOverlayClick}
          onSubmit={handleCreateSiteSubmit}
        />
        {/* <EditSiteModal
          isOpen={activeModal === "edit-site"}
          handleModalClose={handleModalClose}
          onSubmit={handleEditSiteSubmit}
          site={activeSite}
        /> */}
        {/* <DeleteSiteModal
          isOpen={activeModal === "delete-site"}
          handleModalClose={handleModalClose}
          onConfirm={handleDeleteSite}
          site={activeSite}
        /> */}
      </div>
    </SitesContext.Provider>
  );
}

export default App;
