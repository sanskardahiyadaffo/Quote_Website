import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import DisplayQuote from "./quoteApi/displayImage";
import { myOldData } from "./mydata/file1";
import "./App.css";
import get_todays_Quote from "./quoteApi/myfunctions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: myOldData, newelem: "" };
  }
  Show_One = data => {
    // console.log(data.target.parentNode, "<<<");
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
    // console.log(z);
    console.log("yes_updating");
  }

  shouldComponentUpdate(a, b) {
    // if (b.newelem === this.state.newelem) {
    //   //Checking if we need to update or not
    //   return false;
    // }
    return true;
  }
  updateState = data => {
    let oldData = [...this.state.data];
    // console .log(JSON.stringify(data));
    if (
      !oldData.filter(ele => {
        return ele.id === data.id;
      })[0]
    ) {
      oldData.push(data);
      this.setState({ data: oldData });
    }
  };

  componentDidMount() {
    let z = document.getElementById("cstm_app");
    window.onkeyup = ele => {
      if (ele.keyCode === 27) {
        this.removeChild();
      }
    };
    z.style.display = "none";

    get_todays_Quote("management", "life", data_ => {
      console.log(">>>>/App.js", data_);
      if (data_)
        data_.map(ele => {
          // console.log(">>>", ele);
          this.updateState(ele);
          return null;
        });
    });
    // setInterval(() => {
    //   get_todays_Quote("life", data_ => {
    //     console.log(data_, "<<<");
    //     if (data_)
    //       data_.map(ele => {
    //         console.log(">>>", ele);
    //         this.updateState(ele);
    //         return null;
    //       });
    //   });
    // }, 1000 * 60 * 60);
  }
  render() {
    let show = this.state.newelem.outerHTML || false;
    show = show ? show.toString() : false;
    return (
      <div>
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
