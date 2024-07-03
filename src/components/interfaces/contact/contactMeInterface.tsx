import { useTheme } from "../../../context/themeContext";

export default function ContactMeInterface() {

  const { borderColor, textColor, isDarkMode } = useTheme();

  const classInput = `mt-1 block w-full p-2 border ${borderColor} rounded-md bg-transparent`

  return (
    <div className="relative flex flex-col justify-center items-center w-full md:w-1/2 ml-auto my-auto p-6">
        <div className={`w-[80vw] md:w-[40vw] md:h-[80vh] p-6 border ${borderColor} rounded-lg shadow-md mt-[10vh]`} >
          <h2 className="text-xl font-semibold mb-4">Envíame un mensaje</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block">Nombre</label>
              <input
                id="name"
                name="name"
                className={`${classInput}`}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className={`${classInput}`}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block">Mensaje</label>
              <textarea
                id="message"
                name="message"
                className={`mt-1 block w-full p-2 border ${borderColor} rounded-md resize-none min-h-[20vh] bg-transparent`}
              />
            </div>

            <button
              type="submit"
              className={`w-full ${textColor} p-2 rounded-md hover:font-bold ${isDarkMode ? "bg-cvButtonPrimary" : "bg-cvButtonSecondary"}`}
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
  );
}
