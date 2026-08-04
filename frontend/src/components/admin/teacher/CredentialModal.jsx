import { X, CircleCheck } from "lucide-react";

const CredentialModal=({
    open,
    onClose
})=>{

    if(!open)return null;

    return(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[400px] rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <CircleCheck size={20}/>
                        </div>
                        <h2 className="font-semibold text-gray-800">
                            Teacher Created
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={18}/>
                    </button>
                </div>
                <p className="text-sm text-gray-600 leading-6">
                    The teacher account has been created successfully.
                    <br/><br/>
                    The login credentials have been sent automatically to the teacher's email address.
                </p>
                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default CredentialModal;