// Tour.js
import React, { useState } from "react";
import Joyride from "react-joyride";

const Tour = () => {
  const [run, setRun] = useState(true);

  const steps = [
    {
      target: ".mail-widget-tight-tour",
      content:
        "Those are widgets. You can drag and arrange them however you want.",
    },
    {
      target: ".add-widget-tour",
      content: "This is the add widget where you can add more widgets.",
    },
    {
      target: ".mail-widget-tight-tour",
      content: "You can click every widget to see more details. Click it!",
    },
    {
      target: ".mail-widget-popup-tour",
      content: "This is the mail widget popup where you can see mails.",
    },
    {
      target: ".overflow-x-auto",
      content: "Here you can see the list of mails.",
    },
  ];

  const handlePopupOpen = () => {
    setRun(true);
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
      disableCloseOnEsc={false}
      disableOverlayClose={false}
      spotlightClicks={true}
      callback={(data) => {
        if (data.status === "finished") {
          setRun(false);
        }
      }}
    />
  );
};

export default Tour;
