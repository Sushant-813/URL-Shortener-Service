import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import useAuthStore from "./store/authStore";
import ToastContainer from "./components/ui/ToastContainer";
import "./styles/globals.css";

// Single QueryClient instance for the lifetime of the application.
// React Query manages all server state (mutations, queries) through this client.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

useAuthStore.getState().restoreSession();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer />
    </QueryClientProvider>
  </BrowserRouter>,
);
