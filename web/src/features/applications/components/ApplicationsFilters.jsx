import { Tabs, Input } from "@material-tailwind/react";
// import {  SearchEngine } from "iconoir-react";



const ApplicationsFilters = () => {
    const TABS = [
        { label: "All", value: "all" },
        { label: "Monitored", value: "monitored" },
        { label: "Unmonitored", value: "unmonitored" },
    ];
    return (
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Tabs for filtering applications */}
       <Tabs defaultValue="all">
          <Tabs.List className="w-full md:w-max">
            {TABS.map(({ label, value }) => (
              <Tabs.Trigger key={value} className="w-full" value={value}>
                {label}
              </Tabs.Trigger>
            ))}

            <Tabs.TriggerIndicator />
          </Tabs.List>
        </Tabs>

        {/* Search input */}
        <div className="w-full md:w-72">
            <Input placeholder="Search">
            <Input.Icon placement="end">
                {/* <SearchEngine className="h-5 w-5" /> */}
            </Input.Icon>
            </Input>
        </div>
        </div>
    );
};

export default ApplicationsFilters;