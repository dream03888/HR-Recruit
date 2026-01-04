contextBridge.exposeInMainWorld('api', {
  listComPorts: async () => {
    try {
      return await ipcRenderer.invoke('com:list');
    } catch (e) {
      console.error('listComPorts error', e);
      return [];
    }
  },

  connectCom: async (cfg) => {
    try {
      return await ipcRenderer.invoke('com:connect', cfg);
    } catch (e) {
      return { success: false, message: e.message };
    }
  },

  sendCom: async (data) => {
    try {
      return await ipcRenderer.invoke('com:send', data);
    } catch (e) {
      return { success: false, message: e.message };
    }
  }
});
