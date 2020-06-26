import React from "react";
import { Paper } from "@material-ui/core";

class CellGrid extends React.Component {
  render() {
    return (
      <table style={{ ...this.props.style, borderCollapse: "collapse" }}>
        {this.props.grid.map((row, r) => (
          <tr>
            {row.map((cell, c) => (
              <td
                style={{
                  border: "1px solid #D0D0D0D0",
                  overflow: "visible",
                }}
              >
                <Paper
                  style={{
                    margin: "auto",
                    width: cell.selected ? "100%" : "90%",
                    height: cell.selected ? "100%" : "90%",
                    backgroundColor:
                      "rgb(" +
                      cell.color.r +
                      "," +
                      cell.color.g +
                      "," +
                      cell.color.b +
                      ")",
                  }}
                  onClick={() => this.props.onClick(r, c)}
                  square
                  outlined
                  elevation={cell.selected ? 4 : 0}
                ></Paper>
              </td>
            ))}
          </tr>
        ))}
      </table>
    );
  }
}

export default CellGrid;
