import "slate";

declare module "slate" {
  interface BaseText {
    bold?: boolean;
    underline: boolean;
    italic: boolean;
  }
}
