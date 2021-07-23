import axios from "axios";

export default function runAtDb(payload) {
  var result;
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
      result = response.data;
      //console.log(JSON.stringify(response.data));
      //console.log(response.data);
    })
    .catch(function (error) {
      result = error;
      //console.log(error);
    });
  console.log(result);
  return result;
}
