import React, { Component } from "react";
export default class DisplayQuote extends Component {
  render() {
    let msg = this.props.data;
    let myfield = (
      <div className="QuoteBody" onClick={this.props.onClick}>
        <fieldset>
          <legend>
            {msg.date}: {msg.title}
          </legend>
          <div className="quote">{msg.quote}</div>
          <div className="author">~{msg.author}</div>
          <img src={msg.background} alt="QuoteImage" />
        </fieldset>
      </div>
    );
    return myfield;
  }
}
