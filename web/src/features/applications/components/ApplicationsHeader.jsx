import { Typography, Button } from "@material-tailwind/react";
import { UserPlus } from "iconoir-react";

const ApplicationsHeader = () => {
  return (
    <div className="mb-8 flex items-center justify-between gap-8">
      <div>
        {/* Section title */}
        <Typography variant="h6">Applications list</Typography>
        <Typography className="mt-1">
          Manage and track all your job applications
        </Typography>
      </div>

      {/* Header action buttons */}
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        <Button color="secondary" size="sm">
          View all
        </Button>
        <Button className="flex items-center gap-3" size="sm">
          <UserPlus strokeWidth={2} className="h-4 w-4" /> Add application
        </Button>
      </div>
    </div>
  );
};

export default ApplicationsHeader;