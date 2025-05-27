import { Layout } from "@/types/collection";
import React from "react";
import { components } from ".";

type Props = {
  layout: Layout[];
};

// interface Props {
//   layout: Array<{ blockType: string; richText: Array<{ type: string; children: Array<{ text: string; bold?: boolean }> }> }>;
// }


// const TextBlock: React.FC<any> = ({ children }) => <div>{children}</div>;
// const HeadingBlock: React.FC<any> = ({ children }) => <h2>{children}</h2>;

// const components: Record<string, React.FC<any>> = {
//   content: TextBlock, // You can add more mappings as needed
// };

const RenderBlocks: React.FC<Props> = ({ layout }) => (
  <>
    {layout.map((block, i) => {
      const Block: React.FC<any> = components[block.blockType];

      if (Block) {
        return <Block {...block} key={i}  />;
      }

      return null;
    })}

{/* {layout.map((block, i) => {
      const { blockType, richText } = block;
      const Block: React.FC<any> = components[blockType];

      if (Block) {
        return (
          <Block key={i}>
            {richText.map((textBlock, j) => {
              const { type, children } = textBlock;
              switch (type) {
                case 'p':
                  return <p key={j}>{renderText(children)}</p>;
                case 'h2':
                  return <h2 key={j}>{renderText(children)}</h2>;
                // Add more cases as needed
                default:
                  return null;
              }
            })}
          </Block>
        );
      }

      return null;
    })} */}


  </>
);

export default RenderBlocks;



// const renderText = (textBlocks: Array<{ text: string; bold?: boolean }>) => (
//   <>
//     {textBlocks.map((textBlock, k) => (
//       <span key={k} style={{ fontWeight: textBlock.bold ? 'bold' : 'normal' }}>
//         {textBlock.text}
//       </span>
//     ))}
//   </>
// );
