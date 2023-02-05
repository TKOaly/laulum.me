import type { Workbox } from "workbox-window";

declare global {
  interface Window {
    workbox: Workbox;
  }
}
window.workbox = window.workbox || {};
