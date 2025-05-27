import { ClientSection } from "../ClientSection";
import { ExitPopup } from "./ExitPopup";
import { HeaderController } from "../display/HeaderController";
import { HeroSection } from "./HeroSection";
import IsThisYouSection from "./IsThisYouSection";
import { MoneyFlowSection } from "./MoneyFlowSection";
import { PlatformSection } from "./PlatformSection";
import { QuestionsSection } from "./QuestionsSection";
import React from "react";
import Storage from "@/utils/storage";
import { TypographyContainer } from "./TypographyContext";
import { UserApi } from "@/api/services/user/UserApi";
import { WealthoMeterSection } from "./WealthoMeterSection";

const LadingPage = () => {
  const [showExitPopup, setShowExitPopup] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [showWealthometer, setShowWealthometer] = React.useState<boolean>(false);

  React.useEffect(() => {
    document.addEventListener("mouseleave", () => {
      setShowExitPopup(true);
    });
  }, []);

  React.useEffect(() => {
    (async () => {
      const tokens = Storage.getToken();
      if (tokens !== null) {
        const userApiClient = new UserApi(tokens.access_token);

        setIsLoggedIn(true);

        const res: Response = await userApiClient.getWealthometer();

        if (res.status === 200) {
          setShowWealthometer(false);
        } else {
          setShowWealthometer(true);
        }

      } else {
        setIsLoggedIn(false);
      }
    })()
  }, []);

  const handleClose = () => {
    setShowExitPopup(false);
    setShow(false);
  };

  return (
    <TypographyContainer>
      <main>
        <HeaderController />
        <HeroSection showWealthometer={showWealthometer} />
        <IsThisYouSection />
        <WealthoMeterSection showWealthometer={showWealthometer} />
        <ClientSection showWealthometer={showWealthometer} />
        <PlatformSection showWealthometer={showWealthometer} />
        <MoneyFlowSection />
        <QuestionsSection />
      </main>
      {show && (
        <ExitPopup onClose={handleClose} open={showExitPopup} exitbox={true} />
      )}
    </TypographyContainer>
  );
};

export default LadingPage;
