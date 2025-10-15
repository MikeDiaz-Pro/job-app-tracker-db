import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApplicationsHeader from "../components/ApplicationsHeader";
import ApplicationsFilters from "../components/ApplicationsFilters";
import ApplicationsTable from "../components/ApplicationsTable";
import ApplicationsPagination from "../components/ApplicationsPagination";
import { fetchApplications } from "../store/applicationsActions";
import { notifyError, notifyInfo } from "../../../utils/handleAsyncCases";
import ApplicationsDialog from "../components/ApplicationsDialog";

const ApplicationsPage = () => {  
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.applications);

  const { formDialog } = useSelector(
    (state) => state.ui
  );

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  return (
    <div className="w-full">
      {loading && notifyInfo("Loading applications...")}
      {error && notifyError(error)}      
      <ApplicationsHeader />
      <ApplicationsFilters />            
      <ApplicationsTable rows={items} />
      <ApplicationsPagination />
      <ApplicationsDialog
        open={formDialog.open}
        onClose={() => ({})}
        mode={formDialog.mode}        
      />
    </div>
  );
};

export default ApplicationsPage;
