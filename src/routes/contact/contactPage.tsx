import ContactMeInterface from '../../components/interfaces/contact/contactMeInterface';
import ImageContactInterface from '../../components/interfaces/contact/imageContactInterface';
import { useTheme } from '../../context/themeContext';


export default function ContactPage() {
  const { textColor } = useTheme();

  return (
    <>
    <div className={`relative flex flex-col md:flex-row h-screen ${textColor}`} >
      <ImageContactInterface />
      <ContactMeInterface />
    </div>
    </>
  );
}
