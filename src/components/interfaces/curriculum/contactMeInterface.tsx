export default function ContactMeInterface() {
  return (
    <div className="relative flex flex-col justify-center items-center w-full md:w-1/2 ml-auto my-auto">
      <div className="w-[80vw] md:w-[40vw] md:h-[80vh] p-6 bg-red rounded-lg shadow-md mt-[10vh]">
        <h2 className="text-xl font-semibold mb-4">Envíame un mensaje</h2>
        <form className="text-gray-100">
          <div className="mb-4">
            <label htmlFor="name" className="block">Nombre</label>
            <input
              id="name"
              name="name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-transparent"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-transparent"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block">Mensaje</label>
            <textarea
              id="message"
              name="message"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md resize-none min-h-[20vh] bg-transparent"
            />
          </div>

          <button type="submit" className="w-full text-gray-100 p-2 rounded-md border border-gray-100 bg-transparent hover:bg-gray-100 hover:text-black">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
