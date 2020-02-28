import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import DisplayQuote from "./quoteApi/displayImage";
import { myOldData } from "./mydata/file1";
import "./App.css";
import get_todays_Quote from "./quoteApi/FetchImage";
import { MyHeader } from "./quoteApi/categories";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: myOldData, newelem: "" };
  }
  Show_One = data => {
    this.setState({ newelem: data.target.parentNode.parentNode });
  };
  removeChild = () => {
    this.setState({ newelem: "" });
  };
  componentDidUpdate() {
    let z = document.getElementById("cstm_app");
    if (z) {
      if (z.childElementCount === 2) z.style.display = "block";
      else z.style.display = "none";
    }
    // console.log(">>>>>>>>\n\\n\n", JSON.stringify(this.state.data));
    console.log("yes_updating");
  }

  updateState = (data = false) => {
    if (data) {
      let oldData = [...this.state.data];
      if (
        !oldData.filter(ele => {
          return ele.id === data.id;
        })[0]
      ) {
        oldData.push(data);
        oldData.sort((a, b) => {
          a = parseInt(a.date.split("-").join(""));
          b = parseInt(b.date.split("-").join(""));
          if (a === b) return 0;
          else if (a < b) return 1;
          return -1;
        });
        this.setState({ data: oldData });
      }
    }
  };

  componentDidMount() {
    // ***************************88
    //Sorting data to date
    let oldData = [...this.state.data];
    oldData.sort((a, b) => {
      a = parseInt(a.date.split("-").join(""));
      b = parseInt(b.date.split("-").join(""));
      if (a === b) return 0;
      else if (a < b) return 1;
      return -1;
    });
    this.setState({ data: oldData });
    //dorting Done
    //Bind esc to remove large photo
    let z = document.getElementById("cstm_app");
    window.onkeyup = ele => {
      if (ele.keyCode === 27) {
        this.removeChild();
      }
    };
    z.style.display = "none";

    //fetching latest quotes
    // get_todays_Quote(data_ => {
    //   if (data_)
    //     data_.map(ele => {
    //       this.updateState(ele);
    //       return null;
    //     });
    // });
    setInterval(() => {
      console.log("Fetching Data Auto");
      get_todays_Quote(data_ => {
        if (data_)
          data_.map((ele, id) => {
            console.log(">>>Data", id, ">", ele);
            this.updateState(ele);
            return null;
          });
      });
    }, 1000 * 15);
  }
  render() {
    let show = this.state.newelem.outerHTML || false;
    show = show ? show.toString() : false;
    return (
      <div>
        <MyHeader />
        <div id="cstm_app">
          <div id="crossbtn" onClick={this.removeChild}>
            X
          </div>
          {ReactHtmlParser(show)}
        </div>
        <div className="App">
          {this.state.data.map((ele, id) => (
            <DisplayQuote key={id} data={ele} onClick={this.Show_One} />
          ))}
        </div>
        <div id="footer">
          Created By Sanskar Dahiya
          <br />
          <span>Using quote.rest api</span>
        </div>
      </div>
    );
  }
}

export default App;
