import Banner from "./Banner";
import TermPage from "./TermPage";
import { useDbData } from "../utilities/Firebase";

const MainComponent = () => {
  const [data, error] = useDbData("/");

  if (data === undefined) {
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

export default MainComponent;
