import Container from "./Container";
import { QuoteType } from "@/types/block";
import React from "react";

export const Quote: React.FC<QuoteType> = ({ content, author }) => {
  return (
    <Container>
      <div className="flex flex-wrap -mx-4 justify-center">
        <div className="w-full lg:flex-2/3 px-[15px] lg:max-w-2/3">
          <div className="my-2">
            <div className="feature-quote px-[10%] text-center">
              <p className="mb-0 text-3xl font-serif italic">{content}</p>
              <p className="text-gray-600 text-lg mt-1 leading-relaxed max-w-4xl font-normal font-robo uppercase">
                {author}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

// const QuoteSvgIcon = (
// 	<svg width="50" height="41" xmlns="http://www.w3.org/2000/svg">
//     <path d="M21.083 20.029V40.81H0V27.106c0-5.22.904-9.964 2.71-14.23C4.519 8.608 7.58 4.315 11.898 0l7.68 6.024c-2.41 2.61-4.267 5.02-5.572 7.228-1.305 2.209-2.159 4.467-2.56 6.777h9.638zm28.913 0V40.81H28.913V27.106c0-5.22.904-9.964 2.711-14.23C33.431 8.608 36.494 4.315 40.81 0l7.68 6.024c-2.41 2.61-4.267 5.02-5.572 7.228-1.305 2.209-2.158 4.467-2.56 6.777h9.638z" fill="#f2f2f2" fill-rule="evenodd"/>
// </svg>
// )
