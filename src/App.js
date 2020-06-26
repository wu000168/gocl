import React from "react";
import "./App.css";
import CellGrid from "./CellGrid";
import ColorPicker from "./ColorPicker";

const initRows = 24,
  initCols = 32;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        size: {
          rows: initRows,
          cols: initCols,
        },
        color_picker: {
          r: 0,
          g: 0,
          b: 0,
        },
        fill_range: {
          start: { x: 0, y: 0 },
          end: { x: initRows, y: initCols },
        },
      },
      grid: Array.from({ length: initRows }, () =>
        Array.from({ length: initCols }, () => ({
          color: { r: 255, g: 255, b: 255 },
          selected: false,
        }))
      ),
      rules: [],
    };
  }
  render() {
    return (
      <div style={{ height: "100vh", display: "flex", flexFlow: "row" }}>
        <span style={{ height: "100vh", flex: "8 8 auto" }}>
          <div style={{ display: "flex", flexFlow: "column", height: "100%" }}>
            <div style={{ flex: "0 1 auto" }}></div>
            <div style={{ flex: "1 1 auto" }}>
              <CellGrid
                grid={this.state.grid}
                style={{
                  height: "100%",
                  width: "100%",
                  textAlign: "center",
                  verticalAlign: "middle",
                  flexGrow: 1,
                }}
                onClick={(r, c) => {
                  var newGrid = this.state.grid.map((row) => row.slice());
                  newGrid[r][c].selected = !newGrid[r][c].selected;
                  console.log(newGrid);
                  this.setState({
                    grid: newGrid,
                  });
                }}
              />
            </div>
          </div>
        </span>
        <span style={{ flex: "2 2 auto" }}>
          <ColorPicker
            color={this.state.settings.color_picker}
            onChange={(r, g, b) =>
              this.setState({ color_picker: { r: r, g: g, b: b } })
            }
            onFill={(r, g, b) => {
              this.setState({
                grid: this.state.grid.map((row) =>
                  row.map((cell) => ({
                    ...cell,
                    color: { r: r, g: g, b: b },
                  }))
                ),
              });
            }}
            onColorize={(r, g, b) => {
              this.setState({
                grid: this.state.grid.map((row) =>
                  row.map((cell) =>
                    cell.selected
                      ? { ...cell, color: { r: r, g: g, b: b } }
                      : cell
                  )
                ),
              });
            }}
          />
        </span>
      </div>
    );
  }
}

export default App;
