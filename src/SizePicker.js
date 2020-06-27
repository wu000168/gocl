import React from "react";
import { OutlinedInput, Box, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

class SizePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      r: props.size.rows,
      c: props.size.cols,
    };
  }
  render() {
    return (
      <Box display="flex" alignItems="center">
        {/* <Typography style={{ margin: "8pt" }}>Size:</Typography> */}
        <OutlinedInput
          size="small"
          style={{
            width: "64pt",
          }}
          value={this.state.r}
          margin="dense"
          onChange={(e) =>
            this.setState({
              r: e.target.value,
            })
          }
          inputProps={{
            step: 1,
            min: 1,
            max: 128,
            type: "number",
            label: "Rows",
          }}
        />
        <CloseIcon style={{ margin: "2pt 2pt 2pt 2pt" }} />
        <OutlinedInput
          size="small"
          style={{
            width: "64pt",
          }}
          value={this.state.c}
          margin="dense"
          onChange={(e) =>
            this.setState({
              c: e.target.value,
            })
          }
          inputProps={{
            step: 1,
            min: 1,
            max: 128,
            type: "number",
            label: "Columns",
          }}
        />
        <Button
          color="primary"
          variant="outlined"
          style={{ margin: "4pt" }}
          size="large"
          onClick={() => this.props.onApply(this.state.r, this.state.c)}
        >
          Apply
        </Button>
      </Box>
    );
  }
}

export default SizePicker;
