const getNameFromLabel = (name) => {
  switch (name) {
    case "term":
      return "Term";
    case "number":
      return "Course Number";
    case "meets":
      return "Meeting Time";
    case "title":
      return "Course Title";
  }
};

export default getNameFromLabel;
