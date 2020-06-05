const render = ({ usage, style }) => {
  const level = Math.ceil(Number.parseFloat(usage));

  return <span style={style}> {level}%</span>;
};

export default render;
