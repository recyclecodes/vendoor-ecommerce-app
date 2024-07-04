import { Card, CardContent, CardTitle } from "../ui/card";
import PropTypes from "prop-types";

export default function ValueCard({ title, description, Icon }) {
  return (
    <Card className="flex flex-col bg-gray-100 p-5 gap-2">
      {Icon && <Icon className="w-5 h-5 text-gray-600" />}
      <CardTitle>{title}</CardTitle>
      <CardContent>{description}</CardContent>
    </Card>
  );
}

ValueCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
};
