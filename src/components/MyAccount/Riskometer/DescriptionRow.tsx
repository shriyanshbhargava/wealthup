import React from "react";
import Container from "../../ui/Container";

export const DescriptionRow: React.FC<{
  heading: string;
  description: string;
}> = ({ heading, description }) => {
  return (
    <div className="border-b-2 border-primary-new py-4">
      <Container>
        <h2 className="text-xl md:text-3xl text-primary-new font-robo font-medium">
          {heading}
        </h2>
        <p className="text-xl md:text-2xl font-sans font-normal">
          {description}
        </p>
      </Container>
    </div>
  );
};
