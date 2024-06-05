
import React from 'react';
import LinkedInIcon from '../../icons/linkedinIconInteface';
import mail from '../../images/mail.png'
import ContactMeInterface from '../../components/interfaces/curriculum/contactMeInterface';

export default function ContactPage() {
  return (
    <div className="relative flex flex-col md:flex-row h-screen bg-gray-100 ">
      <img src={mail} alt="Logo" className="absolute inset-0 h-full w-full object-cover opacity-20 md:opacity-100 md:h-[80vh]  md:fixed md:w-auto pl-auto md:pl-[5vh] md:my-auto" />

      <div className="relative flex flex-col justify-center items-center w-full md:w-1/2 ml-auto my-auto">
        <div className="w-[80vw] md:w-[40vw] md:h-[80vh] p-6 bg-white rounded-lg shadow-md mt-[10vh]">
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="material-icons mr-2 text-bluePrimary">mail</span>
              <p className="text-gray-700">rodrigoplaceres19@gmail.com</p>
            </div>
            <div className="flex items-center">
              <a
                href="https://www.linkedin.com/in/rodrigo-placeres/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <LinkedInIcon />
                <p className="text-gray-700 ml-2">/rodrigo-placeres</p>
              </a>
            </div>
            <div className="flex items-center">
              <span className="material-icons mr-2 text-bluePrimary">phone</span>
              <p className="text-gray-700">+1234567890</p>
            </div>
          </div>
          <ContactMeInterface />
        </div>
      </div>
    </div>
  );
}

