import "./bootstrap";
import "../css/app.css";
import "tw-elements-react/dist/css/tw-elements-react.min.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import Modal from "react-modal";

Modal.setAppElement("#app");

const appName = import.meta.env.VITE_APP_NAME || "Eureka";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/sw.js")
            .then((registration) => {
                console.log("Service Worker registered:", registration);
            })
            .catch((error) => {
                console.error("Service Worker registration failed:", error);
            });

        // Cek status service worker
        navigator.serviceWorker.ready.then(function (registration) {
            console.log("Service Worker ready:", registration);
        });
    });
}
