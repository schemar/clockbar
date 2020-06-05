const render = ({ used, free, style }) => {
  return (
    <span style={style}>
       {used} used ({free} free)
    </span>
  );
};

export default render;
