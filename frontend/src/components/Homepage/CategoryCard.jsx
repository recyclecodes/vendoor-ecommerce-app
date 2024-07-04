import { Card, CardContent, CardTitle } from "../ui/card";

export default function CategoryCard({ category, imgSrc }) {
  return (
    <Card className="inline-flex items-center justify-around ">
      <CardTitle className="text-xl font-semibold px-2">{category}</CardTitle>
      <CardContent className="flex items-center justify-center">
        <img
          src={imgSrc}
          alt={category}
          className="w-auto h-24 sm:h-32 object-cover"
        />
      </CardContent>
    </Card>
  );
}
