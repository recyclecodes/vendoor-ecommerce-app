import { Button } from './components/ui/button';
import { HamburgerIcon, VendoorLogo } from './components/ui/icons';

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline bg-red-500">Hello world!</h1>
      <Button variant="destructive" size ="icon">
        {' '}
        <HamburgerIcon className=" text-white" />
      </Button>
      <VendoorLogo className="text-black" />
    </>
  );
}

export default App;
