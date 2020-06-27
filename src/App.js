import React from "react";
import "./App.css";
import {
  AppBar,
  Toolbar,
  Card,
  Divider,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import CellGrid from "./CellGrid";
import ColorPicker from "./ColorPicker";
import SizePicker from "./SizePicker";
import LayersClearRoundedIcon from "@material-ui/icons/LayersClear";

const initRows = 24,
  initCols = 32;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: {
        rows: initRows,
        cols: initCols,
      },
      color_picker: {
        r: 255,
        g: 255,
        b: 255,
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

  sizeChangeHandler(r, c) {
    console.log(this.state);

    var newGrid = this.state.grid;
    if (r < this.state.size.rows) {
      newGrid = newGrid.slice(0, r);
    } else if (r > this.state.size.rows) {
      newGrid = [
        ...newGrid,
        ...Array.from({ length: r - this.state.size.rows }, () =>
          Array.from({ length: c }, () => ({
            color: {
              r: this.state.color_picker.r,
              g: this.state.color_picker.g,
              b: this.state.color_picker.b,
            },
            selected: false,
          }))
        ),
      ];
    }

    if (c < this.state.size.cols) {
      newGrid = newGrid.map((row) => row.slice(0, c));
    } else if (c > this.state.size.cols) {
      newGrid = newGrid.map((row) => [
        ...row,
        ...Array.from({ length: c - this.state.size.cols }, () => ({
          color: {
            r: this.state.color_picker.r,
            g: this.state.color_picker.g,
            b: this.state.color_picker.b,
          },
          selected: false,
        })),
      ]);
    }

    this.setState({
      size: { rows: r, cols: c },
      grid: newGrid,
    });
  }

  render() {
    return (
      <div style={{ height: "100vh", display: "flex", flexFlow: "row" }}>
        <span style={{ height: "100vh", flex: "8 8 auto" }}>
          <div style={{ display: "flex", flexFlow: "column", height: "100%" }}>
            <div style={{ flex: "0 1 auto" }}>
              <AppBar position="sticky" color="transparent" elevation={1}>
                <Toolbar>
                  <SizePicker
                    size={this.state.size}
                    onApply={(r, c) => this.sizeChangeHandler(r, c)}
                  />
                  <span style={{ flex: "1 1 auto" }} />
                  <Tooltip arrow title="Clear Selection">
                    <IconButton
                      disabled={
                        !this.state.grid.reduce(
                          (acc, row) =>
                            acc ||
                            row.reduce(
                              (acc, cell) => acc || cell.selected,
                              false
                            ),
                          false
                        )
                      }
                      onClick={() =>
                        this.setState({
                          grid: this.state.grid.map((row) =>
                            row.map((cell) => ({ ...cell, selected: false }))
                          ),
                        })
                      }
                    >
                      <LayersClearRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </Toolbar>
              </AppBar>
            </div>
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
          <Card
            style={{
              width: "100%",
              height: "100%",
              margin: "auto",
            }}
            elevation={4}
          >
            <ColorPicker
              color={this.state.color_picker}
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
            <Divider style={{ width: "96%", margin: "auto" }} />
          </Card>
        </span>
      </div>
    );
  }
}

export default App;
