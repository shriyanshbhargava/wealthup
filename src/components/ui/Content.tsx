import Container from "./Container";
import { ContentType } from "@/types/block";
import React from "react";
import RichText from "./RichText";

const Content: React.FC<ContentType & { richText: unknown; }> = ({ content, richText }) => {
  return (
    <Container>
          <RichText content={richText ? richText : content} />
      {/* <div className="flex flex-wrap -mx-4 justify-center">
        <div className="w-full lg:flex-2/3 px-[15px] lg:max-w-2/3">
        </div>
      </div> */}
    </Container>
  );
};

export default Content;
