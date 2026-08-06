import { X, AlertTriangle, LogOut } from "lucide-react";

const ConfirmModal=({
    open,
    title,
    message,
    confirmText="Confirm",
    onClose,
    onConfirm,
    danger = true,
    Icon = AlertTriangle,
})=>{

    if(!open)return null;

    return(
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-[380px] rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${danger?"bg-red-100 text-red-600":"bg-green-100 text-green-600"}`}>
                            <Icon size={20}/>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                            {title}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={18}/>
                    </button>
                </div>

                <div className="mb-6">
                    <p className="text-sm text-gray-500">
                        {message}
                    </p>
                </div>
            
                <div className="flex justify-end gap-3">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-sm border border-gray-200 text-gray-600 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 rounded-lg text-sm text-white font-medium ${danger?"bg-red-600 hover:bg-red-700":"bg-green-600 hover:bg-green-700"}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;