import { Dialog, IconButton } from "@material-tailwind/react";
import { Xmark } from "iconoir-react";
import ApplicationsForm from "./ApplicationsForm";

import { useDispatch, useSelector } from "react-redux";

const ApplicationsDialog = () => {
    const { formDialog } = useSelector(
        (state) => state.ui
    );
    const dispatch = useDispatch()    
    
    return (
        <Dialog open={formDialog.open}  size="sm">
            <Dialog.Overlay>
                <Dialog.Content className="relative p-6">           
                    <ApplicationsForm />
                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog>
    );
};

export default ApplicationsDialog;