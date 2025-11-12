import './MainModal.scss'

interface ModalProps {
  content: React.ReactNode;
}

const MainModal = ({content} : ModalProps) => {
  return (
    <>
      <div className="modal-wrapper">
        <div className="modal-overlay"></div>
        <div className="modal-content">
          {content}
        </div>
      </div>
    </>
  );
};

export default MainModal;