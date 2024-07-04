/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { NavigationMenuLink } from '@/components/ui/navigation-menu';

const NavigationLink = ({ to, label }) => (
  <NavigationMenuLink asChild>
    <Link
      to={to}
      className="leading-normal text-xl text-navlink font-normal relative w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-blue-700 after:w-full after:scale-x-0 after:hover:scale-x-100 hover:text-blue-700 after:transition after:duration-300 after:origin-center"
    >
      {label}
    </Link>
  </NavigationMenuLink>
);

export default NavigationLink;
