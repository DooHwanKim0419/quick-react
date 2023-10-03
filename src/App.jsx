import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import RoutesBase from "./components/Routes";
import "./App.css";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="custom-container text-center">
        <BrowserRouter>
          <RoutesBase />
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
};

export default App;
