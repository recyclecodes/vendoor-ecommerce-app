import { SearchIcon } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
  return (
    <div className=" w-full hidden md:block mx-5 ">
      <div className="relative ">
        <SearchIcon className="absolute left-2.5 top-2.5 h-5 w-5 text-slate-400" />
        <Input
          type="search"
          placeholder="Search for products..."
          className="pl-8 text-lg "
        />
      </div>
    </div>
  );
};

export default SearchBar;
