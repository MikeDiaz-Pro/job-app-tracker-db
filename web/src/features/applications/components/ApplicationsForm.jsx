import { useDispatch, useSelector } from "react-redux";
import { setFormField, resetForm } from "../store/applicationsSlice";
import { closeFormDialog } from "../../../app/ui/uiSlice";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { createApplication } from "../store/applicationsActions";

const ApplicationsForm = ({formDialog}) => {
  const dispatch = useDispatch();
  const { values, mode } = useSelector((state) => state.applications.form);
  
  const handleChange = (e) => {
    dispatch(setFormField({ field: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();    
    dispatch(createApplication(formDialog))
    dispatch(resetForm());
  };

  const handleClose = () => {    
    dispatch(closeFormDialog())
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Typography type="h6">
        {mode === "create" ? "Create Application" : "Edit Application"}
      </Typography>

      <Input
        name="jobPostingId"
        placeholder="Job Posting ID"
        value={values.jobPostingId}
        onChange={handleChange}
        isFullWidth
      />
      <Input
        name="statusCode"
        placeholder="Status Code"
        value={values.statusCode}
        onChange={handleChange}
        isFullWidth
      />
      <Input
        name="source"
        placeholder="Source"
        value={values.source}
        onChange={handleChange}
        isFullWidth
      />
      <Input
        name="salaryMin"
        placeholder="Salary Min"
        type="number"
        value={values.salaryMin}
        onChange={handleChange}
        isFullWidth
      />
      <Input
        name="salaryMax"
        placeholder="Salary Max"
        type="number"
        value={values.salaryMax}
        onChange={handleChange}
        isFullWidth
      />
      <Textarea
        name="notes"
        placeholder="Notes"
        value={values.notes}
        onChange={handleChange}
      />

      <div className="flex justify-end gap-2">
        <Button type="button" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="button" color="primary" onClick={handleSubmit}>
          {mode === "create" ? "Save" : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default ApplicationsForm;