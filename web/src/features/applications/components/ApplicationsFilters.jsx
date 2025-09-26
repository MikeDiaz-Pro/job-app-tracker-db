import { Tabs, Input } from "@material-tailwind/react";
import { Search } from "iconoir-react";

const ApplicationsFilters = () => {    
    return (
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row ">
          {/* Search input */}
          <div className="w-full md:w-72">
              <Input placeholder="Search">
              <Input.Icon placement="end">
                  <Search className="h-5 w-5" />
              </Input.Icon>
              </Input>
          </div>
        </div>
    );
};

export default ApplicationsFilters;