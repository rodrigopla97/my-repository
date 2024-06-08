import mail from '../../images/mail.png';
import contact from '../../images/contact.png';

export default function ContactPage() {
  return (
    <div className="relative flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="hidden md:flex md:w-1/2 h-full justify-center items-center p-4">
        <img
          src={contact}
          alt="Contact"
          className="h-[75%] w-auto object-contain animate-tilt"
        />
      </div>

      <div className="md:hidden absolute inset-0 h-full w-full object-cover opacity-20">
        <img src={mail} alt="Logo" className="h-full w-full object-cover" />
      </div>

      <div className="relative flex flex-col justify-center items-center w-full md:w-1/2 ml-auto my-auto p-6">
        <div className="w-[80vw] md:w-[40vw] md:h-[80vh] p-6 bg-white rounded-lg shadow-md mt-[10vh]">
          <h2 className="text-xl font-semibold mb-4">Envíame un mensaje</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Nombre</label>
              <input
                id="name"
                name="name"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700">Mensaje</label>
              <textarea
                id="message"
                name="message"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md resize-none min-h-[20vh]"
              />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
