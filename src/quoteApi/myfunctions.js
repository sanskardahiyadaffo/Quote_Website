async function get_todays_Quote() {
  //fetching Data
  let args = [...arguments];
  let cb = args.pop();
  getImage(args);
  function getImage(args1) {
    let category = args1.pop();
    // console.log(category, " category is fetching");
    let url = category ? "?category=" + category : "";
    fetch("https://quotes.rest/qod" + url)
      .then(msg => msg.text())
      .then(msg => {
        msg = JSON.parse(msg);
        if (!msg.error) {
          return msg.contents.quotes;
        }
        return false;
      })
      .then(msg => {
        if (msg) {
          // msg = JSON.stringify(msg);
          //   console.log("getting response", JSON.stringify(msg));
          cb(msg);
        }
        if (args.length > 0) getImage(args);
      })
      .catch(err => {
        console.log("myfunction.js:error>>>>>>>>>>", err);
      });
    return false;
  }
  return false;
}
export default get_todays_Quote;
