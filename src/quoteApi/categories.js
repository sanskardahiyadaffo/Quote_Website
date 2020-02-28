import { myOldData } from "../mydata/file1";
import React, { Component } from "react";
let currdate = "2020-02-28";
let categories = new Set(
  `inspire management sports life funny love art students`.split(" ")
);
export let categ = [...categories];
// default_categories.add(false);
myOldData.map(ele => {
  if (ele.date === currdate) {
    categories.delete(ele.category);
  }
  return null;
});
let default_categories = [...categories];
console.log("Final Default categories are>>", default_categories);
export default default_categories;

let catg = `inspire management sports life funny love art students All`.split(
  " "
);
export class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = "";
  }
  render() {
    return (
      <div className="Header">
        {catg.map((ele, id) => (
          <GetComponent key={id} val={ele} onClick={this.props.onClick} />
        ))}
      </div>
    );
  }
}

function GetComponent(props) {
  return (
    <div className="blocks" onClick={props.onClick}>
      {props.val}
    </div>
  );
}
