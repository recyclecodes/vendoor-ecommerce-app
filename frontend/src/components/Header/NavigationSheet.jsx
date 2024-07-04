import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { HamburgerIcon, VendoorLogo } from '@/components/ui/icons';

const NavigationSheet = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" className="lg:hidden">
            <HamburgerIcon className="h-6 w-6 text-black" />
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle>
            <VendoorLogo className="w-32 h-8" />
          </SheetTitle>
          <SheetDescription>
            
            Your Ultimate Fasion Destination
          </SheetDescription>
          <div className="grid gap-4 py-6">{/* <NavigationMenuLinks /> */}</div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavigationSheet;
