import ValueCard from "./ValueCard";
import { CartIcon, LockIcon, HistoryIcon, PhoneIcon } from "../ui/icons";

export default function ValueSection() {
  return (
    <div className="mx-5 my-7">
      <div className="flex flex-col place-content-stretch justify-center gap-5  sm:flex-row sm:gap-5 sm:flex-grow">
        <ValueCard
          title="Free Shipping"
          description="For new customers"
          Icon={CartIcon}
          className="sm:flex-grow"
        />
        <ValueCard
          title="24/7 Support"
          description="We are here to help"
          Icon={PhoneIcon}
          className="sm:flex-grow"
        />
        <ValueCard
          title="Secure & Private"
          description="All payments via Stripe"
          Icon={LockIcon}
          className="sm:flex-grow"
        />
        <ValueCard
          title="Refunds"
          description="For damaged package"
          Icon={HistoryIcon}
          className="sm:flex-grow"
        />
      </div>
    </div>
  );
}
