/* eslint-disable react/prop-types */
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import FooterNavigationLink from '@/components/Footer/FooterNavigationLink';

const FooterNavigationMenuLinks = ({ className }) => (
  <NavigationMenu className={className}>
    <NavigationMenuList className="flex md:flex-row flex-col gap-y-8 py-8 flex-1 2xl:gap-12 xl:gap-6 lg:gap-4">
      <FooterNavigationLink to="/" label="Shop All Products" />
      <FooterNavigationLink to="/about" label="About" />
      <FooterNavigationLink to="/contact" label="Contact Us" />
    </NavigationMenuList>
  </NavigationMenu>
);

export default FooterNavigationMenuLinks;
