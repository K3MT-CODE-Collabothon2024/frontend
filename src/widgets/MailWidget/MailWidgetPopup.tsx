import React, { useEffect, useState } from "react";

export type Mail = {
  emailId: number;
  date: string;
  subject: string;
  sender: string;
};

export const fetchMails = async () => {
  const response = await fetch("http://localhost:8080/email/1");
  const jsonData = await response.json();

  const mails: Mail[] = jsonData.map((mail: any) => ({
    emailId: mail.emailId,
    subject: mail.subject,
    sender: mail.sender,
    date: new Date(mail.date).toLocaleDateString(),
  }));

  return mails;
};

const MailWidgetPopup: React.FC = () => {
  const [mails, setMails] = useState<Mail[]>([]);

  useEffect(() => {
    fetchMails().then(setMails);
  }, []);

  return (
    <div className="mail-widget-popup p-4">
      <h2 className="text-3xl font-bold mb-4">Mails</h2>
      <p className="mb-4">Mails we recently sent to you.</p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-lg mail-widget-popup-tour">
          <thead>
            <tr>
              <th className="px-6 py-4 border-b">Date</th>
              <th className="px-6 py-4 border-b">Subject</th>
              <th className="px-6 py-4 border-b">Sender</th>
            </tr>
          </thead>
          <tbody>
            {mails.map((mail) => (
              <tr key={mail.emailId} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b text-blue-600">
                  {mail.date}
                </td>
                <td className="px-6 py-4 border-b text-blue-600">
                  {mail.subject}
                </td>
                <td className="px-6 py-4 border-b text-blue-600">
                  {mail.sender}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MailWidgetPopup;
