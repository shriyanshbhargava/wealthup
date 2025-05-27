import { Button } from "./Button";
import { CTAType } from "@/types/block";
import Container from "./Container";
import Link from "next/link";
import React from "react";
import RichText from "./RichText";

const CallToAction: React.FC<CTAType> = ({ richText, buttons }) => {
  return (
    // <section className="my-6 px-6 py-8 bg-primary">
    // </section>
    <Container>
      <div className="flex flex-wrap justify-center py-10">
        <div className="w-full lg:max-w-2/3 lg:flex-2/3 bg-primary">
          <div className="py-10 px-8">
            <div className="text-white">
              <RichText content={richText} />
            </div>
            <div className="mt-8">
              {buttons.map((button, key) => (
                (<Link
                  key={key}
                  href={button.url!}
                  target={button.newTab ? "_blank" : "_self"}
                  rel="noreferrer noopener"
                >

                  <Button size="bigger" color="white">
                    {button.label}
                  </Button>

                </Link>)
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CallToAction;
