import { ReactNode } from "react";

export type HeadingVariant = "h1" | "h2" | "h3" | "h4";

type Variant = HeadingVariant | "p" | "span";
type Style = "hero" | "article-heading"; // Todo: Need to change this

type TextStyle = "underline" | "italic" | "strong" | "mark" | "code" | "delete";

type FontStyle = "capitalize" | "light" | "medium" | "bold";

type Color = "primary" | "primary-dark" | "secondary" | "white";

type NativeAttr = Omit<React.HTMLAttributes<unknown>, keyof Variant>;

interface Props {
  children: ReactNode;
  as?: Variant;
  style?: Style;
  textStyle?: TextStyle;
  fontStyle?: FontStyle;
  color?: Color;
  size: string;
  handleChange: (value: number) => void;
}

export type TypographyProps = Props & NativeAttr;
