import contactAvatar from '../../images/avatar-phone.png';
import bg from '../../images/bg-avatar3.png';

export default function ContactPage() {
  return (
    <div className="relative flex flex-col md:flex-row h-screen text-grayPrimary">
      <div className="hidden md:flex md:w-1/2 h-full justify-center items-center pt-[10vh]"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: '60%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
        <img
          src={contactAvatar}
          alt="Contact"
          className="h-[75%] w-auto object-contain drop-shadow-white"
        />
      </div>

      <div className="md:hidden absolute inset-0 h-full w-full object-cover opacity-20 content-center pt-[10vh]" style={{ backgroundImage: `url(${bg})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
        <img src={contactAvatar} alt="Logo" className="h-[80%] w-auto object-cover" />
      </div>

      <div className="relative flex flex-col justify-center items-center w-full md:w-1/2 ml-auto my-auto p-6">
        <div className="w-[80vw] md:w-[40vw] md:h-[80vh] p-6 border border-grayPrimary rounded-lg shadow-md mt-[10vh]">
          <h2 className="text-xl font-semibold mb-4">Envíame un mensaje</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block">Nombre</label>
              <input
                id="name"
                name="name"
                className="mt-1 block w-full p-2 border border-grayPrimary rounded-md bg-transparent"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-1 block w-full p-2 border border-grayPrimary rounded-md bg-transparent"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block">Mensaje</label>
              <textarea
                id="message"
                name="message"
                className="mt-1 block w-full p-2 border border-grayPrimary rounded-md resize-none min-h-[20vh] bg-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full text-grayPrimary p-2 rounded-md border border-grayPrimary bg-transparent hover:font-bold hover:border-2"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
