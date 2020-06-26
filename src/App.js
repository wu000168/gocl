import React from "react";
import "./App.css";
import CellGrid from "./CellGrid";
import ColorPicker from "./ColorPicker";
// import { createMuiTheme } from "@material-ui/core/styles";
// import { ThemeProvider } from "@material-ui/styles";

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
      grid: {
        colors: Array(initRows).fill(
          Array(initCols).fill({ r: 0, g: 0, b: 0 })
        ),
      },
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
                grid: {
                  colors: Array(this.state.settings.size.rows).fill(
                    Array(this.state.settings.size.cols).fill({
                      r: r,
                      g: g,
                      b: b,
                    })
                  ),
                },
              });
            }}
          />
        </span>
      </div>
    );
  }
}

export default App;
