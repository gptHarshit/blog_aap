import React from "react";

function ConfirmDialog({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <h3>Are you sure?</h3>
        <p>Do you really want to delete this post?</p>
        <div className="buttons">
          <button className="cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
