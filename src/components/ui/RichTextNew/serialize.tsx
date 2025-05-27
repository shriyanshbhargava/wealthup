/* eslint-disable import/no-extraneous-dependencies */
import { Fragment } from "react";
import escapeHTML from "escape-html";

import { Text } from "slate";

const serialize = (children: any, financialGlossary: boolean) =>
  children.map((node: any, i: number) => {
    if (Text.isText(node)) {
      let text = (
        <span
          className={`${node.text.length === 0 ? "block" : ""}`}
          dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }}
        />
      );

      if (node.bold) {
        text = <strong key={i}>{text}</strong>;
      }

      if (node.italic) {
        text = <em key={i}>{text}</em>;
      }

      if (node.underline) {
        text = (
          <span style={{ textDecoration: "underline" }} key={i}>
            {text}
          </span>
        );
      }

      return <Fragment key={i}>{text}</Fragment>;
    }

    if (!node) {
      return null;
    }

    switch (node.type) {
      case "h1":
        return (
          <h1
            key={i}
            className="text-xl md:text-2xl font-robo font-medium lg:text-[3vw]"
          >
            {serialize(node.children, financialGlossary)}
          </h1>
        );
      case "h2":
        return <h2 className="text-xl font-medium leading-tight mb-2 text-current" key={i}>{serialize(node.children, financialGlossary)}</h2>;
      case "h3":
        return (
          <h3 className="text-xl  font-medium  leading-tight" key={i}>
            {serialize(node.children, financialGlossary)}
          </h3>
        );
      case "h4":
        return (
          <h4
            key={i}
            className="text-lg lg:text-xl  mt-4 mb-2 font-robo font-medium leading-[1.2]"
          >
            {serialize(node.children, financialGlossary)}
          </h4>
        );
      case "h5":
        return <h5 key={i} className="text-lg lg:text-xl">{serialize(node.children, financialGlossary)}</h5>;
      case "h6":
        return <h6 key={i}>{serialize(node.children, financialGlossary)}</h6>;
      case "quote":
        return <blockquote key={i}>{serialize(node.children, financialGlossary)}</blockquote>;
      case "ul":
        return (
          <ul
            key={i}
            className={`${financialGlossary ? "text-base mb-4 text-current" : "text-[3.5vw] sm:text-[3vw] lg:text-[1.25vw] font-sans font-normal list-disc"}`}
            style={{ paddingLeft: "3rem", listStyleType: "decimal" }}
          >
            {serialize(node.children, financialGlossary)}
          </ul>
        );
      case "ol":
        return (
          <ol
            key={i}
            className={`${financialGlossary ? "text-base mb-4 text-current" : "text-[3.5vw] sm:text-[3vw] lg:text-[1.25vw] font-sans font-normal"}`}
            style={{ paddingLeft: "3rem", listStyleType: "decimal" }}
          >
            {serialize(node.children, financialGlossary)}
          </ol>
        );
      case "li":
        return <li key={i} className="list-disc">{serialize(node.children, financialGlossary)}</li>;
      case "link":
        return (
          <a
            href={escapeHTML(node.url)}
            // className="text-blue-500 hover:underline"
            style={{ color: "blue", textDecoration: "underline" }}
            key={i}
          >
            {serialize(node.children, financialGlossary)}
          </a>
        );

      case "hr":
        return <hr key={i} />;

      case "indent":
        return (
          <div style={{ paddingLeft: "2rem" }} key={i}>
            {serialize(node.children, financialGlossary)}
          </div>
        );

      default:
        return (
          <p className={`${financialGlossary ? "text-base font-normal leading-tight text-current mb-1" : "xl:text-lg xxl:text-xl  font-sans font-normal"}`} key={i}>
            {serialize(node.children, financialGlossary)}
          </p>
        );
    }
  });

export default serialize;
