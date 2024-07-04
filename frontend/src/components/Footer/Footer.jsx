import { VendoorFooter } from '@/components/ui/icons';
import FooterNavigationMenuLinks from '@/components/Footer/FooterNavigationMenuLinks';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white md:h-56 h-96 flex items-center">
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 ">
            <VendoorFooter className="w-36" />
          </div>
          <FooterNavigationMenuLinks />
        </div>

        <Separator className="my-8 hidden md:block" />
        <div className=" flex flex-col md:flex-row justify-between items-center">
          <Label className="text-lg">Copyright 2024</Label>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
