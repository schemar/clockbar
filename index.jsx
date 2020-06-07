// Requires DejaVuSansMono Nerd Font to display icons.
// Set another Nerd Font in `barStyle`'s `fontFamily`.

import moment from "moment";

import Battery from "./lib/battery.jsx";
import CPU from "./lib/cpu.jsx";
import Memory from "./lib/memory.jsx";

export const command = `
BATTERY_LEVEL=$(pmset -g batt | egrep '\\d+%' -o | cut -f1 -d'%' );
BATTERY_CHARGING=$(pmset -g batt | egrep '\\d+%; \\w+;' -o | cut -f2 -d';' | tr -d '[:space:]' );
CPU=$(top -l 1 | awk '/^CPU usage: / { print substr($5, 1, length($5)-1) }');
MEMORY_USED=$(top -l 1 | grep PhysMem: | awk '{print $2}');
MEMORY_FREE=$(top -l 1 | grep PhysMem: | awk '{print $6}');

echo $(cat <<-EOF
  {
    "batteryLevel": "$BATTERY_LEVEL",
    "batteryCharging": "$BATTERY_CHARGING",
    "cpu": "$CPU",
    "memoryUsed": "$MEMORY_USED",
    "memoryFree": "$MEMORY_FREE"
  }
EOF
);
`;

const result = (data, key) => {
  try {
    return JSON.parse(data)[key];
  } catch (error) {
    return error.toString();
  }
};

export const refreshFrequency = 10000; // in milliseconds

const barStyle = {
  bottom: 0,
  left: 0,
  right: 0,
  position: "fixed",
  background: "#2e3440",
  color: "#eceff4",
  overflow: "hidden",
  height: "15px",
  fontFamily: "DejaVuSansMono Nerd Font",
  fontSize: "14px",
  padding: "0",
  margin: "0",
  boxShadow: "0 0 5px black",
};

const rightStyle = {
  float: "right",
  paddingRight: "10px",
};

const leftStyle = {
  float: "left",
  paddingLeft: "10px",
};

export const updateState = (event, previousState) => {
  if (event.error) {
    return { ...previousState, warning: `We got an error: ${event.error}` };
  }
  const [cpuPct, processName] = event.output.split(",");
  return {
    ...previousState,
    output: event.output,
  };
};

export const render = ({ output, error }) => {
  return error ? (
    <div>
      Something went wrong: <strong>{String(error)}</strong>
    </div>
  ) : (
    <div style={barStyle}>
      <div style={rightStyle}> {moment().format("HH:mm")}</div>
      <div style={rightStyle}> {moment().format("YYYY-MM-DD")}</div>
      <Battery
        style={rightStyle}
        batteryLevel={result(output, "batteryLevel")}
        batteryCharging={result(output, "batteryCharging")}
      />
      <CPU style={leftStyle} usage={result(output, "cpu")} />
      <Memory
        style={leftStyle}
        used={result(output, "memoryUsed")}
        free={result(output, "memoryFree")}
      />
    </div>
  );
};
