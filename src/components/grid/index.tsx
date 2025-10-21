import clsx from "clsx";

export default function Grid(props: React.ComponentProps<"ul">) {
  return (
    <ul
      {...props}
      className={clsx("grid grid-flow-row gap-6 md:gap-8", props.className)}
    >
      {props.children}
    </ul>
  );
}

function GridItem(props: React.ComponentProps<"li">) {
  return (
    <li
      {...props}
      className={clsx(
        "aspect-square transition-all duration-500 hover:scale-[1.03] hover:z-10 hover:shadow-glow-purple group",
        props.className
      )}
    >
      {props.children}
    </li>
  );
}

Grid.Item = GridItem;
