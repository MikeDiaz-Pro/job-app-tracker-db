import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApplicationsHeader from "../components/ApplicationsHeader";
import ApplicationsFilters from "../components/ApplicationsFilters";
import ApplicationsTable from "../components/ApplicationsTable";
import ApplicationsPagination from "../components/ApplicationsPagination";
import { fetchApplications } from "../store/applicationsActions";

const ApplicationsPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  return (
    <div className="w-full">
      <ApplicationsHeader />
      <ApplicationsFilters />
      {loading && <p>Loading applications...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <ApplicationsTable rows={items} />
      <ApplicationsPagination />
    </div>
  );
};

export default ApplicationsPage;
