import Container from "./Container";
import { MediaType } from "@/types/block";
import React from "react";
import RichText from "./RichText";

export const Media: React.FC<MediaType> = ({
  media,
  useYoutube,
  caption,
  youtubeLink,
}) => {
  return (
    <Container>
      <div className="flex flex-wrap justify-center py-3">
        <div className="w-full lg:max-w-2/3 lg:flex-2/3">
          {useYoutube ? (
            <div className="w-full flex justify-center">
              <iframe
                width="100%"
                height="720"
                src={`https://www.youtube.com/embed/${youtubeLink.split("=")[1]
                  }`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <>
              {!!media && !!media?.url ? (
                <div className="h-full w-full">
                  <img src={media?.url} alt="Media Image" />
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center bg-gray-300">
                  NO IMAGE
                </div>
              )}
            </>
          )}
          <div className="mt-1 border-gray-500">
            <RichText content={caption} />
          </div>
        </div>
      </div>
    </Container>
  );
};
