const Card = ({
  children,
  className = "",
  style = {},
}) => {
  return (
    <div
      className={` rounded-2xl bg-white shadow-xl 
        ${className}
      `}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;