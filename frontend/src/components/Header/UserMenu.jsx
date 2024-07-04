import { Button } from '@/components/ui/button';
import { CartIcon, SearchIcon, VendoorIcon } from '@/components/ui/icons';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const UserMenu = () => {
  return (
    <>
      <Button className="md:hidden rounded-full w-14 h-14">
        <SearchIcon className=" w-7 h-7 hover:text-blue-700" />
      </Button>
      <Button className="rounded-full w-14 h-14">
        <CartIcon className="h-7 w-7 hover:text-blue-700" />
        <span className="sr-only">Cart</span>
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full">
        <Avatar className="w-12 h-12">
          <AvatarImage src={''} />
          <AvatarFallback>
            <VendoorIcon className="text-primary-foreground w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <span className="sr-only">User menu</span>
      </Button>
    </>
  );
};

export default UserMenu;
