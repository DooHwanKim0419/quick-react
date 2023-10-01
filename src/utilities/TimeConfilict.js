export const getSelectedTimes = (chosenCourses) =>
  chosenCourses.map((courseInfo) => ({
    id: courseInfo[0],
    term: courseInfo[1]["term"],
    meets: courseInfo[1]["meets"],
  }));

const transformToTimeObject = (meets) => {
  const meetArr = meets.split(" ");
  const [day, interval] = meetArr;
  const [from, to] = interval.split("-");

  return {
    day: day,
    from: from,
    to: to,
  };
};

export const meetsToObjectArray = (allTimes) =>
  allTimes.map((time) => {
    const { id, term, meets } = time;
    const { day, from, to } = transformToTimeObject(meets);

    return {
      id: id,
      term: term,
      day: day,
      from: from,
      to: to,
    };
  });

const checkIfIdIsChosen = (id, chosenCourses) =>
  chosenCourses.filter((course) => course.id === id).length !== 0;

const filterByTerm = (selectedTimes, term) =>
  selectedTimes.filter((course) => course.term === term);

const checkDayConflict = (day1, day2) => {
  const first = day1.toUpperCase();
  const second = day2.toUpperCase();

  for (const c of second) {
    if (first.includes(c)) {
      return true;
    }
  }

  return false;
};

const filterByDay = (selectedTimes, day) =>
  selectedTimes.filter((course) => checkDayConflict(course.day, day));

const checkTimeConflict = (from, to, fromCompare, toCompare) => {
  const from1 = new Date(`2023-10-01T${from}:00`);
  const to1 = new Date(`2023-10-01T${to}:00`);
  const from2 = new Date(`2023-10-01T${fromCompare}:00`);
  const to2 = new Date(`2023-10-01T${toCompare}:00`);

  return from1 < to2 && from2 < to1;
};

const filterByTime = (selectedTimes, from, to) =>
  selectedTimes.filter((course) =>
    checkTimeConflict(course.from, course.to, from, to)
  );

const getAllConflictedCourses = (selectedTimes, allCourses) => {
  const courses = Object.entries(allCourses).filter(([id, course]) => {
    if (checkIfIdIsChosen(id, selectedTimes)) {
      return false;
    }

    const { term, meets } = course;

    const termMatchedCourses = filterByTerm(selectedTimes, term);

    if (termMatchedCourses.length === 0) {
      return false;
    }

    const { day, from, to } = transformToTimeObject(meets);
    const dayMatchedCourses = filterByDay(termMatchedCourses, day);

    if (dayMatchedCourses.length === 0) {
      return false;
    }

    const timeMatchedCourses = filterByTime(dayMatchedCourses, from, to);

    return timeMatchedCourses.length !== 0;
  });

  return courses;
};

export const getAllConflictedIds = (selectedTimes, allCourses) =>
  getAllConflictedCourses(selectedTimes, allCourses).map(
    (conflicts) => conflicts[0]
  );
