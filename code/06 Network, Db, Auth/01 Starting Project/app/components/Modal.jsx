function Modal({ onClose, children }) {
  return (
    <>
      <div
        className="fixed top-0 left-0 h-screen w-screen bg-slate-900 opacity-80"
        onClick={onClose}
      />
      <dialog
        open
        className="m-0 fixed top-10 left-[50%] -translate-x-1/2 bg-slate-300 rounded-md p-4 w-96"
      >
        {children}
      </dialog>
    </>
  );
}

export default Modal;
