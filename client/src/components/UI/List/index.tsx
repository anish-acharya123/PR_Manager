import React from "react";

type ListProps<T> = {
  items: T[] | undefined;
  renderItem: (item: T) => React.ReactElement;
  className?: string;
};

const List = <T,>({ items, renderItem, className }: ListProps<T>) => {
  return <ul className={className}>{items?.map(renderItem)}</ul>;
};

export default List;
