const jsonfile = require("jsonfile");
const simpleGit = require("simple-git");
const randomInt = require("./random.js").randomInt;

const FILE_PATH = "./data.json";

const makeCommit = (n) => {
  if (n === 0) return simpleGit().push();

  const startDate = new Date('2021-12-31');
  const endDate = new Date('2023-07-31');
  const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)); // Total days from Dec 31, 2021 to July 31, 2023

  const randomDay = randomInt(0, totalDays);

  const DATE = new Date(startDate);
  DATE.setDate(startDate.getDate() + randomDay);

  const data = {
    date: DATE.valueOf(),
  };

  console.log(DATE);

  jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit()
      .add([FILE_PATH])
      .commit(
        DATE.toISOString(),
        { "--date": DATE.toISOString() },
        makeCommit.bind(this, --n)
      );
  });
};

// Adjust the number of commits as needed
makeCommit(500);
