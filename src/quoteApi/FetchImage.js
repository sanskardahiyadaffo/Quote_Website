import default_categories from "./categories";

async function get_todays_Quote() {
  //fetching Data

  let args = [...arguments];

  let cb = args.pop();

  args =
    args.length !== 0
      ? args
      : default_categories.length === 0
      ? false
      : default_categories;

  if (args) getImage(args);

  function getImage(args1) {
    let category = args1.pop();

    // console.log(category, " category is fetching");

    let url = category ? "?category=" + category : "";

    console.log(url, "<<<fetching this category");

    fetch("https://quotes.rest/qod" + url)
      .then(msg => msg.text())

      .then(msg => {
        msg = JSON.parse(msg);

        if (!msg.error) {
          msg = msg.contents.quotes;

          // msg = JSON.stringify(msg);

          console.log(
            "Getting Good Response>>>\n\n" + JSON.stringify(msg) + "\n\n<<<<"
          );

          cb(msg);
        } else {
          console.log(
            "Getting Bad Response>>>\n\n" + JSON.stringify(msg) + "\n\n<<<<"
          );
        }

        setTimeout(() => {
          if (args1.length > 0) getImage(args1);
        }, 2000);

        return false;
      })

      .catch(err => {
        console.log("myfunction.js:error>>>>>>>>>>", err);
      });

    return false;
  }

  return false;
}

export default get_todays_Quote;
