import axios from "axios";

const runAtDb = (operation, query) => {
  var payload =
    operation !== "sql"
      ? JSON.stringify({
          // No SQL operations
          operation: operation,
          schema: "dumptabs",
          table: "dumps",
          records: query,
        })
      : JSON.stringify({
          // SQL operations
          operation: operation,
          sql: query,
        });

  var data = "null";

  axios({
    method: "post",
    url: "https://pattarai-fabianferno.harperdbcloud.com",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic ZmFiaWFuZmVybm86S2FsRWxAMzE1NQ==",
    },
    data: payload,
  })
    .then(function (response) {
      data = response.data;
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      data = error;
      console.log(error);
    });

  return data;
};

export default runAtDb;
