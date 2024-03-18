import { Typography } from "@material-tailwind/react";

export function Footer() {
  return (
    <footer className="w-full bg-white p-8">
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; {new Date().getFullYear()} E-Shop All rights reserved.
      </Typography>
    </footer>
  );
}

export default Footer;
