import React from "react";
import { Card } from "@material-ui/core";
// import CheckRoundedIcon from "@material-ui/icons/CheckRounded";

class CellGrid extends React.Component {
  render() {
    return (
      <table
        style={{
          ...this.props.style,
          borderCollapse: "collapse",
          // tableLayout: "fixed",
          // width: "100%",
        }}
      >
        {this.props.grid.map((row, r) => (
          <tr>
            {row.map((cell, c) => (
              <td
                style={{
                  border: "1px solid #D0D0D0D0",
                  overflow: "visible",
                }}
                onClick={() => this.props.onClick(r, c)}
              >
                <Card
                  style={{
                    verticalAlign: "middle",
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
                  square
                  outlined
                  elevation={cell.selected ? 4 : 0}
                >
                  {/* <Box flexShrink={1} width="auto" height="auto">
                    {cell.selected ? <CheckRoundedIcon /> : <div />}
                  </Box> */}
                </Card>
              </td>
            ))}
          </tr>
        ))}
      </table>
    );
  }
}

export default CellGrid;
