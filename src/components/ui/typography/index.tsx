import { HeadingVariant, TypographyProps } from "./types";
import React, { createRef, useEffect, useState } from "react";
import { colors, fontStyle as fontStyles, variantStyle } from "./style";

import { TypographyTools } from "@/components/landing-page/TypographyContext";

function wrap(tag: string, content: any, needed?: boolean) {
  if (tag === "delete") tag = "del";
  // if (!needed) return;

  return React.createElement(tag, {}, content);
}

const Typography: React.FC<TypographyProps> = ({
  children,
  className,
  textStyle,
  fontStyle,
  handleChange,
  size,
  as: TypographyElement = "p",
  ...props
}) => {
  const ref = createRef<any>();
  const [showTypographyTools, setShowTypographyTools] =
    useState<boolean>(false);

  // let [parentHeadingElement, setParentHeadingElement] =
  //   useState<boolean>(false);

  // useEffect(() => {
  //   const headings = ["h1", "h2", "h3", "h4"];

  //   if (headings.includes(ref.current.parentElement.localName))
  //     setParentHeadingElement(true);
  // }, []);

  const handleClick = () => {
    setShowTypographyTools(!showTypographyTools);
  };

  const classes = [
    variantStyle[TypographyElement],
    className,
    fontStyles[
      (typeof TypographyElement as HeadingVariant) && !fontStyle
        ? ""
        : fontStyle ?? "normal"
    ],
    colors[props.color ?? "secondary"],
  ]
    .filter(Boolean)
    .join(" ");

  if (textStyle) {
    return wrap(textStyle, children);
  }

  return (
    <div className="relative">
      <TypographyElement
        style={{
          fontSize: size,
        }}
        ref={ref}
        className={classes}
        {...props}
        onClick={handleClick}
      >
        {children}
      </TypographyElement>
      {showTypographyTools && <TypographyTools handleChange={handleChange} />}
    </div>
  );
};

export default Typography;

// import React from 'react';
// import { Space, Typography } from 'antd';

// const { Text, Link } = Typography;

// const App: React.FC = () => (
//   <Space direction="vertical">
//     <Text>Ant Design (default)</Text>
//     <Text type="secondary">Ant Design (secondary)</Text>
//     <Text type="success">Ant Design (success)</Text>
//     <Text type="warning">Ant Design (warning)</Text>
//     <Text type="danger">Ant Design (danger)</Text>
//     <Text disabled>Ant Design (disabled)</Text>
//     <Text mark>Ant Design (mark)</Text>
//     <Text code>Ant Design (code)</Text>
//     <Text keyboard>Ant Design (keyboard)</Text>
//     <Text underline>Ant Design (underline)</Text>
//     <Text delete>Ant Design (delete)</Text>
//     <Text strong>Ant Design (strong)</Text>
//     <Text italic>Ant Design (italic)</Text>
//     <Link href="https://ant.design" target="_blank">
//       Ant Design (Link)
//     </Link>
//   </Space>
// );

// export default App;

// import React from 'react';
// import { Typography } from 'antd';

// const { Title } = Typography;

// const App: React.FC = () => (
//   <>
//     <Title>h1. Ant Design</Title>
//     <Title level={2}>h2. Ant Design</Title>
//     <Title level={3}>h3. Ant Design</Title>
//     <Title level={4}>h4. Ant Design</Title>
//     <Title level={5}>h5. Ant Design</Title>
//   </>
// );

// export default App;
