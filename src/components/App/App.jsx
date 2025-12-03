import { useState, useEffect } from "react";

import SitesContext from "../../contexts/SitesContext";
import Header from "../Header/Header";
import Dashboard from "../Dashboard/Dashboard";
import Footer from "../Footer/Footer";
import CreateSiteModal from "../CreateSiteModal/CreateSiteModal";
// import EditSiteModal from "../EditSiteModal/EditSiteModal";
// import DeleteSiteModal from "../DeleteSiteModal/DeleteSiteModal";
import storageService from "../../utils/storageService";

import "./App.css";

function App() {
  const [sites, setSites] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [activeSite, setActiveSite] = useState({});

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

  const handleCreateSiteSubmit = (siteData) => {
    const newSite = {
      ...siteData,
      id: Date.now(), // Simple ID generation
      createdAt: new Date().toISOString(),
      status: siteData.status || "pending",
    };
    setSites((prev) => [newSite, ...prev]);
    handleModalClose();
  };

  const handleEditSiteSubmit = (updatedSiteData) => {
    setSites((prev) =>
      prev.map((site) =>
        site.id === activeSite.id ? { ...site, ...updatedSiteData } : site
      )
    );
    handleModalClose();
  };

  const handleDeleteSite = () => {
    setSites((prev) => prev.filter((site) => site.id !== activeSite.id));
    handleModalClose();
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
          <Dashboard />
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
