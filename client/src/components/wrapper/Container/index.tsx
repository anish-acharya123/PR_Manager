const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-between items-center ">{children}</div>;
};

const CenterContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-center items-center ">{children}</div>;
};

export { Container, CenterContainer };
