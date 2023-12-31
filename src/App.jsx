import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import RoutesBase from "./components/Routes";
import NavigationBar from "./components/NavigationBar";
import "./App.css";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NavigationBar />
        <div className="custom-container text-center">
          <RoutesBase />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
