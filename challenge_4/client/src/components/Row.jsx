import React from 'react';



class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  this.clickHandle = this.clickHandle.bind(this);
  }

  clickHandle(e) {
    e.preventDefault();
    const column = Number(e.target.getAttribute('name'));
    this.props.placePiece(column);
  }

  render() {
    return (
      <div>
        {this.props.row.map((color , i) => (
        <span key={i}><span className={"spot " + color} onClick={this.clickHandle} name={i}></span></span>
        ))}
      </div>
    );
  }
}

export default Row;