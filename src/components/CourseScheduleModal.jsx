import "../App.css";

const CourseScheduleModal = ({ children, isModalOpen, closeModal }) => (
  <div
    className={`modal ${isModalOpen ? "modal-show" : ""}`}
    tabIndex="-1"
    role="dialog"
    onClick={(event) => {
      if (event.target === event.currentTarget) {
        closeModal();
      }
    }}
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button
            type="button"
            className="btn-close"
            onClick={closeModal}
            aria-label="close"
          />
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  </div>
);

export default CourseScheduleModal;
