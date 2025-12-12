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
        createdAt: new Date().toISOString(),
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
  addChecklistItem: async (siteId, item) => {
    try {
      const sites = await storageService.getAllSites();
      const siteIndex = sites.findIndex((site) => site.id === siteId);
      const newItem = {
        id: Date.now(),
        text: item.text || "",
        quantity: item.quantity || 0,
        completed: item.completed ?? false,
        ...item,
      };

      if (siteIndex === -1) {
        throw new Error(`Site with id ${siteId} not found`);
      }

      const updatedSites = sites.map((site) =>
        site.id === siteId
          ? { ...site, checklist: [...(site.checklist || []), newItem] }
          : site
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSites));

      const updatedSite = updatedSites.find((site) => site.id === siteId);
      return updatedSite;
    } catch (error) {
      console.error("Failed to add item to checklist:", error.message);
      throw error;
    }
  },
  updateChecklistItem: async (siteId, itemId, updates) => {
    try {
      const sites = await storageService.getAllSites();
      const siteIndex = sites.findIndex((site) => site.id === siteId);

      if (siteIndex === -1) {
        throw new Error(`Site with id ${siteId} not found`);
      }

      const siteChecklist = sites[siteIndex].checklist;
      const siteChecklistItem = siteChecklist.find(
        (item) => item.id === itemId
      );

      if (!siteChecklistItem) {
        throw new Error(`Checklist item with id ${itemId} not found`);
      }

      const updatedChecklistItem = {
        ...siteChecklistItem,
        ...updates,
      };

      const updatedSites = sites.map((site) => {
        site.id === siteId
          ? {
              ...site,
              checklist: site.checklist.map((item) =>
                item.id === itemId ? updatedChecklistItem : item
              ),
            }
          : site;
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSites));

      const updatedSite = updatedSites.find((site) => site.id === siteId);
      return updatedSite;
    } catch (error) {
      console.error("Failed to update checklist item:", error.message);
      throw error;
    }
  },
  deleteChecklistItem: async (siteId, itemId) => {
    try {
      const sites = await storageService.getAllSites();
      const siteIndex = sites.findIndex((site) => site.id === siteId);

      if (siteIndex === -1) {
        throw new Error(`Site with id ${siteId} not found`);
      }

      const updatedSites = sites.map((site) =>
        site.id === siteId
          ? {
              ...site,
              checklist: site.checklist.filter((item) => item.id !== itemId),
            }
          : site
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSites));

      const updatedSite = updatedSites.find((site) => site.id === siteId);
      return updatedSite;
    } catch (error) {}
  },
};

export default storageService;
