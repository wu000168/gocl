import React from "react";

class CellGrid extends React.Component {
  render() {
    return (
      <table style={this.props.style}>
        {this.props.grid.colors.map((row) => (
          <tr>
            {row.map((cell) => (
              <td
                style={{
                  backgroundColor:
                    "rgb(" + cell.r + "," + cell.g + "," + cell.b + ")",
                }}
              >
                {/* {cell.r},{cell.g},{cell.b} */}
              </td>
            ))}
          </tr>
        ))}
      </table>
    );
  }
}

export default CellGrid;
