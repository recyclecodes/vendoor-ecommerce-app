export default function FontGuide() {
  return (
    <>
      <p className="text-gray-400">This is just a guide. Remove this later!</p>

      <p className="text-gray-400">
        Use these for headings and important titles. Feel free to change the
        color!
      </p>
      <h1>Wear Your Best</h1>
      <h2>Browse By Category</h2>
      <h3>Product Name</h3>

      <p className="text-gray-400">
        Sample usage of the p classes. Feel free to change the font weight
        (bold, medium, semibold) and color{" "}
      </p>
      <div className="flex flex-col gap-0">
        <p className="label-caps-xs">Category Tag</p>
        <p className="p2-lg font-bold">Product Name</p>
        <p className="p1-xl">PHP 1,200</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, at
          molestiae asperiores velit voluptates et maxime praesentium! Quos
          dolore ab cumque nostrum nobis non. Ratione, inventore dolores?
          Eveniet, autem et.
        </p>
        <p className="p3-sm">4.5/5</p>
        <label htmlFor="">Email</label>
        <input type="text" />
      </div>
    </>
  );
}
