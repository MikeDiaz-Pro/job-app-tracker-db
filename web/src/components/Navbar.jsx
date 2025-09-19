import { useState } from "react";
import {
  Navbar as MTNavbar,
  Typography,
  IconButton,
  Button,
  Collapse,
} from "@material-tailwind/react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (    
    <MTNavbar fullWidth className="px-4 py-2 shadow-none border-none bg-black text-white rounded-none">
      <div className="flex items-center justify-between text-blue-gray-900">
        {/* Brand */}
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          Job Applications Tracker
        </Typography>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" className="text-white">Dashboard</Button>
          <Button variant="ghost" className="text-white">Companies</Button>          
        </div>

        {/* Mobile toggle */}
        <IconButton
          variant="ghost"
          className="ml-2 md:hidden text-white"
          
          onClick={() => setOpen((v) => !v)}
          ripple={false}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </IconButton>
      </div>

      {/* Mobile menu */}
      <Collapse open={open}>
        <div className="mt-2 flex flex-col gap-2 md:hidden">
          <Button variant="ghost" className="text-white" onClick={() => setOpen(false)}>Dashboard</Button>
          <Button variant="ghost" className="text-white" onClick={() => setOpen(false)}>Companies</Button>
          <Button color="blue" className="text-white" onClick={() => setOpen(false)}>New Application</Button>
        </div>
      </Collapse>
    </MTNavbar>
  );
};

export default Navbar;