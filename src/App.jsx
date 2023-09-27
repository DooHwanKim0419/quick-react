import { useState } from "react";
import Banner from "./components/Banner";
import TermPage from "./components/TermPage";
import { fetchData } from "./utilities/Fetch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

const MainComponent = () => {
  const url =
    "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";

  const scheduleQuery = fetchData(url);
  const [data, isLoading, error] = scheduleQuery;

  if (isLoading) {
    return (
      <div className="no-data">
        <h1>Still Loading the data...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="no-data">
        <div className="error-message">
          <h1>Error while fetching the data...</h1>
          <h2>Detailed Error Message:</h2>
          <p>{`${error}`}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="no-data">
        <h1>There are no data found!</h1>
      </div>
    );
  }

  const { title, courses } = data;

  return (
    <div>
      <Banner title={title} />
      <TermPage allCourses={courses} />
    </div>
  );
};

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="custom-container text-center">
        <MainComponent />
      </div>
    </QueryClientProvider>
  );
};

export default App;
