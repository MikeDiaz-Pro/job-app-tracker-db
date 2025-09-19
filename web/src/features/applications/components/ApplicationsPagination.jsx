import { Typography, Button } from "@material-tailwind/react";

const ApplicationsPagination = () => {
  return (
    <div className="flex items-center justify-between border-t border-surface-light py-4">
      {/* Current page info */}
      <Typography variant="small">Page 1 of 10</Typography>

      {/* Navigation buttons */}
      <div className="flex gap-2">
        <Button variant="outline" color="secondary" size="sm">
          Previous
        </Button>
        <Button variant="outline" color="secondary" size="sm">
          Next
        </Button>
      </div>
    </div>
  );
};

export default ApplicationsPagination;