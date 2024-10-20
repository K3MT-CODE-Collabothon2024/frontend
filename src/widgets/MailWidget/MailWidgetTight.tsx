import React, { useEffect, useState } from "react";
import { fetchMails, Mail } from "./MailWidgetPopup";
import { FaArrowRight } from "react-icons/fa"; // Importing an icon from react-icons

const MailWidgetTight: React.FC = () => {
  const [mails, setMails] = useState<Mail[]>([]);

  useEffect(() => {
    fetchMails().then(setMails);
  }, []);

  return (
    <div className="p-8 w-full h-64 items-center mail-widget-tight-tour">
      <h1 className="text-2xl font-bold mb-4">Emails</h1>
      <p className="text-8xl font-bold text-blue-600">{mails.length}</p>
      <div className=" mt-4 text-blue-600">
        <span>See More</span>
      </div>
    </div>
  );
};

export default MailWidgetTight;
