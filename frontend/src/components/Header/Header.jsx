import NavigationSheet from '@/components/Header/NavigationSheet';
import SearchBar from '@/components/Header/SearchBar';
import UserMenu from '@/components/Header/UserMenu';
import NavigationMenuLinks from '@/components/Header/NavigationMenuLinks';
import LogoLink from '@/components/Header/LogoLink';

const Header = () => {
  return (
    <header>
      <div className="container mx-auto flex items-center justify-between h-24 px-4 md:px-6">
        <div className="flex items-center">
          <NavigationSheet />
          <LogoLink />
          <NavigationMenuLinks className="hidden md:flex pl-14" />
        </div>
        <div className="flex w-[880px] items-center mx-4 justify-end">
          <SearchBar />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
