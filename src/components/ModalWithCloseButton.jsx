import React from "react";

const ModalWithCloseButton = ({ id, title, content }) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="py-4">{content}</div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-error text-white">Tutup</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalWithCloseButton;
