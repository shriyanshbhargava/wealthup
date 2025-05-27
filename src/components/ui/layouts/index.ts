import CallToAction from "../CallToAction";
import Content from "../Content";
import { Media } from "../Media";
import { MediaContent } from "../MediaContent";
import { Quote } from "../Quote";
import Spacer from "../Spacer";

export const components = {
  media: Media,
  content: Content,
  richText: Content, // Should be same as content
  quote: Quote,
  mediaContent: MediaContent,
  spacer: Spacer,
  cta: CallToAction,
};
