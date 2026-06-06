import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

const buildLastUpdated = `'${new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "2-digit",
    month: "numeric",
    day: "numeric",
}).format(new Date())}`;

export default defineConfig({
    base: "/sort/",
    plugins: [react()],
    define: {
        __BUILD_LAST_UPDATED__: JSON.stringify(buildLastUpdated),
    },
});
