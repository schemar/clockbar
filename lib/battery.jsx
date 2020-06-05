const render = ({ batteryLevel, batteryCharging, style }) => {
  const level = Number.parseInt(batteryLevel, 10);

  const color = () => {
    if (level > 80) return "#a3be8c";
    if (level > 55) return "#ebcb8b";
    if (level > 30) return "#d08770";
    return "#bf616a";
  };

  const batStyle = () => {
    return {
      ...style,
      color: color(),
    };
  };

  const icon = () => {
    if (batteryCharging === "discharging") {
      if (level > 90) return "";
      if (level > 80) return "";
      if (level > 70) return "";
      if (level > 60) return "";
      if (level > 50) return "";
      if (level > 40) return "";
      if (level > 30) return "";
      if (level > 20) return "";
      if (level > 10) return "";
      return "";
    }

    if (level > 90) return "";
    if (level > 80) return "";
    if (level > 70) return "";
    if (level > 60) return "";
    if (level > 50) return "";
    if (level > 40) return "";
    if (level > 30) return "";
    if (level > 20) return "";
    if (level > 10) return "";
    return "";
  };

  return (
    <span style={batStyle()}>
      {icon()} {level}
    </span>
  );
};

export default render;
