const STORAGE_KEY = "jobsite_checklist_sites";

const storageService = {
  getAllSites: async () => {
    try {
      const sitesJSON = localStorage.getItem(STORAGE_KEY);

      if (!sitesJSON) {
        return [];
      }

      return JSON.parse(sitesJSON);
    } catch (error) {
      console.error("Failed to load sites from localStorage:", error.message);
      return [];
    }
  },
  getSiteById: async (id) => {
    try {
      const sites = await storageService.getAllSites();
      const site = sites.find((site) => site.id === id);

      return site || null;
    } catch (error) {
      console.error("Failed to get site by ID:", error.message);
    }
  },
  createSite: async (siteData) => {
    try {
      const sites = await storageService.getAllSites();

      const newSite = {
        id: Date.now(),
        ...siteData,
      };

      const updatedSites = [...sites, newSite];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSites));

      return newSite;
    } catch (error) {
      if (error.name === "QuotaExceededError") {
        console.error("localStorage quota exceeded. Cannot save site.");
      } else {
        console.error("Failed to create site:", error.message);
      }
      throw error;
    }
  },
  updateSite: async (id, siteData) => {
    try {
      const sites = await storageService.getAllSites();

      const siteIndex = sites.findIndex((site) => site.id === id);
      if (siteIndex === -1) {
        throw new Error(`Site with id ${id} not found`);
      }

      const updatedSite = {
        ...sites[siteIndex],
        ...siteData,
        id: sites[siteIndex].id,
      };

      const updatedSites = [...sites];
      updatedSites[siteIndex] = updatedSite;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSites));

      return updatedSite;
    } catch (error) {
      console.error("Failed to update site:", error.message);
      throw error;
    }
  },
  deleteSite: async (id) => {
    try {
      const sites = await storageService.getAllSites();

      const updatedSites = sites.filter((site) => site.id !== id);

      if (sites.length === updatedSites.length) {
        throw new Error(`Site with id ${id} not found`);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSites));

      return;
    } catch (error) {
      console.error("Failed to delete site:", error.message);
      throw error;
    }
  },
};

export default storageService;
