/* eslint-disable react/prop-types */
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import NavigationLink from '@/components/Header/NavigationLink';

const NavigationMenuLinks = ({ className }) => (
  <NavigationMenu className={className}>
    <NavigationMenuList className='flex flex-1 2xl:gap-12 xl:gap-6 lg:gap-4'>
      <NavigationLink to="/" label="Shop All" />
      <NavigationLink to="/women" label="Women" />
      <NavigationLink to="/men" label="Men" />
      <NavigationLink to="/kids" label="Kids" />
    </NavigationMenuList>
  </NavigationMenu>
);

export default NavigationMenuLinks;
