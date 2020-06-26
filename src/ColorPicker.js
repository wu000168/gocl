import React from "react";
import {
  Slider,
  Avatar,
  Typography,
  Input,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  IconButton,
} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import ColorLensIcon from "@material-ui/icons/ColorLens";

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.props = {
      onChange: props.onChange,
    };
    this.state = {
      r: props.color.r,
      g: props.color.g,
      b: props.color.b,
    };
  }

  makeSliderTheme(color) {
    return createMuiTheme({
      overrides: {
        MuiSlider: {
          thumb: {
            color: color,
            "&$focusVisible,&:hover": {
              boxShadow: `0px 0px 0px 8px ${fade(color, 0.16)}`,
              "@media (hover: none)": {
                boxShadow: "none",
              },
            },
            "&$active": {
              boxShadow: `0px 0px 0px 14px ${fade(color, 0.16)}`,
            },
          },
          track: {
            color: color,
          },
          rail: {
            color: color,
          },
        },
      },
    });
  }

  makeSlider(title, value, color, onChange) {
    return (
      <div style={{ display: "flex", flexFlow: "row" }}>
        <ThemeProvider theme={this.makeSliderTheme(color)}>
          <span
            style={{
              // flex: "4 1 auto",
              verticalAlign: "baseline",
              width: "32pt",
            }}
          >
            <Typography>{title}</Typography>
          </span>
          <span
            style={{
              verticalAlign: "baseline",
              flex: "1 1 auto",
              paddingLeft: "16pt",
              paddingRight: "16pt",
            }}
          >
            <Slider
              step={1}
              value={value}
              max={255}
              valueLabelDisplay="auto"
              onChange={(e, n) => {
                onChange(n);
              }}
            />
          </span>
          <Input
            style={{
              verticalAlign: "baseline",
              width: "36pt",
            }}
            value={value}
            margin="dense"
            onChange={(e) => {
              onChange(e.target.value);
            }}
            inputProps={{
              step: 1,
              min: 0,
              max: 255,
              type: "number",
            }}
          />
        </ThemeProvider>
      </div>
    );
  }

  rgbToHex(r, g, b) {
    return (
      "#" +
      ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
    );
  }

  render() {
    return (
      <ExpansionPanel
        square
        style={{ boxShadow: "none", border: "1px solid rgba(0, 0, 0, .125)" }}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <ThemeProvider
            theme={createMuiTheme({
              overrides: {
                MuiAvatar: {
                  colorDefault: {
                    color:
                      this.state.r + this.state.g + this.state.b <= 128 * 3
                        ? "#EEEEEED0"
                        : "#505050D0",
                    backgroundColor:
                      "rgb(" +
                      this.state.r +
                      "," +
                      this.state.g +
                      "," +
                      this.state.b +
                      ")",
                  },
                },
                MuiIconButton: {
                  root: {
                    color:
                      this.state.r + this.state.g + this.state.b <= 128 * 3
                        ? "#EEEEEED0"
                        : "#505050D0",
                  },
                },
              },
            })}
          >
            <Grid
              container
              spacing={2}
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <Avatar
                  style={{
                    margin: "4pt",
                  }}
                >
                  <IconButton
                    onClick={(e) => {
                      this.props.onFill(
                        this.state.r,
                        this.state.g,
                        this.state.b
                      );
                      e.stopPropagation();
                    }}
                  >
                    <FormatColorFillIcon />
                  </IconButton>
                </Avatar>
              </Grid>
              <Grid item>
                <Typography style={{ minWidth: "5em" }}>
                  {this.rgbToHex(this.state.r, this.state.g, this.state.b)}
                </Typography>
              </Grid>
            </Grid>
          </ThemeProvider>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={{ width: "100%", margin: "0pt 4pt 4pt 4pt" }}>
            <div>
              {this.makeSlider(
                "Red",
                this.state.r,
                "rgb(" + this.state.r + ",0,0)",
                (n) => {
                  this.setState({ r: n });
                  this.props.onChange(n, this.state.g, this.state.b);
                }
              )}
            </div>
            <div>
              {this.makeSlider(
                "Green",
                this.state.g,
                "rgb(0," + this.state.g + ",0)",
                (n) => {
                  this.setState({ g: n });
                  this.props.onChange(this.state.r, n, this.state.b);
                }
              )}
            </div>
            <div>
              {this.makeSlider(
                "Blue",
                this.state.b,
                "rgb(0,0," + this.state.b + ")",
                (n) => {
                  this.setState({ b: n });
                  this.props.onChange(this.state.r, this.state.g, n);
                }
              )}
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default ColorPicker;
