export {};

declare global {
  interface Window {
    api?: {
      listComPorts: () => Promise<any[]>;
      connectCom: (cfg: {
        path: string;
        baudRate: number;
      }) => Promise<{ success: boolean; message?: string }>;
      sendCom: (data: string) => Promise<{ success: boolean; message?: string }>;
    };
  }
}
