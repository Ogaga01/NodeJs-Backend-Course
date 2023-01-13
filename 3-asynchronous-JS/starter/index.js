const fs = require("fs");
const superagent = require("superagent");

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          ok: true,
          message: "File created!",
        });
      }
    });
  });
};

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        reject("I could not find that file");
      } else {
        resolve(data);
      }
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res2pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1pro, res2pro, res3pro]);
    console.log(all);
    const img = all.map((el) => {
      return el.body.message;
    });
    console.log(img);
    // console.log(res.body.message);

    await writeFilePro(`dog-img.txt`, img.join("\n"));
    console.log("Save dog image file");
  } catch (err) {
    console.log(err);

    throw err;
  }
  return "2 Big Images";
};

(async () => {
  try {
    const x = await getDogPic();
    console.log(x);
  } catch (err) {
    console.log(err);
  }
})();

// readFilePro(`${__dirname}/dog.txt`).then((data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile(`dog-img.txt`, res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log("Save dog image file");
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });
