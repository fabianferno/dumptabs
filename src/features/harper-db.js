import axios from "axios";

const runAtDb = (payload) => {
  var result = "";
  axios({
    method: "post",
    url: "https://pattarai-fabianferno.harperdbcloud.com",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic ZmFiaWFuZmVybm86S2FsRWxAMzE1NQ==",
    },
    data: JSON.stringify(payload),
  })
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      result = JSON.stringify(response.data);
    })
    .catch(function (error) {
      console.log(error);
      result = error;
    });
  return result;
};

export default runAtDb;
