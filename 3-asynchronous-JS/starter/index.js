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

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro(`dog-img.txt`, res.body.message);
    console.log("Save dog image file");
  } catch (err) {
    console.log(err);
  }
};

getDogPic();

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
