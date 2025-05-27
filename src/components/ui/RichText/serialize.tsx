/* eslint-disable import/no-extraneous-dependencies */
import { Fragment } from "react";
import escapeHTML from "escape-html";

import { Text } from "slate";

const serialize = (children: any, financialGlossary: boolean, blog: boolean) =>
  children.map((node: any, i: number) => {
    if (Text.isText(node)) {
      let text = (
        <span
          className={`${node.text.length === 0 ? "block h-4 my-4" : ""}`}
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
            className={`text-[32px] md:text-[48px] font-semibold ${blog ? 'text-brand-blue' : 'text-white' } text-center`}
          >
            {serialize(node.children, financialGlossary, blog)}
          </h1>
        );
      case "h2":
        return <h2 className={`text-2xl leading-tight mb-2 ${blog ? 'text-brand-blue' : 'text-white' } font-bold`} key={i}>{serialize(node.children, financialGlossary, blog)}</h2>;
      case "h3":
        return (
          <h3 className="xl:text-[28px] xxl:text-4xl leading-tight" key={i}>
            {serialize(node.children, financialGlossary, blog)}
          </h3>
        );
      case "h4":
        return (
          <h4
            key={i}
            className={`text-lg md:text-2xl mb-2 font-robo font-bold ${blog ? 'text-brand-blue' : 'text-white' }`}
          >
            {serialize(node.children, financialGlossary, blog)}
          </h4>
        );
      case "h5":
        return <h5 key={i}>{serialize(node.children, financialGlossary, blog)}</h5>;
      case "h6":
        return <h6 key={i}>{serialize(node.children, financialGlossary, blog)}</h6>;
      case "quote":
        return <blockquote key={i}>{serialize(node.children, financialGlossary, blog)}</blockquote>;
      case "ul":
        return (
          <ul
            key={i}
            className={`${financialGlossary ? "text-base mb-4 text-current" : `text-[12px] md:text-lg font-sans font-normal ${blog ? 'text-black' : 'text-white' }`}`}
            style={{ paddingLeft: "3rem", listStyleType: "decimal" }}
          >
            {serialize(node.children, financialGlossary, blog)}
          </ul>
        );
      case "ol":
        return (
          <ol
            key={i}
            className={`${financialGlossary ? "text-base mb-4 text-current" : `text-[12px] md:text-lg font-sans font-normal ${blog ? 'text-black' : 'text-white' }`}`}
            style={{ paddingLeft: "3rem", listStyleType: "decimal" }}
          >
            {serialize(node.children, financialGlossary, blog)}
          </ol>
        );
      case "li":
        return <li key={i}>{serialize(node.children, financialGlossary, blog)}</li>;
      case "link":
        return (
          <a
            href={escapeHTML(node.url)}
            // className="text-blue-500 hover:underline"
            style={{ color: "black", textDecoration: "underline" }}
            key={i}
          >
            {serialize(node.children, financialGlossary, blog)}
          </a>
        );

      case "hr":
        return <hr key={i} />;

      case "indent":
        return (
          <div style={{ paddingLeft: "2rem" }} key={i}>
            {serialize(node.children, financialGlossary, blog)}
          </div>
        );

      default:
        return (
          <p className={`${financialGlossary ? "text-base leading-tight text-current mb-0" : "text-[12px] md:text-lg text-justify font-sans font-normal"} ${blog ? 'text-black' : 'text-white' }`} key={i}>
            {serialize(node.children, financialGlossary, blog)}
          </p>
        );
    }
  });

export default serialize;
