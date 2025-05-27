import Container from "./Container";
import Image from "next/legacy/image";
import { MediaContentType } from "@/types/block";
import React from "react";
import RichText from "./RichText";

export const MediaContent: React.FC<MediaContentType> = ({
  alignment,
  richText,
  media,
  embeddedVideo,
}) => {
  return (
    <Container>
      <div className="lg:flex lg:items-center py-6">
        {alignment === "contentOnLeft" ? (
          <>
            <div className="w-full lg:w-1/2">
              <RichText content={richText} />
            </div>
            <div className="w-full flex justify-center lg:w-1/2">
              {embeddedVideo?.embed ? (
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${embeddedVideo.videoUrl.split("=")[1]
                    }`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <Image
                  src={media.url}
                  alt="Contet Media"
                  width="560"
                  height="315"
                />
              )}
            </div>
          </>
        ) : (
          <>
            <div className="w-full lg:w-1/2">
              {embeddedVideo?.embed ? (
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${embeddedVideo.videoUrl.split("=")[1]
                    }`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <Image
                  src={media.url}
                  alt="Contet Media"
                  width="560"
                  height="315"
                />
              )}
            </div>
            <div className="w-full lg:w-1/2">
              <RichText content={richText} />
            </div>
          </>
        )}
      </div>
    </Container>
  );
};
