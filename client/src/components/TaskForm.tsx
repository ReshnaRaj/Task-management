 

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-[90%] max-w-md shadow-lg relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal